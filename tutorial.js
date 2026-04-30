(function (global) {
  "use strict";

  const SEEN_KEY = "alchemist_dungeon_tutorial_seen_v1";
  const PROGRESS_KEY = "alchemist_dungeon_tutorial_step_v1";
  const ACTIVE_CLASS = "tutorial-active";

const copy = {
    newGame: {
      title: "Создание новой игры",
      body: "Шаг 1: откройте меню новой игры, настройте параметры и запустите сессию. После этого продолжаем обучение."
    },
    welcome: {
      title: "Первый ритуал",
      body: "Пройдем короткий сценарий: создадим игрока, бросим кость, откроем лавку, купим предмет, посмотрим инвентарь и хроники."
    },
    playerName: {
      title: "Имя посвященного",
      body: "Введите имя первого игрока. Можно взять любое короткое имя."
    },
    addPlayer: {
      title: "Откройте круг",
      body: "Нажмите кнопку призыва. Игрок появится в очереди хода и станет активным."
    },
    roll: {
      title: "Первый ход",
      body: "Бросьте кость. В обучении первый бросок приведет игрока к лавке и даст достаточно золота для покупки."
    },
    board: {
      title: "Поле",
      body: "Токен стоит на клетке. Цвета и знаки показывают события: проклятие, лавку, оракула, алтарь, теневой торг и финиш."
    },
    shop: {
      title: "Лавка",
      body: "Откройте лавку для игрока на торговой клетке. В обычной игре это можно сделать контекстным кликом по клетке."
    },
    buy: {
      title: "Покупка",
      body: "Купите любой предмет. Предмет появится в реликвиях игрока, а золото спишется."
    },
    inventory: {
      title: "Инвентарь",
      body: "Откройте игрока, чтобы увидеть HP, золото, предметы и активные эффекты."
    },
    keeper: {
      title: "Воля Хранителя",
      body: "Эта панель нужна ведущему: можно выдать золото или предмет, наказать, перенести на выбранную клетку и отменить ход."
    },
    logs: {
      title: "Хроники",
      body: "Откройте логи. Там собирается история ритуала, ее можно фильтровать и копировать."
    },
    done: {
      title: "Круг открыт",
      body: "Обучение завершено. Цель партии проста: провести избранников к Святилищу."
    }
  };

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
    return new Promise((resolve) => {
      const cleanup = () => {
        document.removeEventListener(name, onEvent);
        document.removeEventListener("tutorial:cancel", onCancel);
      };
      const onEvent = (event) => {
        if (predicate && !predicate(event.detail || {})) return;
        cleanup();
        resolve(event.detail || {});
      };
      const onCancel = () => {
        cleanup();
        resolve({ cancelled: true });
      };
      document.addEventListener(name, onEvent);
      document.addEventListener("tutorial:cancel", onCancel);
    });
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
      this.skipRequested = false;
      this.boundResize = () => this.positionTip();
      this.boundScroll = () => this.positionTip();
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

    start({ force = false } = {}) {
      if (this.active) return;
      if (!force && TutorialManager.wasSeen()) return;
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
      const target = this.currentTarget;
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
      const progress = `${Math.min(this.index + 1, this.steps.length)} / ${this.steps.length}`;
      const actionLabel = step.actionLabel || "Далее";
      this.tipEl.innerHTML = `
        <div class="tutorial-progress">${progress}</div>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
        <div class="tutorial-actions">
          <button class="tutorial-skip" type="button">Пропустить</button>
          <button class="tutorial-next" type="button">${actionLabel}</button>
        </div>
      `;
      this.setHighlight(target);
      this.tipEl.querySelector(".tutorial-skip").addEventListener("click", () => {
        this.skipRequested = true;
        this.finish(true);
      }, { once: true });
      window.setTimeout(() => this.positionTip(), 0);
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
        this.tipEl.querySelector(".tutorial-next").disabled = true;
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
      return [
        {
          title: "Шаг 1",
          body: "Нажмите «Новая игра», чтобы открыть параметры новой сессии.",
          target: "#newGameBtn",
          waitFor: () => waitForEvent("game:new-game-menu-opened")
        },
        {
          title: "Шаг 2",
          body: "Заполните название игры/сохранения.",
          target: "#newGameNameInput"
        },
        {
          title: "Шаг 3",
          body: "При необходимости настройте параметры игры.",
          target: "#configBoardSize"
        },
        {
          title: "Шаг 4",
          body: "Нажмите «Старт новой игры». После запуска обучение продолжится в самой игре.",
          target: "#newGameStartBtn",
          waitFor: () => waitForEvent("game:new-game-started")
        },
        {
          ...copy.playerName,
          target: "#playerName",
          actionLabel: "Ввести имя",
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
          ...copy.addPlayer,
          target: "#addPlayerBtn",
          waitFor: () => waitForEvent("game:player-added")
        },
        {
          ...copy.roll,
          target: "#rollBtn",
          waitFor: () => waitForEvent("game:roll-finished")
        },
        { ...copy.board, target: ".board-wrap" },
        {
          ...copy.shop,
          target: "#board",
          actionLabel: "Открыть лавку",
          action: async () => {
            this.api.openContextForSelectedPlayer?.("shop");
            await waitFrame();
          }
        },
        {
          ...copy.buy,
          target: "#shopItemsList",
          waitFor: () => waitForEvent("game:item-bought")
        },
        {
          ...copy.inventory,
          target: ".token.active, .token",
          before: async () => {
            this.api.closeContext?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:inventory-opened")
        },
        { ...copy.keeper, target: ".tools-grid" },
        {
          ...copy.logs,
          target: "#eventJournalLauncher",
          before: async () => {
            this.api.closeInventory?.();
            await waitFrame();
          },
          waitFor: () => waitForEvent("game:logs-opened")
        },
        { ...copy.done, target: "#gameTitle", actionLabel: "Играть" }
      ];
    }
  }

  global.TutorialManager = TutorialManager;
})(window);


