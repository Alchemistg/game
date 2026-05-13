﻿﻿﻿(function (global) {
  "use strict";

  const SEEN_KEY = "alchemist_dungeon_tutorial_seen_v1";
  const PROGRESS_KEY = "alchemist_dungeon_tutorial_step_v2";
  const ACTIVE_CLASS = "tutorial-active";

  function storageGet(key, fallback = "") {
    try {
      return global.localStorage.getItem(key) || fallback;
    } catch (_) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      global.localStorage.setItem(key, String(value));
    } catch (_) {
      // localStorage can be unavailable in private modes.
    }
  }

  function storageRemove(key) {
    try {
      global.localStorage.removeItem(key);
    } catch (_) {
      // localStorage can be unavailable in private modes.
    }
  }

  function waitFrame() {
    return new Promise((resolve) => global.requestAnimationFrame(() => resolve()));
  }

  function waitForEvent(name, predicate = null) {
    return global.InfraEvents.waitForEvent(name, predicate, { cancelEvent: "tutorial:cancel" });
  }

  class TutorialManager {
    constructor(options = {}) {
      this.api = options.api || {};
      this.steps = this.createSteps();
      this.index = 0;
      this.active = false;
      this.tipEl = null;
      this.highlightEl = null;
      this.currentTarget = null;
      this.currentStep = null;
      this.skipRequested = false;
      this.mode = "basics";
      this.positionRafId = 0;
      this.boundResize = () => this.schedulePositionTip();
      this.boundScroll = () => this.schedulePositionTip();
      this.boundKeydown = (event) => {
        if (event.key === "Escape" && this.active) this.finish(true);
      };
    }

    static wasSeen() {
      return storageGet(SEEN_KEY) === "1";
    }

    static reset() {
      storageRemove(SEEN_KEY);
      storageRemove(PROGRESS_KEY);
    }

    isActive() {
      return this.active;
    }

    start({ force = false, mode = "basics" } = {}) {
      if (this.active) return;
      if (!force && TutorialManager.wasSeen()) return;
      this.mode = String(mode || "basics");
      this.steps = this.createSteps();
      this.index = force ? 0 : Math.max(0, Number(storageGet(PROGRESS_KEY, "0")) || 0);
      this.skipRequested = false;
      this.active = true;
      document.body.classList.add(ACTIVE_CLASS);
      this.ensureElements();
      window.addEventListener("resize", this.boundResize);
      window.addEventListener("scroll", this.boundScroll, true);
      document.addEventListener("keydown", this.boundKeydown);
      void this.run();
    }

    refresh() {
      this.steps = this.createSteps();
      if (this.active && this.tipEl) {
        this.renderStep(this.steps[this.index], this.currentTarget);
      }
    }

    async run() {
      while (this.active && !this.skipRequested && this.index < this.steps.length) {
        storageSet(PROGRESS_KEY, this.index);
        const step = this.steps[this.index];
        await this.showStep(step);
        if (this.skipRequested || !this.active) break;
        this.index += 1;
      }
      this.finish(this.skipRequested);
    }

    finish(skipped = false) {
      if (!this.active && !this.tipEl) return;
      this.active = false;
      this.skipRequested = false;
      this.clearHighlight();
      this.tipEl?.remove();
      this.tipEl = null;
      if (this.positionRafId) {
        window.cancelAnimationFrame(this.positionRafId);
        this.positionRafId = 0;
      }
      document.body.classList.remove(ACTIVE_CLASS);
      window.removeEventListener("resize", this.boundResize);
      window.removeEventListener("scroll", this.boundScroll, true);
      document.removeEventListener("keydown", this.boundKeydown);
      storageSet(SEEN_KEY, "1");
      storageRemove(PROGRESS_KEY);
      document.dispatchEvent(new CustomEvent("tutorial:cancel"));
      document.dispatchEvent(new CustomEvent("tutorial:finished", { detail: { skipped } }));
    }

    ensureElements() {
      if (!this.tipEl) {
        this.tipEl = document.createElement("section");
        this.tipEl.className = "tutorial-tip";
        this.tipEl.setAttribute("role", "dialog");
        this.tipEl.setAttribute("aria-live", "polite");
        document.body.appendChild(this.tipEl);
      }
    }

    getTarget(selector) {
      if (!selector) return null;
      if (typeof selector === "function") return selector();
      return document.querySelector(selector);
    }

    clearHighlight() {
      if (this.currentTarget) {
        this.currentTarget.classList.remove("tutorial-highlight");
      }
      this.currentTarget = null;
      this.highlightEl?.remove();
      this.highlightEl = null;
    }

    schedulePositionTip() {
      if (this.positionRafId) return;
      this.positionRafId = window.requestAnimationFrame(() => {
        this.positionRafId = 0;
        this.positionTip();
      });
    }

    setHighlight(target) {
      this.clearHighlight();
      if (!target) return;
      this.currentTarget = target;
      target.classList.add("tutorial-highlight");
      this.highlightEl = document.createElement("div");
      this.highlightEl.className = "tutorial-focus-ring";
      document.body.appendChild(this.highlightEl);
      this.positionTip();
    }

    positionTip() {
      if (!this.tipEl) return;
      let target = this.currentTarget;
      if (target && !target.isConnected) {
        const nextTarget = this.getTarget(this.currentStep?.target);
        if (nextTarget && nextTarget !== target) {
          this.setHighlight(nextTarget);
          return;
        }
        target = null;
      }
      const margin = 12;
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      const tipRect = this.tipEl.getBoundingClientRect();
      let left = Math.max(margin, (vw - tipRect.width) / 2);
      let top = Math.max(margin, vh - tipRect.height - margin);

      if (target) {
        const rect = target.getBoundingClientRect();
        if (this.highlightEl) {
          this.highlightEl.style.left = `${Math.max(4, rect.left - 6)}px`;
          this.highlightEl.style.top = `${Math.max(4, rect.top - 6)}px`;
          this.highlightEl.style.width = `${Math.min(vw - 8, rect.width + 12)}px`;
          this.highlightEl.style.height = `${Math.min(vh - 8, rect.height + 12)}px`;
        }
        const rightSpace = vw - rect.right;
        const belowSpace = vh - rect.bottom;
        if (rightSpace >= tipRect.width + margin * 2) {
          left = rect.right + margin;
          top = rect.top;
        } else if (rect.left >= tipRect.width + margin * 2) {
          left = rect.left - tipRect.width - margin;
          top = rect.top;
        } else if (belowSpace >= tipRect.height + margin * 2) {
          left = rect.left;
          top = rect.bottom + margin;
        } else {
          left = rect.left;
          top = Math.max(margin, rect.top - tipRect.height - margin);
        }
      }

      left = Math.min(Math.max(margin, left), vw - tipRect.width - margin);
      top = Math.min(Math.max(margin, top), vh - tipRect.height - margin);
      this.tipEl.style.left = `${left}px`;
      this.tipEl.style.top = `${top}px`;
    }

    renderStep(step, target) {
      this.currentStep = step;
      const progress = `${Math.min(this.index + 1, this.steps.length)} / ${this.steps.length}`;
      const actionLabel = step.actionLabel || (global.GAME_I18N ? global.GAME_I18N.t("ui.tutorialNext") : "Далее");
      this.tipEl.innerHTML = `
        <div class="tutorial-progress">${progress}</div>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
        <div class="tutorial-actions">
          <button class="tutorial-skip" type="button">${global.GAME_I18N ? global.GAME_I18N.t("ui.tutorialSkip") : "Пропустить"}</button>
          <button class="tutorial-next" type="button">${actionLabel}</button>
        </div>
      `;
      this.setHighlight(target);
      this.tipEl.querySelector(".tutorial-skip").addEventListener("click", () => {
        this.skipRequested = true;
        this.finish(true);
      }, { once: true });
      window.setTimeout(() => this.schedulePositionTip(), 0);
    }

    async showStep(step) {
      if (step.before) await step.before();
      await waitFrame();
      const target = this.getTarget(step.target);
      if (target && step.scroll !== false) {
        target.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
      }
      this.renderStep(step, target);

      if (step.waitFor) {
        const nextBtn = this.tipEl.querySelector(".tutorial-next");
        if (step.action) {
          await new Promise((resolve) => {
            nextBtn.addEventListener("click", async () => {
              nextBtn.disabled = true;
              await step.action();
              resolve();
            }, { once: true });
          });
        } else {
          nextBtn.disabled = true;
        }
        await step.waitFor();
        return;
      }

      await new Promise((resolve) => {
        const next = this.tipEl.querySelector(".tutorial-next");
        next.addEventListener("click", async () => {
          if (step.action) await step.action();
          resolve();
        }, { once: true });
      });
    }
    createSteps() {
      const t = (path) => global.GAME_I18N ? global.GAME_I18N.t(path) : "";
      const modeAliases = { full: "basics", cells: "tiles", quick: "systems" };
      const currentMode = modeAliases[this.mode] || this.mode || "basics";
      const nextMode = currentMode === "basics" ? "tiles" : (currentMode === "tiles" ? "systems" : "");

      const allSteps = [
        {
          _id: "tutorial.step1Title",
          title: t("tutorial.step1Title"),
          body: t("tutorial.step1Body"),
          target: "#newGameBtn",
          waitFor: () => waitForEvent("game:new-game-menu-opened")
        },
        {
          _id: "tutorial.step2Title",
          title: t("tutorial.step2Title"),
          body: t("tutorial.step2Body"),
          target: "#newGameNameInput"
        },
        {
          _id: "tutorial.step3Title",
          title: t("tutorial.step3Title"),
          body: t("tutorial.step3Body"),
          target: "#configBoardSize"
        },
        {
          _id: "tutorial.step4Title",
          title: t("tutorial.step4Title"),
          body: t("tutorial.step4Body"),
          target: "#newGameStartBtn",
          waitFor: () => waitForEvent("game:new-game-started")
        },
        {
          _id: "tutorial.playerName.title",
          title: t("tutorial.playerName.title"),
          body: t("tutorial.playerName.body"),
          target: "#playerName",
          actionLabel: t("tutorial.playerNameAction"),
          action: async () => {
            const input = document.getElementById("playerName");
            if (input && !input.value.trim()) {
              input.value = "Ада";
              input.dispatchEvent(new Event("input", { bubbles: true }));
            }
            input?.focus();
          }
        },
        {
          _id: "tutorial.addPlayer.title",
          title: t("tutorial.addPlayer.title"),
          body: t("tutorial.addPlayer.body"),
          target: "#addPlayerBtn",
          waitFor: () => waitForEvent("game:player-added")
        },
        {
          _id: "tutorial.roll.title",
          title: t("tutorial.roll.title"),
          body: t("tutorial.roll.body"),
          target: "#rollBtn",
          before: async () => {
            this.api.prepareTutorialRollTarget?.("trap");
            this.api.setTutorialRollPlan?.(["trap"]);
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:cell-interacted", (detail) => detail.cellType === "trap")
        },
        {
          _id: "tutorial.shopRoll.title",
          title: t("tutorial.shopRoll.title"),
          body: t("tutorial.shopRoll.body"),
          target: "#rollBtn",
          before: async () => {
            this.api.prepareTutorialRollTarget?.("shop");
            this.api.setTutorialRollPlan?.(["shop"]);
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:cell-interacted", (detail) => detail.cellType === "shop")
        },
        {
          _id: "tutorial.shop.title",
          title: t("tutorial.shop.title"),
          body: t("tutorial.shop.body"),
          target: ".cell.selected",
          actionLabel: t("tutorial.shopAction"),
          before: async () => {
            this.api.focusSelectedPlayerCell?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:context-opened", (detail) => detail.mode === "shop")
        },
        {
          _id: "tutorial.buy.title",
          title: t("tutorial.buy.title"),
          body: t("tutorial.buy.body"),
          target: "#shopItemsList",
          waitFor: () => waitForEvent("game:item-bought", (detail) => detail.market === "shop")
        },
        {
          _id: "tutorial.blackMarketRoll.title",
          title: t("tutorial.blackMarketRoll.title"),
          body: t("tutorial.blackMarketRoll.body"),
          target: "#rollBtn",
          before: async () => {
            this.api.closeContext?.();
            this.api.prepareTutorialRollTarget?.("blackMarket");
            this.api.setTutorialRollPlan?.(["blackMarket"]);
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:cell-interacted", (detail) => detail.cellType === "blackMarket")
        },
        {
          _id: "tutorial.blackMarketUse.title",
          title: t("tutorial.blackMarketUse.title"),
          body: t("tutorial.blackMarketUse.body"),
          target: ".cell.selected",
          actionLabel: t("tutorial.blackMarketUseAction"),
          before: async () => {
            this.api.focusSelectedPlayerCell?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:context-opened", (detail) => detail.mode === "blackMarket")
        },
        {
          _id: "tutorial.blackMarketBuy.title",
          title: t("tutorial.blackMarketBuy.title"),
          body: t("tutorial.blackMarketBuy.body"),
          target: "#shopItemsList",
          waitFor: () => waitForEvent("game:black-market-buy-resolved")
        },
        {
          _id: "tutorial.altarRoll.title",
          title: t("tutorial.altarRoll.title"),
          body: t("tutorial.altarRoll.body"),
          target: "#rollBtn",
          before: async () => {
            this.api.closeContext?.();
            this.api.prepareTutorialRollTarget?.("altar");
            this.api.setTutorialRollPlan?.(["altar"]);
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:cell-interacted", (detail) => detail.cellType === "altar")
        },
        {
          _id: "tutorial.altarUse.title",
          title: t("tutorial.altarUse.title"),
          body: t("tutorial.altarUse.body"),
          target: ".cell.selected",
          actionLabel: t("tutorial.altarUseAction"),
          before: async () => {
            this.api.focusSelectedPlayerCell?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:context-opened", (detail) => detail.mode === "altar")
        },
        {
          _id: "tutorial.altarDo.title",
          title: t("tutorial.altarDo.title"),
          body: t("tutorial.altarDo.body"),
          target: "#altarActionBtn, #altarContextSection button",
          waitFor: () => waitForEvent("game:altar-used")
        },
        {
          _id: "tutorial.fortuneRoll.title",
          title: t("tutorial.fortuneRoll.title"),
          body: t("tutorial.fortuneRoll.body"),
          target: "#rollBtn",
          before: async () => {
            this.api.closeContext?.();
            this.api.prepareTutorialRollTarget?.("fortuneTeller");
            this.api.setTutorialRollPlan?.(["fortuneTeller"]);
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:cell-interacted", (detail) => detail.cellType === "fortuneTeller")
        },
        {
          _id: "tutorial.fortuneUse.title",
          title: t("tutorial.fortuneUse.title"),
          body: t("tutorial.fortuneUse.body"),
          target: ".cell.selected",
          actionLabel: t("tutorial.fortuneUseAction"),
          before: async () => {
            this.api.focusSelectedPlayerCell?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:context-opened", (detail) => detail.mode === "fortuneTeller")
        },
        {
          _id: "tutorial.fortuneDo.title",
          title: t("tutorial.fortuneDo.title"),
          body: t("tutorial.fortuneDo.body"),
          target: "#fortuneActionBtn, #fortuneContextSection button",
          waitFor: () => waitForEvent("game:fortune-used")
        },
        {
          _id: "tutorial.inventory.title",
          title: t("tutorial.inventory.title"),
          body: t("tutorial.inventory.body"),
          target: ".token.active, .token",
          before: async () => {
            this.api.closeContext?.();
            await this.api.prepareTutorialSystemsScenario?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:inventory-opened")
        },
        {
          _id: "tutorial.effects.title",
          title: t("tutorial.effects.title"),
          body: t("tutorial.effects.body"),
          target: ".effects-panel .effect-item, .inventory-modal .effect-item, .effects-panel, .inventory-modal .inventory-body",
          scroll: false
        },
        {
          _id: "tutorial.effectsName.title",
          title: t("tutorial.effectsName.title"),
          body: t("tutorial.effectsName.body"),
          target: ".effects-panel .effect-item .effect-name, .inventory-modal .effect-item .effect-name",
          scroll: false
        },
        {
          _id: "tutorial.effectsDesc.title",
          title: t("tutorial.effectsDesc.title"),
          body: t("tutorial.effectsDesc.body"),
          target: ".effects-panel .effect-item.bad-event .effect-desc, .inventory-modal .effect-item.bad-event .effect-desc, .effects-panel .effect-item .effect-desc, .inventory-modal .effect-item .effect-desc",
          scroll: false
        },
        {
          _id: "tutorial.effectRemoval.title",
          title: t("tutorial.effectRemoval.title"),
          body: t("tutorial.effectRemoval.body"),
          target: ".effects-panel, .effects-title, .inventory-modal .inventory-body",
          scroll: false
        },
        {
          _id: "tutorial.tradeOpen.title",
          title: t("tutorial.tradeOpen.title"),
          body: t("tutorial.tradeOpen.body"),
          target: ".trade-open-btn",
          actionLabel: t("tutorial.tradeOpenAction"),
          before: async () => {
            this.api.closeInventory?.();
            await this.api.prepareTutorialTradeScenario?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:trade-opened")
        },
        {
          _id: "tutorial.tradeMenu.title",
          title: t("tutorial.tradeMenu.title"),
          body: t("tutorial.tradeMenu.body"),
          target: "#tradeOverlay .trade-panel, .trade-modal",
          scroll: false
        },
        {
          _id: "tutorial.tradeFunctions.title",
          title: t("tutorial.tradeFunctions.title"),
          body: t("tutorial.tradeFunctions.body"),
          target: "#tradeOverlay .trade-panel, .trade-modal",
          actionLabel: t("tutorial.tradeFunctionsAction"),
          action: async () => {
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:trade-sealed", (detail) => {
            const getItems = Array.isArray(detail?.getItems) ? detail.getItems : [];
            return getItems.includes("fateChalice") && getItems.includes("cleansingIncense");
          })
        },
        {
          _id: "tutorial.effectsPracticeOpen.title",
          title: t("tutorial.effectsPracticeOpen.title"),
          body: t("tutorial.effectsPracticeOpen.body"),
          target: ".token.active [data-open-inventory], .token [data-open-inventory]",
          before: async () => {
            this.api.closeTrade?.();
            await this.api.prepareTutorialCurseRemovalScenario?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:inventory-opened")
        },
        {
          _id: "tutorial.effectsPracticeIncense.title",
          title: t("tutorial.effectsPracticeIncense.title"),
          body: t("tutorial.effectsPracticeIncense.body"),
          target: ".inventory-modal [data-use-item=\"cleansingIncense\"], .inventory-modal [data-inv-item-id=\"cleansingIncense\"]",
          waitFor: () => waitForEvent("game:item-used", (detail) => detail.itemId === "cleansingIncense" && detail.removedEffect === "cursedItem")
        },
        {
          _id: "tutorial.effectsPracticeChalice.title",
          title: t("tutorial.effectsPracticeChalice.title"),
          body: t("tutorial.effectsPracticeChalice.body"),
          target: ".inventory-modal [data-use-item=\"fateChalice\"], .inventory-modal [data-inv-item-id=\"fateChalice\"]",
          before: async () => {
            await this.api.prepareTutorialOracleRemovalScenario?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:item-used", (detail) => detail.itemId === "fateChalice" && detail.removedEffect === "oracleProphecy")
        },
        {
          _id: "tutorial.keeper.title",
          title: t("tutorial.keeper.title"),
          body: t("tutorial.keeper.body"),
          target: ".tools-grid"
        },
        {
          _id: "tutorial.logs.title",
          title: t("tutorial.logs.title"),
          body: t("tutorial.logs.body"),
          target: "#eventJournalLauncher",
          before: async () => {
            this.api.closeInventory?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:logs-opened")
        },
        {
          _id: "tutorial.finishRoll.title",
          title: t("tutorial.finishRoll.title"),
          body: t("tutorial.finishRoll.body"),
          target: "#rollBtn",
          before: async () => {
            this.api.prepareTutorialRollTarget?.("finish");
            this.api.setTutorialRollPlan?.(["finish"]);
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:cell-interacted", (detail) => detail.cellType === "finish")
        },
        {
          _id: "tutorial.done.title",
          title: t("tutorial.done.title"),
          body: t("tutorial.done.body"),
          target: "#gameTitle",
          actionLabel: nextMode ? t("ui.tutorialNextChapter") : t("tutorial.doneAction"),
          action: async () => {
            if (nextMode) this.api.queueNextTutorialMode?.(nextMode);
          }
        }
      ];

      const chapterSteps = {
        basics: [
          "tutorial.step1Title",
          "tutorial.step2Title",
          "tutorial.step3Title",
          "tutorial.step4Title",
          "tutorial.playerName.title",
          "tutorial.addPlayer.title",
          "tutorial.roll.title",
          "tutorial.shopRoll.title",
          "tutorial.shop.title",
          "tutorial.buy.title",
          "tutorial.done.title"
        ],
        tiles: [
          "tutorial.blackMarketRoll.title",
          "tutorial.blackMarketUse.title",
          "tutorial.blackMarketBuy.title",
          "tutorial.altarRoll.title",
          "tutorial.altarUse.title",
          "tutorial.altarDo.title",
          "tutorial.fortuneRoll.title",
          "tutorial.fortuneUse.title",
          "tutorial.fortuneDo.title",
          "tutorial.finishRoll.title",
          "tutorial.done.title"
        ],
        systems: [
          "tutorial.inventory.title",
          "tutorial.effects.title",
          "tutorial.effectsName.title",
          "tutorial.effectsDesc.title",
          "tutorial.effectRemoval.title",
          "tutorial.tradeOpen.title",
          "tutorial.tradeMenu.title",
          "tutorial.tradeFunctions.title",
          "tutorial.effectsPracticeOpen.title",
          "tutorial.effectsPracticeIncense.title",
          "tutorial.effectsPracticeChalice.title",
          "tutorial.keeper.title",
          "tutorial.logs.title",
          "tutorial.done.title"
        ]
      };

      const legacyModeMap = { full: "basics", cells: "tiles", quick: "systems" };
      const resolvedMode = chapterSteps[this.mode] ? this.mode : (legacyModeMap[this.mode] || "basics");
      const allowed = new Set(chapterSteps[resolvedMode]);
      return allSteps.filter((step) => allowed.has(step._id));
    }
  }

  global.TutorialManager = TutorialManager;
})(window);
