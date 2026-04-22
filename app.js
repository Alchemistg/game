let CONFIG = window.GAME_CONFIG;
const CONFIG_OVERRIDES_STORAGE_KEY = "alchemist_dungeon_config_overrides_v1";

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function loadStoredConfigOverrides() {
  try {
    const raw = window.localStorage.getItem(CONFIG_OVERRIDES_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isPlainObject(parsed) ? parsed : null;
  } catch (_) {
    return null;
  }
}

function mergeConfig(baseValue, overrideValue) {
  if (Array.isArray(baseValue) && Array.isArray(overrideValue)) {
    return overrideValue.map((item) => {
      if (Array.isArray(item)) return mergeConfig([], item);
      if (isPlainObject(item)) return mergeConfig({}, item);
      return item;
    });
  }
  if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
    const result = { ...baseValue };
    Object.keys(overrideValue).forEach((key) => {
      result[key] = key in baseValue ? mergeConfig(baseValue[key], overrideValue[key]) : overrideValue[key];
    });
    return result;
  }
  return overrideValue !== undefined ? overrideValue : baseValue;
}

const storedConfigOverrides = loadStoredConfigOverrides();
if (storedConfigOverrides) {
  window.GAME_CONFIG = mergeConfig(window.GAME_CONFIG || {}, storedConfigOverrides);
}

CONFIG = window.GAME_CONFIG;
    const LANGUAGE_STORAGE_KEY = CONFIG.LANGUAGE_KEY || "alchemist_dungeon_language_v1";
    const BOARD_SIZE = CONFIG.BOARD_SIZE;
    const LAST_CELL = CONFIG.LAST_CELL;
    const FINISHERS_TO_END_GAME = Math.max(1, Number(CONFIG.FINISHERS_TO_END_GAME) || 1);
    const GOLD_PER_MOVE = CONFIG.GOLD_PER_MOVE;
    const PLAYER_MAX_HP = Math.max(1, Number(CONFIG.PLAYER_MAX_HP) || 100);
    const EVENT_LOG_TOAST_TTL_MS = 2200;
    const SAVE_KEY = CONFIG.SAVE_KEY;
    const AUTOSAVE_DELAY_MS = CONFIG.AUTOSAVE_DELAY_MS;
    const INVENTORY_SLOT_LIMIT = CONFIG.INVENTORY_SLOT_LIMIT;
    const SELL_FACTOR = CONFIG.SELL_FACTOR;
    const SERVICE_COSTS = CONFIG.SERVICE_COSTS;
    const REWARDS = CONFIG.REWARDS;
    const CHANCES = CONFIG.CHANCES;
    const PHASE_BALANCE = CONFIG.PHASE_BALANCE;
    const CELL_LAYOUT = CONFIG.CELL_LAYOUT;
    const SHOP_ITEMS = CONFIG.SHOP_ITEMS;
    const SHOP_ITEM_META = CONFIG.SHOP_ITEM_META;
    const CELL_TYPE_META = CONFIG.CELL_TYPE_META;
    const CELL_TYPE_COLORS = CONFIG.CELL_TYPE_COLORS;
    const SIDE_PANEL_LEFT_KEY = "alchemist_dungeon_side_panel_left_v1";
    const SUPPORTED_LANGUAGES = window.GAME_I18N.bundles || { ru: {} };
    const DEFAULT_LANGUAGE = window.GAME_I18N.DEFAULT_LANGUAGE || CONFIG.DEFAULT_LANGUAGE || "ru";
    let currentLanguage = window.GAME_I18N.getPreferredLanguage(LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE);
    if (!SUPPORTED_LANGUAGES[currentLanguage]) {
      currentLanguage = DEFAULT_LANGUAGE;
    }
    let TEXTS = window.GAME_I18N.getBundle(currentLanguage);
    let sidePanelLeft = window.localStorage.getItem(SIDE_PANEL_LEFT_KEY) === "1";
    const SHOP_ITEM_TO_PROP = {
      boots: "boots",
      shield: "shields",
      luckCharm: "luckCharm",
      trapKit: "trapKit",
      rerollStone: "rerollStone",
      alchemyCrystal: "alchemyCrystal"
    };
const state = {
      players: [],
      selectedPlayerId: "",
      cells: [],
      selectedCell: 1,
      rolling: false,
      turnIndex: 0,
      history: [],
      logEntries: [],
      logFilter: "all",
      gameEnded: false
    };
    const STATE_VERSION = 5;

      const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="#2a2a2a" width="100%" height="100%"/><text x="50%" y="50%" dy=".35em" font-size="28" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif">?</text></svg>');

    const boardEl = document.getElementById("board");
    const boardWrapEl = document.querySelector(".board-wrap");
    const boardStaticLayerEl = document.getElementById("boardStaticLayer");
    const tokensLayerEl = document.getElementById("tokensLayer");
    const gameTitleEl = document.getElementById("gameTitle");
    const settingsLauncherEl = document.getElementById("settingsLauncher");
    const settingsPanelEl = document.getElementById("settingsPanel");
    const settingsCloseBtnEl = document.getElementById("settingsCloseBtn");
    const settingsGeneralTabBtnEl = document.getElementById("settingsGeneralTabBtn");
    const settingsConfigTabBtnEl = document.getElementById("settingsConfigTabBtn");
    const sidePanelToggleBtnEl = document.getElementById("sidePanelToggleBtn");
    const languageSelectEl = document.getElementById("languageSelect");
    const configBoardSizeEl = document.getElementById("configBoardSize");
    const configPlayerMaxHpEl = document.getElementById("configPlayerMaxHp");
    const configGoldPerMoveEl = document.getElementById("configGoldPerMove");
    const configInventorySlotsEl = document.getElementById("configInventorySlots");
    const configAutosaveDelayEl = document.getElementById("configAutosaveDelay");
    const configFinishersToEndGameEl = document.getElementById("configFinishersToEndGame");
    const configFortuneGoodChanceEl = document.getElementById("configFortuneGoodChance");
    const configBlackMarketProfitChanceEl = document.getElementById("configBlackMarketProfitChance");
    const configAltarShieldChanceEl = document.getElementById("configAltarShieldChance");
    const fortuneGoodChanceValueEl = document.getElementById("fortuneGoodChanceValue");
    const blackMarketProfitChanceValueEl = document.getElementById("blackMarketProfitChanceValue");
    const altarShieldChanceValueEl = document.getElementById("altarShieldChanceValue");
    const configLastCellPreviewEl = document.getElementById("configLastCellPreview");
    const configEditorStatusEl = document.getElementById("configEditorStatus");
    const saveConfigBtnEl = document.getElementById("saveConfigBtn");
    const resetConfigBtnEl = document.getElementById("resetConfigBtn");
    const toastContainerEl = document.getElementById("toastContainer");
    const eventJournalLauncherEl = document.getElementById("eventJournalLauncher");
    const eventJournalEl = document.getElementById("eventJournal");
    const logFilterSelectEl = document.getElementById("logFilterSelect");
    const logBoxEl = document.getElementById("logBox");
    const playerNameEl = document.getElementById("playerName");
    const addPlayerBtnEl = document.getElementById("addPlayerBtn");
    const playersListEl = document.getElementById("playersList");
    const activePlayerSelectEl = document.getElementById("activePlayerSelect");
    const turnInfoEl = document.getElementById("turnInfo");
    const turnListEl = document.getElementById("turnList");
    const nextTurnBtnEl = document.getElementById("nextTurnBtn");
    const undoBtnEl = document.getElementById("undoBtn");
    const saveGameBtnEl = document.getElementById("saveGameBtn");
    const loadGameBtnEl = document.getElementById("loadGameBtn");
    const newGameBtnEl = document.getElementById("newGameBtn");
    const fullResetToggleEl = document.getElementById("fullResetToggle");
    const installAppBtnEl = document.getElementById("installAppBtn");
    const activePlayerCardEl = document.getElementById("activePlayerCard");
    const playerStatsEl = document.getElementById("playerStats");
    const rollBtnEl = document.getElementById("rollBtn");
    const diceCubeEl = document.getElementById("diceCube");
    const diceResultEl = document.getElementById("diceResult");
    const addGoldBtnEl = document.getElementById("addGoldBtn");
    const removeGoldBtnEl = document.getElementById("removeGoldBtn");
    const giveBootsBtnEl = document.getElementById("giveBootsBtn");
    const giveShieldBtnEl = document.getElementById("giveShieldBtn");
    const punishBtnEl = document.getElementById("punishBtn");
    const tileInfoEl = document.getElementById("tileInfo");
    const moveToTileBtnEl = document.getElementById("moveToTileBtn");
    const shopOverlayEl = document.getElementById("shopOverlay");
    const tileContextMenuEl = document.getElementById("tileContextMenu");
    const tileContextTitleEl = document.getElementById("tileContextTitle");
    const tileContextSubtitleEl = document.getElementById("tileContextSubtitle");
    const tileContextPlayerLabelEl = document.getElementById("tileContextPlayerLabel");
    const closeShopBtnEl = document.getElementById("closeShopBtn");
    const shopBuyerSelectEl = document.getElementById("shopBuyerSelect");
    const shopContextSectionEl = document.getElementById("shopContextSection");
    const shopItemsListEl = document.getElementById("shopItemsList");
    const shopPlayerMetaEl = document.getElementById("shopPlayerMeta");
    const shopPlayerInventoryEl = document.getElementById("shopPlayerInventory");
    const fortuneContextSectionEl = document.getElementById("fortuneContextSection");
    const fortuneTextEl = document.getElementById("fortuneText");
    const fortunePlayerMetaEl = document.getElementById("fortunePlayerMeta");
    const fortuneActionBtnEl = document.getElementById("fortuneActionBtn");
    const blackMarketContextSectionEl = document.getElementById("blackMarketContextSection");
    const blackMarketPlayerMetaEl = document.getElementById("blackMarketPlayerMeta");
    const blackMarketActionBtnEl = document.getElementById("blackMarketActionBtn");
    const altarContextSectionEl = document.getElementById("altarContextSection");
    const altarPlayerMetaEl = document.getElementById("altarPlayerMeta");
    const altarActionBtnEl = document.getElementById("altarActionBtn");
    const inventoryOverlayEl = document.getElementById("inventoryOverlay");
    const inventoryNameEl = document.getElementById("inventoryName");
    const inventoryHpEl = document.getElementById("inventoryHp");
    const inventoryGoldEl = document.getElementById("inventoryGold");
    const inventoryBodyEl = document.getElementById("inventoryBody");
    const closeInventoryBtnEl = document.getElementById("closeInventoryBtn");
    const victoryOverlayEl = document.getElementById("victoryOverlay");
    const victoryBodyEl = document.getElementById("victoryBody");
    const closeVictoryBtnEl = document.getElementById("closeVictoryBtn");
    let autosaveTimer = null;
    let tileContextMode = "shop";
    let boardCellEls = [];
    let cellCenters = [];
    let cellCentersValid = false;
    let lastRenderedSelectedCell = 0;
    let lastContextMenuSignature = "";
    let tokenElsById = new Map();
    let lastActiveTokenId = "";
    let renderFrameId = null;
    let pendingRenderFlags = {
      players: false,
      stats: false,
      selectedTile: false,
      refreshInventoryOverlay: false,
      refreshContextMenu: false,
      tokensFull: false
    };
    let pendingTokenPositions = new Set();
    let pendingTokenActiveIds = new Set();
    let pendingAutosave = false;
    let autosaveIdleHandle = null;
    let lastSavedSnapshotJson = "";
    let lastStatsSignature = "";
    let lastInventorySignature = "";
    let deferredInstallPrompt = null;
    const SETTINGS_TAB_KEY = "alchemist_dungeon_settings_tab_v1";
    let settingsTab = window.localStorage.getItem(SETTINGS_TAB_KEY) === "config" ? "config" : "general";
    const LOG_DOM_LIMIT = 200;
    const MAX_LOG_ENTRIES = Math.max(LOG_DOM_LIMIT, Number(CONFIG.MAX_LOG_ENTRIES) || 1500);
    const PERF_ENABLED = (() => {
      try {
        return window.localStorage.getItem("game_perf") === "1";
      } catch (_) {
        return false;
      }
    })();
    const perfStats = new Map();
    const dirtyPlayers = new Map();
    const contextInit = {
      shop: false,
      fortuneTeller: false,
      blackMarket: false,
      altar: false
    };
    const inventorySlotsCache = new Map();
    const MAX_INVENTORY_CACHE = 180;
    let diceRotationX = -30;
    let diceRotationY = 45;
    const DICE_ANIMATION_MS = 1100;
    const DICE_ROTATIONS = {
      1: { x: 0, y: 0 },
      2: { x: -90, y: 0 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: 90, y: 0 },
      6: { x: 0, y: 180 }
    };

    function reduceState(prev, action) {
      switch (action.type) {
        case "PATCH":
          return { ...prev, ...action.patch };
        case "SET_PLAYERS_AND_TURN":
          return {
            ...prev,
            players: action.players,
            selectedPlayerId: action.selectedPlayerId,
            turnIndex: action.turnIndex
          };
        default:
          return prev;
      }
    }

    function dispatch(action) {
      const next = reduceState(state, action);
      Object.assign(state, next);
      return next;
    }

    function deepGet(object, path) {
      return String(path || "").split(".").reduce((acc, key) => (acc && key in acc ? acc[key] : undefined), object);
    }

    function formatTemplate(template, params = {}) {
      return String(template || "").replace(/\{(\w+)\}/g, (_, key) => {
        const value = params[key];
        return value === undefined || value === null ? "" : String(value);
      });
    }

    function getTexts(lang = currentLanguage) {
      return window.GAME_I18N.getBundle(lang);
    }

    function localizeValue(value, lang = currentLanguage) {
      return window.GAME_I18N.localizeValue(value, lang);
    }

    function getShopItemName(item, lang = currentLanguage) {
      return window.GAME_I18N.getShopItemName(item, lang);
    }

    function getShopItemDesc(item, lang = currentLanguage) {
      return window.GAME_I18N.getShopItemDesc(item, lang);
    }

    function getPhaseLabel(key, lang = currentLanguage) {
      return window.GAME_I18N.getPhaseLabel(key, lang);
    }

    function t(path, params = {}, lang = currentLanguage) {
      return window.GAME_I18N.t(path, params, lang);
    }

    function uiIcon(path, fallback) {
      const value = t(path);
      return value ? String(value) : fallback;
    }

    function iconHp() {
      return uiIcon("ui.iconHp", "\u2665");
    }

    function iconGold() {
      return uiIcon("ui.iconGold", "\uD83D\uDCB0");
    }

    function iconUnknown() {
      return uiIcon("ui.iconUnknown", "\u2753");
    }

    function formatHp(value) {
      return `${value}${iconHp()}`;
    }

    function formatGold(value) {
      return `${value}${iconGold()}`;
    }

    function getTrapLogPhrases() {
      return {
        hit: "hits a trap",
        shielded: "but the Protection Seal saves them! The seal dissipates.",
        takes: "and takes",
        damage: "HP damage"
      };
    }

    function formatTrapLogMessage(playerName, phaseKey, damage, hpBefore, hpAfter) {
      const phrases = getTrapLogPhrases();
      const phaseLabel = getPhaseLabel(phaseKey, "en");
      return `${playerName} ${phrases.hit} ${getCellTypeIcon("trap")} (${phaseLabel}) ${phrases.takes} ${damage} ${phrases.damage} (${hpBefore} -> ${hpAfter}).`;
    }

    function formatShieldTrapLogMessage(playerName) {
      const phrases = getTrapLogPhrases();
      return `${playerName} ${phrases.hit} ${getCellTypeIcon("trap")}, ${phrases.shielded}`;
    }

    function localizeOptionLabel(key) {
      return TEXTS.ui?.[key] || "";
    }

    function getConfigInputValue(inputEl, fallback) {
      const raw = Number(inputEl?.value);
      return Number.isFinite(raw) ? Math.trunc(raw) : fallback;
    }

    function clampConfigNumber(value, min, max, fallback) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) return fallback;
      return Math.min(max, Math.max(min, Math.trunc(numeric)));
    }

    function computeLastCell(boardSize) {
      return Math.max(1, boardSize * boardSize);
    }

    function formatPercentValue(rawValue) {
      return `${Math.round(Number(rawValue) || 0)}%`;
    }

    function refreshConfigPreview() {
      if (!configLastCellPreviewEl) return;
      const boardSize = clampConfigNumber(getConfigInputValue(configBoardSizeEl, CONFIG.BOARD_SIZE || 10), 5, 20, CONFIG.BOARD_SIZE || 10);
      configLastCellPreviewEl.textContent = String(computeLastCell(boardSize));
    }

    function syncConfigRangeLabels() {
      if (fortuneGoodChanceValueEl) fortuneGoodChanceValueEl.textContent = formatPercentValue(configFortuneGoodChanceEl?.value ?? 0);
      if (blackMarketProfitChanceValueEl) blackMarketProfitChanceValueEl.textContent = formatPercentValue(configBlackMarketProfitChanceEl?.value ?? 0);
      if (altarShieldChanceValueEl) altarShieldChanceValueEl.textContent = formatPercentValue(configAltarShieldChanceEl?.value ?? 0);
    }

    function syncSettingsTab() {
      const panels = settingsPanelEl?.querySelectorAll("[data-settings-tab-panel]") || [];
      panels.forEach((panel) => {
        panel.classList.toggle("is-hidden", panel.dataset.settingsTabPanel !== settingsTab);
      });
      const tabButtons = [settingsGeneralTabBtnEl, settingsConfigTabBtnEl];
      tabButtons.forEach((buttonEl) => {
        if (!buttonEl) return;
        const active = buttonEl.dataset.settingsTab === settingsTab;
        buttonEl.classList.toggle("is-active", active);
        buttonEl.setAttribute("aria-selected", active ? "true" : "false");
      });
      try {
        window.localStorage.setItem(SETTINGS_TAB_KEY, settingsTab);
      } catch (_) {
        // ignore tab persistence issues
      }
    }

    function setSettingsTab(nextTab) {
      settingsTab = nextTab === "config" ? "config" : "general";
      syncSettingsTab();
    }

    function setConfigEditorStatus(message, kind = "info") {
      if (!configEditorStatusEl) return;
      configEditorStatusEl.textContent = message || "";
      configEditorStatusEl.dataset.kind = kind;
    }

    function syncConfigMenu() {
      if (configBoardSizeEl) configBoardSizeEl.value = String(CONFIG.BOARD_SIZE || 10);
      if (configPlayerMaxHpEl) configPlayerMaxHpEl.value = String(CONFIG.PLAYER_MAX_HP || 100);
      if (configGoldPerMoveEl) configGoldPerMoveEl.value = String(CONFIG.GOLD_PER_MOVE || 10);
      if (configInventorySlotsEl) configInventorySlotsEl.value = String(CONFIG.INVENTORY_SLOT_LIMIT || 4);
      if (configAutosaveDelayEl) configAutosaveDelayEl.value = String(CONFIG.AUTOSAVE_DELAY_MS || 900);
      if (configFinishersToEndGameEl) configFinishersToEndGameEl.value = String(CONFIG.FINISHERS_TO_END_GAME || 1);
      if (configFortuneGoodChanceEl) configFortuneGoodChanceEl.value = String(Math.round((Number(CONFIG.CHANCES?.fortune?.omenGoodChance) || 0) * 100));
      if (configBlackMarketProfitChanceEl) configBlackMarketProfitChanceEl.value = String(Math.round((Number(CONFIG.CHANCES?.blackMarket?.profitMax) || 0) * 100));
      if (configAltarShieldChanceEl) configAltarShieldChanceEl.value = String(Math.round((Number(CONFIG.CHANCES?.altar?.shieldMax) || 0) * 100));
      refreshConfigPreview();
      syncConfigRangeLabels();
      setConfigEditorStatus("");
    }

    function saveConfigOverridesFromMenu() {
      const boardSize = clampConfigNumber(getConfigInputValue(configBoardSizeEl, CONFIG.BOARD_SIZE || 10), 5, 20, CONFIG.BOARD_SIZE || 10);
      const playerMaxHp = clampConfigNumber(getConfigInputValue(configPlayerMaxHpEl, CONFIG.PLAYER_MAX_HP || 100), 10, 999, CONFIG.PLAYER_MAX_HP || 100);
      const goldPerMove = clampConfigNumber(getConfigInputValue(configGoldPerMoveEl, CONFIG.GOLD_PER_MOVE || 10), 1, 100, CONFIG.GOLD_PER_MOVE || 10);
      const inventorySlots = clampConfigNumber(getConfigInputValue(configInventorySlotsEl, CONFIG.INVENTORY_SLOT_LIMIT || 4), 1, 10, CONFIG.INVENTORY_SLOT_LIMIT || 4);
      const autosaveDelay = clampConfigNumber(getConfigInputValue(configAutosaveDelayEl, CONFIG.AUTOSAVE_DELAY_MS || 900), 100, 5000, CONFIG.AUTOSAVE_DELAY_MS || 900);
      const finishers = clampConfigNumber(getConfigInputValue(configFinishersToEndGameEl, CONFIG.FINISHERS_TO_END_GAME || 1), 1, 10, CONFIG.FINISHERS_TO_END_GAME || 1);
      const fortuneGoodChance = clampConfigNumber(getConfigInputValue(configFortuneGoodChanceEl, Math.round((Number(CONFIG.CHANCES?.fortune?.omenGoodChance) || 0) * 100)), 0, 100, Math.round((Number(CONFIG.CHANCES?.fortune?.omenGoodChance) || 0) * 100)) / 100;
      const blackMarketProfitChance = clampConfigNumber(getConfigInputValue(configBlackMarketProfitChanceEl, Math.round((Number(CONFIG.CHANCES?.blackMarket?.profitMax) || 0) * 100)), 0, 100, Math.round((Number(CONFIG.CHANCES?.blackMarket?.profitMax) || 0) * 100)) / 100;
      const altarShieldChance = clampConfigNumber(getConfigInputValue(configAltarShieldChanceEl, Math.round((Number(CONFIG.CHANCES?.altar?.shieldMax) || 0) * 100)), 0, 100, Math.round((Number(CONFIG.CHANCES?.altar?.shieldMax) || 0) * 100)) / 100;
      const overrides = {
        BOARD_SIZE: boardSize,
        LAST_CELL: computeLastCell(boardSize),
        PLAYER_MAX_HP: playerMaxHp,
        GOLD_PER_MOVE: goldPerMove,
        INVENTORY_SLOT_LIMIT: inventorySlots,
        AUTOSAVE_DELAY_MS: autosaveDelay,
        FINISHERS_TO_END_GAME: finishers,
        CHANCES: {
          fortune: { omenGoodChance: fortuneGoodChance },
          blackMarket: { profitMax: blackMarketProfitChance },
          altar: { shieldMax: altarShieldChance }
        }
      };
      try {
        window.localStorage.setItem(CONFIG_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
      } catch (_) {
        setConfigEditorStatus(t("ui.configSaveFailed"), "error");
        showLogToast(t("ui.configSaveFailed"));
        return;
      }
      setConfigEditorStatus(t("ui.configSaved"), "success");
      showLogToast(t("ui.configSaved"));
      window.setTimeout(() => window.location.reload(), 500);
    }

    function resetConfigOverrides() {
      try {
        window.localStorage.removeItem(CONFIG_OVERRIDES_STORAGE_KEY);
      } catch (_) {
        setConfigEditorStatus(t("ui.configResetFailed"), "error");
        showLogToast(t("ui.configResetFailed"));
        return;
      }
      setConfigEditorStatus(t("ui.configResetDone"), "success");
      showLogToast(t("ui.configResetDone"));
      window.setTimeout(() => window.location.reload(), 500);
    }

    function applyStaticTranslations() {
      document.documentElement.lang = currentLanguage;
      if (gameTitleEl) gameTitleEl.textContent = t("app.title");
      document.title = t("app.title");

      const legendLabels = TEXTS.legend || {};
      document.querySelectorAll(".legend span[data-legend]").forEach((spanEl) => {
        const key = spanEl.dataset.legend;
        const iconEl = spanEl.querySelector("i");
        const label = legendLabels[key] || "";
        spanEl.innerHTML = iconEl ? `${iconEl.outerHTML}${label}` : label;
      });

      document.querySelectorAll("[data-i18n]").forEach((node) => {
        const key = node.dataset.i18n;
        if (!key) return;
        node.textContent = t(key);
      });

      [
        settingsCloseBtnEl,
        closeShopBtnEl,
        closeInventoryBtnEl,
        closeVictoryBtnEl,
      ].forEach((buttonEl) => {
        if (buttonEl) buttonEl.textContent = "×";
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        const key = node.dataset.i18nPlaceholder;
        if (key) node.setAttribute("placeholder", t(key));
      });

      if (playerNameEl) playerNameEl.setAttribute("placeholder", t("ui.playerNamePlaceholder"));
      if (settingsPanelEl) settingsPanelEl.setAttribute("aria-label", t("ui.settingsTitle"));
      if (settingsLauncherEl) settingsLauncherEl.setAttribute("aria-label", t("ui.settingsTitle"));
      if (installAppBtnEl) installAppBtnEl.textContent = t("ui.installAppBtn");
      if (languageSelectEl) {
        languageSelectEl.value = currentLanguage;
        languageSelectEl.setAttribute("aria-label", t("app.languageLabel"));
        const options = languageSelectEl.options;
        if (options[0]) options[0].textContent = t("app.languageRu");
        if (options[1]) options[1].textContent = t("app.languageEn");
        if (options[2]) options[2].textContent = t("app.languageUk");
      }
      syncSidePanelPosition();
      if (logFilterSelectEl) {
        logFilterSelectEl.value = state.logFilter || "all";
      }
      if (diceResultEl) {
        diceResultEl.textContent = t("ui.diceResultIdle");
      }

      if (activePlayerSelectEl) {
        activePlayerSelectEl.querySelector("option[value='']")?.remove();
        const option = document.createElement("option");
        option.value = "";
        option.textContent = t("ui.activePlayerNone");
        activePlayerSelectEl.prepend(option);
      }

      if (shopOverlayEl?.classList.contains("visible")) {
        const config = getContextModeConfigs()[tileContextMode];
        if (config) {
          tileContextTitleEl.textContent = config.title;
          tileContextSubtitleEl.textContent = config.subtitle;
          tileContextPlayerLabelEl.textContent = config.playerLabel;
          setContextSectionVisible(config.sectionEl);
          refreshCurrentContextMenu(true);
        }
      }

      renderSelectedTile();
      renderTurnManager();
      renderPlayerSelect();
      renderPlayersMenu();
      renderLogWindow();
      syncConfigMenu();
    }

    function setLanguage(nextLanguage) {
      if (!SUPPORTED_LANGUAGES[nextLanguage]) return;
      currentLanguage = nextLanguage;
      TEXTS = window.GAME_I18N.getBundle(nextLanguage);
      window.GAME_I18N.setLanguageKey(LANGUAGE_STORAGE_KEY, nextLanguage);
      applyStaticTranslations();
      queueRender({ stats: true, players: true, selectedTile: true, refreshContextMenu: true, refreshInventoryOverlay: true, tokensFull: true });
    }

    function syncSidePanelPosition() {
      document.body.classList.toggle("side-panel-left", sidePanelLeft);
      if (sidePanelToggleBtnEl) {
        sidePanelToggleBtnEl.textContent = sidePanelLeft ? "→" : "←";
        sidePanelToggleBtnEl.setAttribute("aria-label", sidePanelLeft ? "Перенести панель вправо" : "Перенести панель влево");
        sidePanelToggleBtnEl.title = sidePanelLeft ? "Перенести панель вправо" : "Перенести панель влево";
        sidePanelToggleBtnEl.setAttribute("aria-pressed", sidePanelLeft ? "true" : "false");
      }
    }

    function setSidePanelLeft(nextValue) {
      sidePanelLeft = Boolean(nextValue);
      window.localStorage.setItem(SIDE_PANEL_LEFT_KEY, sidePanelLeft ? "1" : "0");
      syncSidePanelPosition();
    }

    function syncInstallButton() {
      if (!installAppBtnEl) return;
      installAppBtnEl.hidden = !deferredInstallPrompt;
    }

    async function promptInstallApp() {
      if (!deferredInstallPrompt) return;
      const promptEvent = deferredInstallPrompt;
      deferredInstallPrompt = null;
      syncInstallButton();
      promptEvent.prompt();
      try {
        await promptEvent.userChoice;
      } catch (_) {
        // No-op: the browser handles the result.
      }
    }

    function beginPerf(name) {
      if (!PERF_ENABLED) return null;
      const startMark = `${name}:start:${performance.now()}`;
      performance.mark(startMark);
      return { name, startMark };
    }

    function endPerf(handle) {
      if (!handle) return;
      const endMark = `${handle.name}:end:${performance.now()}`;
      performance.mark(endMark);
      performance.measure(handle.name, handle.startMark, endMark);

      const entries = performance.getEntriesByName(handle.name, "measure");
      const last = entries[entries.length - 1];
      const duration = last ? last.duration : 0;
      const stat = perfStats.get(handle.name) || { count: 0, total: 0, max: 0 };
      stat.count += 1;
      stat.total += duration;
      stat.max = Math.max(stat.max, duration);
      perfStats.set(handle.name, stat);

      if (stat.count % 40 === 0) {
        const avg = stat.total / stat.count;
        console.debug(`[perf] ${handle.name}: avg=${avg.toFixed(2)}ms max=${stat.max.toFixed(2)}ms n=${stat.count}`);
      }
      performance.clearMarks(handle.startMark);
      performance.clearMarks(endMark);
    }

    function requestIdle(callback) {
      if (typeof window.requestIdleCallback === "function") {
        autosaveIdleHandle = window.requestIdleCallback(() => {
          autosaveIdleHandle = null;
          callback();
        }, { timeout: 1500 });
        return;
      }
      autosaveIdleHandle = window.setTimeout(() => {
        autosaveIdleHandle = null;
        callback();
      }, 0);
    }

    function cancelIdle() {
      if (autosaveIdleHandle === null) return;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(autosaveIdleHandle);
      } else {
        clearTimeout(autosaveIdleHandle);
      }
      autosaveIdleHandle = null;
    }

    function normalizeLogEntry(raw) {
      if (!raw) return null;
      if (typeof raw === "object") {
        const text = String(raw.text || raw.m || "").trim();
        const atRaw = Number(raw.at ?? raw.t);
        const at = Number.isFinite(atRaw) ? atRaw : Date.now();
        const kind = normalizeLogKind(raw.kind, text);
        if (!text) return null;
        return { text, at, kind };
      }
      const text = String(raw).trim();
      if (!text) return null;
      return { text, at: Date.now(), kind: inferLogKind(text) };
    }

    function normalizeLogKind(kind, text = "") {
      const value = String(kind || "").trim();
      if (value && ["all", "system", "player", "shop", "ritual", "warning"].includes(value)) {
        return value;
      }
      return inferLogKind(text);
    }

    function inferLogKind(text) {
      const source = String(text || "").toLowerCase();
      if (!source) return "system";
      if (/(denied|unavailable|cannot|can't|lacks|lack|inventory full|already exists|not found|invalid|failed|must stand|must be|no player|error)/i.test(source)) {
        return "warning";
      }
      if (/(shop|relic|market|buy at shop|sell at shop|purchase|sale|shadow market)/i.test(source)) {
        return "shop";
      }
      if (/(oracle|prophecy|fortune|altar|ritual|sign|omen|blood altar)/i.test(source)) {
        return "ritual";
      }
      if (/(turn passed|game ready|saved|loaded|reset|new game|removed from the game|enters the game|drops out|sanctuary recognized|the ritual is over|undo)/i.test(source)) {
        return "system";
      }
      return "player";
    }

    function formatLogEntry(entry) {
      const safeAt = Number.isFinite(Number(entry?.at)) ? Number(entry.at) : Date.now();
      const safeText = String(entry?.text || "").trim();
      if (!safeText) return "";
      const locale = currentLanguage === "en" ? "en-US" : currentLanguage === "uk" ? "uk-UA" : "ru-RU";
      const time = new Date(safeAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const localizedText = window.GAME_I18N.translateLogMessage(safeText, currentLanguage);
      return `[${time}] ${localizedText}`;
    }

    function trimLogEntries() {
      if (state.logEntries.length <= MAX_LOG_ENTRIES) return;
      state.logEntries.splice(0, state.logEntries.length - MAX_LOG_ENTRIES);
    }

    function getRecentToastEntries() {
      const threshold = Date.now() - EVENT_LOG_TOAST_TTL_MS;
      return state.logEntries.filter((entry) => Number(entry?.at || 0) >= threshold).slice(-3);
    }

    function appendLogEntry(text, timestamp = "") {
      const cleanText = String(text || "").trim();
      if (!cleanText) return;
      let at = Date.now();
      if (timestamp) {
        const parsed = Date.parse(timestamp);
        if (Number.isFinite(parsed)) at = parsed;
      }
      state.logEntries.push({ text: cleanText, at, kind: inferLogKind(cleanText) });
      trimLogEntries();
    }

    function setLogEntriesFromText(logText) {
      const lines = String(logText || "")
        .split("\n")
        .map((entry) => entry.trim())
        .filter(Boolean);
      state.logEntries = lines
        .map((entry) => entry.replace(/^\[[^\]]+\]\s*/, ""))
        .map((text) => normalizeLogEntry(text))
        .filter(Boolean);
      trimLogEntries();
    }

    function getSerializedLogText() {
      return state.logEntries.map((entry) => formatLogEntry(entry)).filter(Boolean).join("\n");
    }

    function renderLogWindow() {
      const selectedFilter = state.logFilter || "all";
      const filtered = state.logEntries.filter((entry) => selectedFilter === "all" || entry.kind === selectedFilter);
      const visible = filtered.slice(-LOG_DOM_LIMIT).map((entry) => formatLogEntry(entry)).filter(Boolean);
      logBoxEl.textContent = visible.length ? `${visible.join("\n")}\n` : (state.logEntries.length ? t("eventJournal.emptyFiltered") : t("eventJournal.empty"));
      if (!eventJournalEl.classList.contains("is-hidden")) {
        logBoxEl.scrollTop = logBoxEl.scrollHeight;
      }
    }

    function syncLogLauncherState() {
      if (!eventJournalLauncherEl) return;
      const isOpen = !eventJournalEl.classList.contains("is-hidden");
      eventJournalLauncherEl.textContent = isOpen ? "−" : "≡";
      eventJournalLauncherEl.setAttribute("aria-label", isOpen ? "Свернуть логи" : "Логи");
      eventJournalLauncherEl.setAttribute("title", isOpen ? "Свернуть логи" : "Логи");
      eventJournalLauncherEl.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    function openLogPanel() {
      eventJournalEl.classList.remove("is-hidden");
      syncLogLauncherState();
      renderLogWindow();
      logBoxEl.scrollTop = logBoxEl.scrollHeight;
    }

    function closeLogPanel() {
      eventJournalEl.classList.add("is-hidden");
      syncLogLauncherState();
    }

    function toggleLogPanel() {
      if (eventJournalEl.classList.contains("is-hidden")) {
        openLogPanel();
      } else {
        closeLogPanel();
      }
    }

    function showLogToast(message) {
      if (!toastContainerEl) return;
      const toast = document.createElement("div");
      toast.className = "log-toast";
      toast.textContent = message;
      toastContainerEl.appendChild(toast);
      if (toastContainerEl.childElementCount > 4) {
        toastContainerEl.removeChild(toastContainerEl.firstElementChild);
      }
      window.setTimeout(() => {
        toast.classList.add("fade");
      }, Math.max(0, EVENT_LOG_TOAST_TTL_MS - 300));
      window.setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, EVENT_LOG_TOAST_TTL_MS);
    }

    function setLogFilter(nextFilter) {
      const value = String(nextFilter || "all");
      state.logFilter = ["all", "system", "player", "shop", "ritual", "warning"].includes(value) ? value : "all";
      if (logFilterSelectEl) {
        logFilterSelectEl.value = state.logFilter;
      }
      renderLogWindow();
    }

    function setSettingsPanelOpen(isOpen) {
      if (!settingsPanelEl) return;
      settingsPanelEl.classList.toggle("is-hidden", !isOpen);
      settingsPanelEl.classList.toggle("is-open", isOpen);
      if (settingsLauncherEl) {
        settingsLauncherEl.classList.toggle("is-hidden", isOpen);
        settingsLauncherEl.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
      if (isOpen) syncSettingsTab();
    }

    function markPlayerDirty(playerId, patch = {}) {
      if (!playerId) return;
      const current = dirtyPlayers.get(playerId) || {
        stats: false,
        row: false,
        context: false,
        inventoryOverlay: false,
        posFrom: null,
        posTo: null
      };
      const next = {
        stats: current.stats || Boolean(patch.stats),
        row: current.row || Boolean(patch.row),
        context: current.context || Boolean(patch.context),
        inventoryOverlay: current.inventoryOverlay || Boolean(patch.inventoryOverlay),
        posFrom: current.posFrom ?? patch.posFrom ?? null,
        posTo: patch.posTo ?? current.posTo ?? null
      };
      dirtyPlayers.set(playerId, next);
    }

    function queueRenderFromDirty(options = {}) {
      // Re-check fortune quests for players whose state changed before rendering UI.
      Array.from(dirtyPlayers.keys()).forEach((playerId) => {
        const player = state.players.find((entry) => entry.id === playerId);
        if (!player) return;
        tryResolveFortuneQuest(player);
      });

      const tokenPositions = [];
      let needsPlayers = false;
      let needsStats = false;
      let needsContext = false;
      let needsOverlay = false;

      dirtyPlayers.forEach((entry) => {
        needsPlayers = needsPlayers || entry.row || entry.posFrom !== null || entry.posTo !== null;
        needsStats = needsStats || entry.stats;
        needsContext = needsContext || entry.context;
        needsOverlay = needsOverlay || entry.inventoryOverlay;
        if (entry.posFrom !== null) tokenPositions.push(entry.posFrom);
        if (entry.posTo !== null) tokenPositions.push(entry.posTo);
      });

      queueRender({
        players: needsPlayers,
        stats: needsStats,
        selectedTile: Boolean(options.selectedTile),
        refreshContextMenu: needsContext,
        refreshInventoryOverlay: needsOverlay,
        tokensFull: Boolean(options.tokensFull)
      }, {
        autosave: Boolean(options.autosave),
        tokenPositions,
        tokenActiveIds: options.tokenActiveIds || []
      });
      dirtyPlayers.clear();
    }

    function queueRender(flags = {}, options = {}) {
      pendingRenderFlags.players = pendingRenderFlags.players || Boolean(flags.players);
      pendingRenderFlags.stats = pendingRenderFlags.stats || Boolean(flags.stats);
      pendingRenderFlags.selectedTile = pendingRenderFlags.selectedTile || Boolean(flags.selectedTile);
      pendingRenderFlags.refreshInventoryOverlay = pendingRenderFlags.refreshInventoryOverlay || Boolean(flags.refreshInventoryOverlay);
      pendingRenderFlags.refreshContextMenu = pendingRenderFlags.refreshContextMenu || Boolean(flags.refreshContextMenu);
      pendingRenderFlags.tokensFull = pendingRenderFlags.tokensFull || Boolean(flags.tokensFull);
      (options.tokenPositions || []).forEach((pos) => pendingTokenPositions.add(Number(pos)));
      (options.tokenActiveIds || []).forEach((id) => pendingTokenActiveIds.add(String(id)));
      pendingAutosave = pendingAutosave || Boolean(options.autosave);
      if (renderFrameId !== null) return;
      renderFrameId = window.requestAnimationFrame(flushQueuedRender);
    }

    function flushQueuedRender() {
      const perf = beginPerf("render.flush");
      renderFrameId = null;
      const frameStart = performance.now();
      const FRAME_BUDGET_MS = 8;
      const flags = pendingRenderFlags;
      pendingRenderFlags = {
        players: false,
        stats: false,
        selectedTile: false,
        refreshInventoryOverlay: false,
        refreshContextMenu: false,
        tokensFull: false
      };
      const shouldAutosave = pendingAutosave;
      pendingAutosave = false;
      const tokenPositions = pendingTokenPositions;
      const tokenActiveIds = pendingTokenActiveIds;
      pendingTokenPositions = new Set();
      pendingTokenActiveIds = new Set();
      let tokenRenderDone = false;

      function shouldYield() {
        return performance.now() - frameStart >= FRAME_BUDGET_MS;
      }

      function requeueRemaining(remainingFlags, remainingTokenPositions, remainingTokenActiveIds, remainingAutosave) {
        pendingRenderFlags.players = pendingRenderFlags.players || Boolean(remainingFlags.players);
        pendingRenderFlags.stats = pendingRenderFlags.stats || Boolean(remainingFlags.stats);
        pendingRenderFlags.selectedTile = pendingRenderFlags.selectedTile || Boolean(remainingFlags.selectedTile);
        pendingRenderFlags.refreshInventoryOverlay = pendingRenderFlags.refreshInventoryOverlay || Boolean(remainingFlags.refreshInventoryOverlay);
        pendingRenderFlags.refreshContextMenu = pendingRenderFlags.refreshContextMenu || Boolean(remainingFlags.refreshContextMenu);
        pendingRenderFlags.tokensFull = pendingRenderFlags.tokensFull || Boolean(remainingFlags.tokensFull);
        remainingTokenPositions.forEach((pos) => pendingTokenPositions.add(pos));
        remainingTokenActiveIds.forEach((id) => pendingTokenActiveIds.add(id));
        pendingAutosave = pendingAutosave || Boolean(remainingAutosave);
        if (renderFrameId === null) {
          renderFrameId = window.requestAnimationFrame(flushQueuedRender);
        }
      }

      if (flags.players) {
        renderPlayerSelect();
        renderPlayersMenu();
        renderTurnManager();
        flags.players = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.stats) {
        renderStats();
        flags.stats = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.selectedTile) {
        renderSelectedTile();
        flags.selectedTile = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.refreshInventoryOverlay && inventoryOverlayEl.classList.contains("visible")) {
        renderInventoryOverlay();
        flags.refreshInventoryOverlay = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.refreshContextMenu) {
        refreshCurrentContextMenu();
        flags.refreshContextMenu = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.tokensFull) {
        renderTokens({ forceFull: true });
        tokenRenderDone = true;
      } else if (tokenPositions.size > 0 || tokenActiveIds.size > 0) {
        renderTokens({
          positions: Array.from(tokenPositions),
          activeIds: Array.from(tokenActiveIds)
        });
        tokenRenderDone = true;
      }
      flags.tokensFull = false;
      if (shouldYield() && !tokenRenderDone) {
        requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
        endPerf(perf);
        return;
      }
      if (shouldAutosave) {
        scheduleAutoSave();
      }
      endPerf(perf);
    }

    function logEvent(text) {
      const message = window.GAME_I18N.translateLogMessage(text, currentLanguage);
      appendLogEntry(text);
      showLogToast(message);
      renderLogWindow();
    }

    function renderPlayersOnly() {
      queueRender({
        players: true,
        refreshInventoryOverlay: true,
        refreshContextMenu: true,
        tokensFull: true
      });
    }

    function renderStatsOnly() {
      queueRender({ stats: true });
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function syncBoardScaleVars() {
      if (!boardWrapEl || !boardEl) return;
      const boardSize = Math.max(1, Number(BOARD_SIZE) || 10);
      boardWrapEl.style.setProperty("--board-size", String(boardSize));

      const rect = boardEl.getBoundingClientRect();
      const boardPx = Math.max(1, Math.min(rect.width || 0, rect.height || 0) || 0);
      if (!Number.isFinite(boardPx) || boardPx <= 1) return;

      const cellPx = boardPx / boardSize;

      const cellPad = Math.round(clamp(cellPx * 0.10, 1, 4));
      const cellInset = Math.round(clamp(cellPx * 0.12, 1, 4));
      const cellRadius = Math.round(clamp(cellPx * 0.22, 3, 8));
      const cellNumFont = Math.round(clamp(cellPx * 0.33, 8, 14));
      const cellIconFont = Math.round(clamp(cellPx * 0.42, 9, 16));
      const cellRuneFont = Math.round(clamp(cellPx * 0.48, 10, 18));
      const cellIconRight = Math.round(clamp(cellPx * 0.12, 1, 5));
      const cellIconBottom = Math.round(clamp(cellPx * 0.10, 1, 4));
      const tokenSize = Math.round(clamp(cellPx * 0.62, 14, 26));
      const tokenFont = Math.round(clamp(cellPx * 0.32, 9, 14));

      boardWrapEl.style.setProperty("--cell-pad", `${cellPad}px`);
      boardWrapEl.style.setProperty("--cell-inset", `${cellInset}px`);
      boardWrapEl.style.setProperty("--cell-radius", `${cellRadius}px`);
      boardWrapEl.style.setProperty("--cell-num-font", `${cellNumFont}px`);
      boardWrapEl.style.setProperty("--cell-icon-font", `${cellIconFont}px`);
      boardWrapEl.style.setProperty("--cell-rune-font", `${cellRuneFont}px`);
      boardWrapEl.style.setProperty("--cell-icon-right", `${cellIconRight}px`);
      boardWrapEl.style.setProperty("--cell-icon-bottom", `${cellIconBottom}px`);
      boardWrapEl.style.setProperty("--token-size", `${tokenSize}px`);
      boardWrapEl.style.setProperty("--token-font", `${tokenFont}px`);
    }

    function normalizePlayerHp(playerLike) {
      const maxHpRaw = Number(playerLike?.maxHp);
      const maxHp = Math.max(1, Number.isFinite(maxHpRaw) ? maxHpRaw : PLAYER_MAX_HP);
      const hpRaw = Number(playerLike?.hp);
      const hp = clamp(Number.isFinite(hpRaw) ? hpRaw : maxHp, 0, maxHp);
      return { hp, maxHp };
    }

    function getCurrentBalanceProfile() {
      if (state.players.length === 0) return PHASE_BALANCE[0];
      const farthestPosition = state.players.reduce((maxPos, player) => Math.max(maxPos, player.position || 1), 1);
      return PHASE_BALANCE.find((profile) => farthestPosition <= profile.until) || PHASE_BALANCE[PHASE_BALANCE.length - 1];
    }

    function clonePlayers(players) {
      return players.map((player) => ({
        ...player,
        fortuneQuest: player.fortuneQuest ? { ...player.fortuneQuest } : null
      }));
    }

    function isPlayerFinished(playerLike) {
      return Boolean(playerLike?.finished);
    }

    function getFinishedPlayers() {
      return state.players
        .filter((player) => isPlayerFinished(player))
        .sort((a, b) => (Number(a.finishOrder) || 999) - (Number(b.finishOrder) || 999));
    }

    function getActivePlayers() {
      return state.players.filter((player) => !isPlayerFinished(player));
    }

    function getFinishRankLabel(rank) {
      if (rank === 1) return t("ui.finishRank1");
      if (rank === 2) return t("ui.finishRank2");
      if (rank === 3) return t("ui.finishRank3");
      return t("ui.finishRankN", { rank });
    }

    function cloneCells(cells) {
      return cells.map((cell) => ({ ...cell }));
    }

    function shuffleArray(values) {
      const result = Array.isArray(values) ? [...values] : [];
      for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    }

    function distributeCountAcrossWeights(total, weights) {
      const safeTotal = Math.max(0, Math.floor(Number(total) || 0));
      const safeWeights = Array.isArray(weights)
        ? weights.map((weight) => Math.max(0, Math.floor(Number(weight) || 0)))
        : [];
      const weightSum = safeWeights.reduce((sum, weight) => sum + weight, 0) || 1;
      const raw = safeWeights.map((weight) => safeTotal * weight / weightSum);
      const counts = raw.map((value) => Math.floor(value));
      let remaining = safeTotal - counts.reduce((sum, count) => sum + count, 0);
      const fractions = raw
        .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
        .sort((a, b) => b.fraction - a.fraction);
      let cursor = 0;
      while (remaining > 0 && fractions.length > 0) {
        counts[fractions[cursor % fractions.length].index] += 1;
        remaining -= 1;
        cursor += 1;
      }
      return counts;
    }

    function createFreshPlayerState(player) {
      const { maxHp } = normalizePlayerHp(player);
      return {
        ...player,
        position: 1,
        hp: maxHp,
        maxHp,
        gold: 0,
        boots: 0,
        shields: 0,
        luckCharm: 0,
        trapKit: 0,
        rerollStone: 0,
        alchemyCrystal: 0,
        bootsActive: false,
        fortuneQuest: null,
        finished: false,
        finishOrder: 0
      };
    }

    function generateCellLayout() {
      const layout = {
        trap: [],
        boost: [],
        shop: [],
        blackMarket: [],
        altar: [],
        fortuneTeller: []
      };
      const typeOrder = ["trap", "boost", "shop", "blackMarket", "altar", "fortuneTeller"];
      const phaseBuckets = [
        { key: "early", cells: shuffleArray(Array.from({ length: Math.max(0, 34 - 2 + 1) }, (_, index) => index + 2)) },
        { key: "mid", cells: shuffleArray(Array.from({ length: Math.max(0, 69 - 35 + 1) }, (_, index) => index + 35)) },
        { key: "late", cells: shuffleArray(Array.from({ length: Math.max(0, LAST_CELL - 1 - 70 + 1) }, (_, index) => index + 70)) }
      ];
      const allCandidates = shuffleArray(Array.from({ length: Math.max(0, LAST_CELL - 1 - 2 + 1) }, (_, index) => index + 2));
      const occupied = new Set([1, LAST_CELL]);

      typeOrder.forEach((type) => {
        const targetCount = Array.isArray(CELL_LAYOUT[type]) ? CELL_LAYOUT[type].length : 0;
        const phaseCounts = distributeCountAcrossWeights(targetCount, phaseBuckets.map((bucket) => bucket.cells.length));
        phaseCounts.forEach((count, phaseIndex) => {
          let placed = 0;
          const bucket = phaseBuckets[phaseIndex];
          for (const cellNumber of bucket.cells) {
            if (occupied.has(cellNumber)) continue;
            occupied.add(cellNumber);
            layout[type].push(cellNumber);
            placed += 1;
            if (placed >= count) break;
          }
        });

        while (layout[type].length < targetCount) {
          const fallbackCell = allCandidates.find((cellNumber) => !occupied.has(cellNumber));
          if (!fallbackCell) break;
          occupied.add(fallbackCell);
          layout[type].push(fallbackCell);
        }
      });

      return layout;
    }

    function renderShopMenuItems() {
      shopItemsListEl.innerHTML = "";
      SHOP_ITEMS.forEach((item) => {
        const info = SHOP_ITEM_META[item.id] || { icon: iconUnknown() };
        const itemName = getShopItemName(item);
        const itemDesc = getShopItemDesc(item, currentLanguage);
        const slot = document.createElement("div");
        slot.className = "inv-slot occupied usable";
        slot.dataset.shopItemId = item.id;
        slot.innerHTML = `
          <span class="item-icon">${info.icon}</span>
          <span class="slot-price">${formatGold(item.price)}</span>
          <div class="item-tooltip"><b>${itemName}</b><br>${itemDesc}</div>
        `;
        shopItemsListEl.appendChild(slot);
      });
      contextInit.shop = true;
    }

    function ensureContextInitialized(mode) {
      if (mode === "shop" && !contextInit.shop) {
        renderShopMenuItems();
      }
      if (mode && contextInit[mode] === false) {
        contextInit[mode] = true;
      }
    }

    function playersInAnyCellType(cellType) {
      return state.players.filter((player) => hasCellType(player.position, cellType));
    }

    function renderContextPlayerSelect(cellType, emptyText) {
      const candidates = playersInAnyCellType(cellType);
      const previous = shopBuyerSelectEl.value;
      shopBuyerSelectEl.innerHTML = "";

      if (candidates.length === 0) {
        shopBuyerSelectEl.innerHTML = `<option value="">${emptyText}</option>`;
        return null;
      }

      candidates.forEach((player) => {
        const option = document.createElement("option");
        option.value = player.id;
        option.textContent = player.name;
        shopBuyerSelectEl.appendChild(option);
      });

      if (candidates.some((player) => player.id === previous)) {
        shopBuyerSelectEl.value = previous;
      } else {
        shopBuyerSelectEl.value = candidates[0].id;
      }

      return candidates.find((player) => player.id === shopBuyerSelectEl.value) || candidates[0];
    }

    function renderShopBuyerSelect() {
      return renderContextPlayerSelect("shop", TEXTS.emptySelect.shop);
    }

    function renderFortuneBuyerSelect() {
      return renderContextPlayerSelect("fortuneTeller", TEXTS.emptySelect.fortuneTeller);
    }

    function buildInventorySlotsHtml(player, options = {}) {
      const { includeUseActions = false, maxSlots = INVENTORY_SLOT_LIMIT } = options;
      const cacheKey = [
        player.id,
        includeUseActions ? 1 : 0,
        maxSlots,
        state.rolling ? 1 : 0,
        player.boots,
        player.shields,
        player.luckCharm,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal
      ].join("|");
      const cached = inventorySlotsCache.get(cacheKey);
      if (cached) return cached;
      const itemDefs = [
        { id: "boots", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "boots")), icon: SHOP_ITEM_META.boots.icon, count: player.boots, usable: true, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "boots")) },
        { id: "shields", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "shield")), icon: SHOP_ITEM_META.shield.icon, count: player.shields, usable: false, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "shield")) },
        { id: "luckCharm", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "luckCharm")), icon: SHOP_ITEM_META.luckCharm.icon, count: player.luckCharm, usable: true, desc: t("items.luckCharm.desc") },
        { id: "trapKit", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "trapKit")), icon: SHOP_ITEM_META.trapKit.icon, count: player.trapKit, usable: true, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "trapKit")) },
        { id: "rerollStone", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "rerollStone")), icon: SHOP_ITEM_META.rerollStone.icon, count: player.rerollStone, usable: true, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "rerollStone")) },
        { id: "alchemyCrystal", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "alchemyCrystal")), icon: SHOP_ITEM_META.alchemyCrystal.icon, count: player.alchemyCrystal, usable: true, desc: t("items.alchemyCrystal.desc") }
      ].filter((item) => item.count > 0);

      const slots = Array.from({ length: maxSlots }, (_, index) => itemDefs[index] || null);
      const slotsHtml = slots.map((item) => {
        if (!item) return `<div class="inv-slot">+</div>`;
        // Prevent using boots if they are already active
        const canUse = includeUseActions && item.usable && !(item.id === "boots" && player.bootsActive);
        const disabledFlag = canUse && (state.rolling || (item.id === "boots" && player.bootsActive));
        const slotClasses = `inv-slot occupied${canUse ? " usable" : ""}${disabledFlag ? " disabled" : ""}`;
        const dataUse = canUse && !disabledFlag ? `data-use-item="${item.id}"` : "";
        const disabled = disabledFlag ? `data-disabled="true"` : "";
        return `
          <div class="${slotClasses}" data-inv-item-id="${item.id}" ${dataUse} ${disabled}>
            <span class="item-icon">${item.icon}</span>
            <span class="slot-count">x${item.count}</span>
            <div class="item-tooltip"><b>${item.label}</b><br>${item.desc}</div>
          </div>
        `;
      }).join("");

      const value = { slotsHtml };
      inventorySlotsCache.set(cacheKey, value);
      if (inventorySlotsCache.size > MAX_INVENTORY_CACHE) {
        const firstKey = inventorySlotsCache.keys().next().value;
        inventorySlotsCache.delete(firstKey);
      }
      return value;
    }

    function getOccupiedInventorySlots(player) {
      const counts = [
        player.boots,
        player.shields,
        player.luckCharm,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal
      ];
      return counts.reduce((acc, count) => acc + (count > 0 ? 1 : 0), 0);
    }

    function canAddItemType(player, itemId) {
      const byId = {
        boots: player.boots,
        shield: player.shields,
        luckCharm: player.luckCharm,
        trapKit: player.trapKit,
        rerollStone: player.rerollStone,
        alchemyCrystal: player.alchemyCrystal
      };
      const current = byId[itemId] ?? 0;
      if (current > 0) return true;
      return getOccupiedInventorySlots(player) < INVENTORY_SLOT_LIMIT;
    }

    function renderShopPlayerInventory() {
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) {
        shopPlayerMetaEl.textContent = "";
        shopPlayerInventoryEl.innerHTML = Array.from({ length: 4 }, () => `<div class="inv-slot">+</div>`).join("");
        return;
      }

      shopPlayerMetaEl.innerHTML = `
        <span class="player-gold">${formatHp(player.hp)}</span>
        <span id="shopBuyerGold" class="player-gold">${formatGold(player.gold)}</span>
      `;
      const { slotsHtml } = buildInventorySlotsHtml(player, { includeUseActions: false });
      shopPlayerInventoryEl.innerHTML = slotsHtml;
    }

    function renderFortunePlayerInfo() {
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) {
        fortunePlayerMetaEl.textContent = "";
        fortuneTextEl.textContent = "";
        fortuneActionBtnEl.disabled = true;
        return;
      }
      const onFortuneCell = hasCellType(player.position, "fortuneTeller");
      const canPay = player.gold >= SERVICE_COSTS.fortuneTeller;
      if (player.fortuneQuest) {
        const tone = player.fortuneQuest.omenLabel || t("ui.activeEffectsNone");
        fortuneTextEl.textContent = `${tone}. ${t("ui.activeEffectsTitle")}: ${getFortuneQuestConditionText(player.fortuneQuest)}`;
      } else {
        fortuneTextEl.textContent = t("context.fortuneSubtitle");
      }
      fortunePlayerMetaEl.innerHTML = `
        <span class="player-gold">${formatHp(player.hp)}</span>
        <span class="player-gold">${formatGold(player.gold)}</span>
      `;
      fortuneActionBtnEl.disabled = state.rolling || !onFortuneCell || !canPay || Boolean(player.fortuneQuest);
    }

    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function animateDiceVisual(roll) {
      if (!diceCubeEl || !diceResultEl) return Promise.resolve();
      const target = DICE_ROTATIONS[roll];
      if (!target) return Promise.resolve();
      const extraX = (Math.floor(Math.random() * 3) + 2) * 360;
      const extraY = (Math.floor(Math.random() * 3) + 2) * 360;
      diceRotationX = target.x + extraX;
      diceRotationY = target.y + extraY;
      diceCubeEl.style.transform = `rotateX(${diceRotationX}deg) rotateY(${diceRotationY}deg)`;
      diceResultEl.textContent = t("ui.diceResultRolling");
      return new Promise((resolve) => {
        setTimeout(() => {
          diceResultEl.textContent = t("ui.diceResultValue", { roll });
          resolve();
        }, DICE_ANIMATION_MS);
      });
    }

    function createFortuneQuest(player) {
      const roll = Math.random();
      const cellTypeChoices = ["shop", "blackMarket", "altar", "fortuneTeller", "boost"];
      const itemChoices = [
        { key: "boots", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "boots")) },
        { key: "shields", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "shield")) },
        { key: "luckCharm", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "luckCharm")) },
        { key: "trapKit", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "trapKit")) }
      ];
      const omenType = Math.random() < CHANCES.fortune.omenGoodChance ? "good" : "bad";
      const omenLabel = omenType === "good" ? t("ui.omenGood") : t("ui.omenBad");

      if (roll < CHANCES.fortune.questType.reachCellMax) {
        const targetCell = clamp(player.position + randomInt(4, 12), 2, LAST_CELL);
        const stepHint = Math.max(1, targetCell - player.position);
        return {
          omenType,
          omenLabel,
          type: "reachCell",
          targetCell,
          stepHint,
          description: t("quest.reachCell", { targetCell })
        };
      }

      if (roll < CHANCES.fortune.questType.itemOnCellTypeMax) {
        const item = itemChoices[randomInt(0, itemChoices.length - 1)];
        const cellType = cellTypeChoices[randomInt(0, cellTypeChoices.length - 1)];
        return {
          omenType,
          omenLabel,
          type: "itemOnCellType",
          requiredItem: item.key,
          requiredItemLabel: item.label,
          requiredCellType: cellType,
          requiredCellTypeLabel: getCellTypeLabel(cellType),
          description: t("quest.itemOnCellType", { item: item.label, cellTypeLabel: getCellTypeLabel(cellType) })
        };
      }

      const goldTarget = randomInt(90, 150);
      const cellType = cellTypeChoices[randomInt(0, cellTypeChoices.length - 1)];
      return {
        omenType,
        omenLabel,
        type: "goldOnCellType",
        minGold: goldTarget,
        requiredCellType: cellType,
        requiredCellTypeLabel: getCellTypeLabel(cellType),
        description: t("quest.goldOnCellType", { minGold: goldTarget, cellTypeLabel: getCellTypeLabel(cellType) })
      };
    }

    function isFortuneQuestCompleted(player, quest) {
      if (!quest) return false;
      if (quest.type === "reachCell") return player.position === quest.targetCell;
      if (quest.type === "itemOnCellType") {
        return (player[quest.requiredItem] || 0) > 0 && hasCellType(player.position, quest.requiredCellType);
      }
      if (quest.type === "goldOnCellType") {
        return player.gold >= quest.minGold && hasCellType(player.position, quest.requiredCellType);
      }
      return false;
    }

    function resolveFortuneQuestReward(player, quest) {
      const result = FortuneActions.applyFortuneRewardState({
        player,
        rewardRoll: Math.random(),
        goldChanceMax: CHANCES.fortune.reward.goldMax,
        shieldChanceMax: CHANCES.fortune.reward.shieldMax,
        goldReward: REWARDS.fortuneGoldReward
      });
      if (!result.ok) return;

      updatePlayerInState(player.id, result.player);
      if (result.reward === "gold") {
        logEvent(`${player.name} receives a prophecy reward of +${formatGold(result.gold)}.`);
        return;
      }
      if (result.reward === "shield") {
        logEvent(`${player.name} receives +1 Protection Seal.`);
        return;
      }
      logEvent(`${player.name} receives +1 Ritual Greaves.`);
    }

    function tryResolveFortuneQuest(player) {
      if (!player?.fortuneQuest) return;
      if (!isFortuneQuestCompleted(player, player.fortuneQuest)) return;
      resolveFortuneQuestReward(player, player.fortuneQuest);
    }

    function renderBlackMarketPlayerInfo() {
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) {
        blackMarketPlayerMetaEl.textContent = "";
        blackMarketActionBtnEl.disabled = true;
        return;
      }
      const onBlackMarket = hasCellType(player.position, "blackMarket");
      const canPay = player.gold >= SERVICE_COSTS.blackMarket;
      blackMarketPlayerMetaEl.innerHTML = `
        <span class="player-gold">${formatHp(player.hp)}</span>
        <span class="player-gold">${formatGold(player.gold)}</span>
      `;
      blackMarketActionBtnEl.disabled = state.rolling || !onBlackMarket || !canPay;
    }

    function renderAltarPlayerInfo() {
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) {
        altarPlayerMetaEl.textContent = "";
        altarActionBtnEl.disabled = true;
        return;
      }
      const onAltar = hasCellType(player.position, "altar");
      const canPay = player.gold >= SERVICE_COSTS.altar;
      altarPlayerMetaEl.innerHTML = `
        <span class="player-gold">${formatHp(player.hp)}</span>
        <span class="player-gold">${formatGold(player.gold)}</span>
      `;
      altarActionBtnEl.disabled = state.rolling || !onAltar || !canPay;
    }

    function animateContextGoldDelta(delta) {
      if (!delta) return;
      let metaEl = null;
      if (tileContextMode === "fortuneTeller") metaEl = fortunePlayerMetaEl;
      if (tileContextMode === "blackMarket") metaEl = blackMarketPlayerMetaEl;
      if (tileContextMode === "altar") metaEl = altarPlayerMetaEl;
      const goldEl = metaEl ? metaEl.querySelector(".player-gold") : null;
      if (!goldEl) return;
      UIEffects.popGoldAtElement(goldEl, delta);
    }

    function pushHistory(actionLabel) {
      state.history.push({
        actionLabel,
        players: clonePlayers(state.players),
        cells: cloneCells(state.cells),
        selectedPlayerId: state.selectedPlayerId,
        selectedCell: state.selectedCell,
        turnIndex: state.turnIndex,
        logEntries: [...state.logEntries],
        gameEnded: state.gameEnded
      });
      if (state.history.length > 80) {
        state.history.shift();
      }
    }

    function buildSaveSnapshot() {
      return {
        v: STATE_VERSION,
        players: clonePlayers(state.players),
        cells: cloneCells(state.cells),
        selectedPlayerId: state.selectedPlayerId,
        selectedCell: state.selectedCell,
        turnIndex: state.turnIndex,
        logEntries: [...state.logEntries],
        gameEnded: state.gameEnded
      };
    }

    function packPlayer(player) {
      return {
        i: player.id,
        n: player.name,
        p: player.position,
        av: player.avatar || "",
        h: player.hp,
        mh: player.maxHp,
        g: player.gold,
        b: player.boots,
        s: player.shields,
        l: player.luckCharm,
        t: player.trapKit,
        r: player.rerollStone,
        a: player.alchemyCrystal,
        ba: player.bootsActive ? 1 : 0,
        fq: player.fortuneQuest || null,
        fi: player.finished ? 1 : 0,
        fo: Number(player.finishOrder) || 0
      };
    }

    function unpackPlayer(raw) {
      if (!raw || typeof raw !== "object") return null;
      if ("id" in raw) return raw;
      return {
        id: String(raw.i || ""),
        name: String(raw.n || ""),
        avatar: String(raw.av || ""),
        position: Number(raw.p) || 1,
        hp: Number(raw.h),
        maxHp: Number(raw.mh),
        gold: Number(raw.g) || 0,
        boots: Number(raw.b) || 0,
        shields: Number(raw.s) || 0,
        luckCharm: Number(raw.l) || 0,
        trapKit: Number(raw.t) || 0,
        rerollStone: Number(raw.r) || 0,
        alchemyCrystal: Number(raw.a) || 0,
        bootsActive: Boolean(raw.ba),
        fortuneQuest: raw.fq && typeof raw.fq === "object" ? { ...raw.fq } : null,
        finished: Boolean(raw.fi),
        finishOrder: Number(raw.fo) || 0
      };
    }

    function packCell(cell) {
      return [cell.number, Array.isArray(cell.types) ? cell.types : []];
    }

    function unpackCell(raw, index) {
      if (Array.isArray(raw)) {
        return { number: Number(raw[0]) || index + 1, types: normalizeCellTypes(raw[1], Number(raw[0]) || index + 1) };
      }
      const number = index + 1;
      const rawTypes = Array.isArray(raw?.types)
        ? raw.types
        : (typeof raw?.type === "string" && raw.type !== "normal" ? [raw.type] : []);
      return { number, types: normalizeCellTypes(rawTypes, number) };
    }

    function packSnapshot(snapshot) {
      return {
        v: snapshot.v || STATE_VERSION,
        p: snapshot.players.map(packPlayer),
        c: snapshot.cells.map(packCell),
        sp: snapshot.selectedPlayerId,
        sc: snapshot.selectedCell,
        ti: snapshot.turnIndex,
        ge: snapshot.gameEnded ? 1 : 0,
        le: snapshot.logEntries
          .map((entry) => normalizeLogEntry(entry))
          .filter(Boolean)
          .map((entry) => ({ t: entry.at, m: entry.text }))
      };
    }

    function unpackSnapshot(parsed) {
      if (!parsed || typeof parsed !== "object") return null;
      if (Array.isArray(parsed.players)) return parsed;
      if (!Array.isArray(parsed.p)) return null;
      return {
        v: Number(parsed.v) || 1,
        players: parsed.p.map(unpackPlayer).filter(Boolean),
        cells: Array.isArray(parsed.c) ? parsed.c.map((cell, index) => unpackCell(cell, index)) : [],
        selectedPlayerId: typeof parsed.sp === "string" ? parsed.sp : "",
        selectedCell: Number(parsed.sc) || 1,
        turnIndex: Number(parsed.ti) || 0,
        logEntries: Array.isArray(parsed.le) ? parsed.le.map((entry) => normalizeLogEntry(entry)).filter(Boolean) : [],
        gameEnded: Boolean(parsed.ge)
      };
    }

    function saveGameState(silent = false) {
      const perf = beginPerf("autosave.write");
      const snapshot = packSnapshot(buildSaveSnapshot());
      const snapshotJson = JSON.stringify(snapshot);
      if (snapshotJson === lastSavedSnapshotJson) {
        endPerf(perf);
        return;
      }
      localStorage.setItem(SAVE_KEY, snapshotJson);
      lastSavedSnapshotJson = snapshotJson;
      endPerf(perf);
      if (!silent) logEvent(t("ui.gameSaved"));
    }

    function scheduleAutoSave() {
      const perf = beginPerf("autosave.schedule");
      clearTimeout(autosaveTimer);
      cancelIdle();
      autosaveTimer = setTimeout(() => {
        requestIdle(() => saveGameState(true));
      }, AUTOSAVE_DELAY_MS);
      endPerf(perf);
    }

    function isValidLoadedPlayer(player) {
      if (!player || typeof player !== "object") return false;
      if (typeof player.id !== "string" || typeof player.name !== "string") return false;
      if (!Number.isFinite(player.position) || !Number.isFinite(player.gold)) return false;
      if ("hp" in player && !Number.isFinite(Number(player.hp))) return false;
      if ("maxHp" in player && !Number.isFinite(Number(player.maxHp))) return false;
      return true;
    }

    function loadGameState(silent = false) {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        if (!silent) logEvent(t("ui.saveNotFound"));
        return false;
      }

      let parsed;
      try {
        parsed = unpackSnapshot(JSON.parse(raw));
      } catch (_) {
        if (!silent) logEvent(t("ui.saveInvalidFormat"));
        return false;
      }

      if (!parsed || !Array.isArray(parsed.players) || !parsed.players.every(isValidLoadedPlayer)) {
        if (!silent) logEvent(t("ui.saveInvalidData"));
        return false;
      }

      const loadedPlayers = parsed.players.map((player) => ({
        ...normalizePlayerHp(player),
        id: String(player.id),
        avatar: String(player.avatar || ""),
        name: String(player.name),
        position: clamp(Number(player.position) || 1, 1, LAST_CELL),
        gold: Math.max(0, Number(player.gold) || 0),
        boots: Math.max(0, Number(player.boots) || 0),
        shields: Math.max(0, Number(player.shields) || 0),
        luckCharm: Math.max(0, Number(player.luckCharm) || 0),
        trapKit: Math.max(0, Number(player.trapKit) || 0),
        rerollStone: Math.max(0, Number(player.rerollStone) || 0),
        alchemyCrystal: Math.max(0, Number(player.alchemyCrystal) || 0),
        bootsActive: Boolean(player.bootsActive),
        fortuneQuest: player.fortuneQuest && typeof player.fortuneQuest === "object" ? { ...player.fortuneQuest } : null,
        finished: Boolean(player.finished),
        finishOrder: Math.max(0, Number(player.finishOrder) || 0)
      }));

      if (Array.isArray(parsed.cells) && parsed.cells.length === LAST_CELL) {
        state.cells = parsed.cells.map((cell, index) => unpackCell(cell, index));
      } else {
        buildCells();
      }

      let loadedSelectedPlayerId = typeof parsed.selectedPlayerId === "string" ? parsed.selectedPlayerId : "";
      if (!loadedPlayers.some((player) => player.id === loadedSelectedPlayerId)) {
        loadedSelectedPlayerId = loadedPlayers[0]?.id || "";
      }
      dispatch({
        type: "PATCH",
        patch: {
          players: loadedPlayers,
          selectedPlayerId: loadedSelectedPlayerId,
          selectedCell: clamp(Number(parsed.selectedCell) || 1, 1, LAST_CELL),
          turnIndex: clamp(Number(parsed.turnIndex) || 0, 0, Math.max(0, loadedPlayers.length - 1)),
          rolling: false,
          history: [],
          gameEnded: Boolean(parsed.gameEnded)
        }
      });

      if (Array.isArray(parsed.logEntries)) {
        state.logEntries = parsed.logEntries.map((entry) => normalizeLogEntry(entry)).filter(Boolean);
        trimLogEntries();
      } else {
        setLogEntriesFromText(typeof parsed.logText === "string" ? parsed.logText : "");
      }
      renderLogWindow();

      hideTileContextMenu();
      closeInventoryOverlay();
      closeVictoryOverlay();
      createBoard();
      fullRender(false);
      lastSavedSnapshotJson = raw;
      if (state.gameEnded) openVictoryOverlay();
      if (!silent) logEvent(t("ui.saveLoaded"));
      return true;
    }

    function startNewGameWithSamePlayers() {
      clearTimeout(autosaveTimer);
      cancelIdle();
      localStorage.removeItem(SAVE_KEY);
      lastSavedSnapshotJson = "";
      const nextPlayers = state.players.length ? state.players.map((player) => createFreshPlayerState(player)) : [];
      dispatch({
        type: "PATCH",
        patch: {
          players: nextPlayers,
          selectedPlayerId: nextPlayers[0]?.id || "",
          selectedCell: 1,
          rolling: false,
          turnIndex: 0,
          history: [],
          logEntries: [],
          gameEnded: false
        }
      });
      renderLogWindow();

      hideTileContextMenu();
      closeInventoryOverlay();
      closeVictoryOverlay();
      buildCells();
      createBoard();
      fullRender(false);
      logEvent(t("ui.newGameStarted"));
    }

    function resetGameWithConfirm() {
      const useFullReset = Boolean(fullResetToggleEl?.checked);
      const confirmed = window.confirm(useFullReset ? t("ui.confirmFullReset") : t("ui.confirmReset"));
      if (!confirmed) return;
      if (useFullReset) {
        resetAllGameWithConfirm(true);
      } else {
        startNewGameWithSamePlayers();
      }
    }

    function resetAllGameWithConfirm(skipConfirm = false) {
      const confirmed = skipConfirm ? true : window.confirm(t("ui.confirmFullReset"));
      if (!confirmed) return;

      clearTimeout(autosaveTimer);
      cancelIdle();
      localStorage.removeItem(SAVE_KEY);
      lastSavedSnapshotJson = "";
      dispatch({
        type: "PATCH",
        patch: {
          players: [],
          selectedPlayerId: "",
          selectedCell: 1,
          rolling: false,
          turnIndex: 0,
          history: [],
          logEntries: [],
          gameEnded: false
        }
      });
      renderLogWindow();
      hideTileContextMenu();
      closeInventoryOverlay();
      closeVictoryOverlay();
      buildCells();
      createBoard();
      fullRender(false);
      logEvent(t("ui.fullResetDone"));
    }

    function syncTurnIndexToSelected() {
      const activePlayers = getActivePlayers();
      const index = activePlayers.findIndex((player) => player.id === state.selectedPlayerId);
      if (index >= 0) {
        state.turnIndex = index;
      } else if (activePlayers.length > 0) {
        state.turnIndex = clamp(state.turnIndex, 0, activePlayers.length - 1);
        state.selectedPlayerId = activePlayers[state.turnIndex].id;
      } else if (state.players.length > 0) {
        state.turnIndex = 0;
        state.selectedPlayerId = state.players[0].id;
      } else {
        state.turnIndex = 0;
      }
    }

    function selectPlayerByTurnIndex() {
      const activePlayers = getActivePlayers();
      if (activePlayers.length === 0) {
        state.selectedPlayerId = "";
        state.turnIndex = 0;
        return;
      }
      state.turnIndex = (state.turnIndex + activePlayers.length) % activePlayers.length;
      state.selectedPlayerId = activePlayers[state.turnIndex].id;
    }

    function cellNumberToCoord(cellNumber) {
      const index = cellNumber - 1;
      const rowFromBottom = Math.floor(index / BOARD_SIZE);
      const colInRow = index % BOARD_SIZE;
      const row = BOARD_SIZE - rowFromBottom;
      const col = rowFromBottom % 2 === 0 ? colInRow + 1 : BOARD_SIZE - colInRow;
      return { row, col };
    }

    function buildCells() {
      const layout = generateCellLayout();
      const traps = new Set(layout.trap || []);
      const boosts = new Set(layout.boost || []);
      const shops = new Set(layout.shop || []);
      const blackMarkets = new Set(layout.blackMarket || []);
      const altars = new Set(layout.altar || []);
      const fortuneTellers = new Set(layout.fortuneTeller || []);

      state.cells = Array.from({ length: LAST_CELL }, (_, i) => {
        const number = i + 1;
        const types = [];
        if (number === LAST_CELL) types.push("finish");
        if (traps.has(number)) types.push("trap");
        if (boosts.has(number)) types.push("boost");
        if (shops.has(number)) types.push("shop");
        if (blackMarkets.has(number)) types.push("blackMarket");
        if (altars.has(number)) types.push("altar");
        if (fortuneTellers.has(number)) types.push("fortuneTeller");
        return { number, types };
      });
    }

    function normalizeCellTypes(rawTypes, number = 1) {
      const allowed = new Set(["trap", "boost", "shop", "blackMarket", "altar", "fortuneTeller", "lottery", "finish"]);
      const uniq = new Set();
      (Array.isArray(rawTypes) ? rawTypes : []).forEach((type) => {
        if (type === "lottery") type = "fortuneTeller";
        if (allowed.has(type)) uniq.add(type);
      });
      if (number === LAST_CELL) uniq.add("finish");
      return Array.from(uniq);
    }

    function getCellTypes(cellNumber) {
      const cell = state.cells[cellNumber - 1];
      if (!cell) return [];
      if (Array.isArray(cell.types)) return normalizeCellTypes(cell.types, cellNumber);
      if (typeof cell.type === "string" && cell.type !== "normal") return normalizeCellTypes([cell.type], cellNumber);
      return [];
    }

    function hasCellType(cellNumber, type) {
      return getCellTypes(cellNumber).includes(type);
    }

    function getPrimaryCellType(types) {
      if (types.includes("finish")) return "finish";
      if (types.includes("trap")) return "trap";
      if (types.includes("boost")) return "boost";
      if (types.includes("shop")) return "shop";
      if (types.includes("blackMarket")) return "blackMarket";
      if (types.includes("altar")) return "altar";
      if (types.includes("fortuneTeller")) return "fortuneTeller";
      return "normal";
    }

    function getCellBackgroundStyle(types) {
      if (!types.length) return "";
      if (types.length === 1) return "";
      const palette = types.map((type) => CELL_TYPE_COLORS[type]).filter(Boolean);
      return `linear-gradient(135deg, ${palette.join(", ")})`;
    }

    function createBoard() {
      syncBoardScaleVars();
      boardEl.innerHTML = "";
      boardCellEls = new Array(LAST_CELL + 1);
      cellCenters = new Array(LAST_CELL + 1);
      cellCentersValid = false;
      lastRenderedSelectedCell = 0;
      const fragment = document.createDocumentFragment();
      for (const cell of state.cells) {
        const { row, col } = cellNumberToCoord(cell.number);
        const types = getCellTypes(cell.number);
        const primary = getPrimaryCellType(types);
        const cellEl = document.createElement("div");
        cellEl.className = `cell cell-${primary}`;
        cellEl.style.gridRow = String(row);
        cellEl.style.gridColumn = String(col);
        cellEl.dataset.cell = String(cell.number);
        const icons = types.map((type) => getCellTypeIcon(type)).filter(Boolean);
        const bgStyle = getCellBackgroundStyle(types);
        if (bgStyle) cellEl.style.background = bgStyle;

        cellEl.innerHTML = `<span class="cell-num">${cell.number}</span>${icons.length ? `<span class="cell-icon">${icons.slice(0, 2).join("")}</span>` : ""}`;
        cellEl.addEventListener("click", () => {
          state.selectedCell = cell.number;
          renderSelectedTile();
          hideTileContextMenu();
        });
        boardCellEls[cell.number] = cellEl;
        fragment.appendChild(cellEl);
      }
      boardEl.appendChild(fragment);
      renderBoardStaticLayer();
    }

    function renderBoardStaticLayer() {
      if (!boardStaticLayerEl) return;
      const ctx = boardStaticLayerEl.getContext("2d");
      if (!ctx) return;
      const rect = boardEl.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      if (boardStaticLayerEl.width !== width || boardStaticLayerEl.height !== height) {
        boardStaticLayerEl.width = width;
        boardStaticLayerEl.height = height;
      }
      ctx.clearRect(0, 0, width, height);
      const stepX = width / BOARD_SIZE;
      const stepY = height / BOARD_SIZE;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i < BOARD_SIZE; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * stepX, 0);
        ctx.lineTo(i * stepX, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * stepY);
        ctx.lineTo(width, i * stepY);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(0, 212, 255, 0.06)";
      state.cells.forEach((cell) => {
        const { row, col } = cellNumberToCoord(cell.number);
        const x = (col - 1) * stepX;
        const y = (row - 1) * stepY;
        if ((cell.types || []).length > 1) {
          ctx.fillRect(x, y, stepX, stepY);
        }
      });
    }

    function invalidateCellCenterCache() {
      cellCentersValid = false;
    }

    function ensureCellCenters() {
      if (cellCentersValid) return;
      const boardRect = boardEl.getBoundingClientRect();
      for (let cellNumber = 1; cellNumber <= LAST_CELL; cellNumber += 1) {
        const cellEl = boardCellEls[cellNumber];
        if (!cellEl) continue;
        const cellRect = cellEl.getBoundingClientRect();
        cellCenters[cellNumber] = {
          x: cellRect.left - boardRect.left + cellRect.width / 2,
          y: cellRect.top - boardRect.top + cellRect.height / 2
        };
      }
      cellCentersValid = true;
    }

    function getCellType(cellNumber) {
      return getPrimaryCellType(getCellTypes(cellNumber));
    }

    function hideTileContextMenu() {
      shopOverlayEl.classList.remove("visible");
      tileContextMenuEl.dataset.cell = "";
      shopBuyerSelectEl.innerHTML = "";
      tileContextMode = "shop";
      lastContextMenuSignature = "";
    }

    function getContextModeConfigs() {
      return {
        shop: {
          cellType: "shop",
          title: t("context.shopTitle"),
          subtitle: t("context.shopSubtitle"),
          playerLabel: t("context.playerLabelShop"),
          sectionEl: shopContextSectionEl,
          refresh: () => {
            const buyer = renderContextPlayerSelect("shop", t("emptySelect.shop"));
            const canBuyHere = Boolean(buyer);
            shopItemsListEl.querySelectorAll("[data-shop-item-id]").forEach((el) => {
              el.classList.toggle("disabled", !canBuyHere || state.rolling);
            });
            renderShopPlayerInventory();
          }
        },
        fortuneTeller: {
          cellType: "fortuneTeller",
          title: `${getCellTypeLabel("fortuneTeller")} ${getCellTypeIcon("fortuneTeller")}`,
          subtitle: t("context.fortuneSubtitle"),
          playerLabel: t("context.playerLabelFortune"),
          sectionEl: fortuneContextSectionEl,
          refresh: () => {
            fortuneActionBtnEl.textContent = t("context.fortuneAction", { cost: SERVICE_COSTS.fortuneTeller });
            renderContextPlayerSelect("fortuneTeller", t("emptySelect.fortuneTeller"));
            renderFortunePlayerInfo();
          }
        },
        blackMarket: {
          cellType: "blackMarket",
          title: `${getCellTypeLabel("blackMarket")} ${getCellTypeIcon("blackMarket")}`,
          subtitle: t("context.blackMarketSubtitle"),
          playerLabel: t("context.playerLabelBlackMarket"),
          sectionEl: blackMarketContextSectionEl,
          refresh: () => {
            blackMarketActionBtnEl.textContent = t("context.blackMarketAction", { cost: SERVICE_COSTS.blackMarket });
            renderContextPlayerSelect("blackMarket", t("emptySelect.blackMarket"));
            renderBlackMarketPlayerInfo();
          }
        },
        altar: {
          cellType: "altar",
          title: `${getCellTypeLabel("altar")} ${getCellTypeIcon("altar")}`,
          subtitle: t("context.altarSubtitle"),
          playerLabel: t("context.playerLabelAltar"),
          sectionEl: altarContextSectionEl,
          refresh: () => {
            altarActionBtnEl.textContent = t("context.altarAction", { cost: SERVICE_COSTS.altar });
            renderContextPlayerSelect("altar", t("emptySelect.altar"));
            renderAltarPlayerInfo();
          }
        }
      };
    }

    function setContextSectionVisible(targetSectionEl) {
      [shopContextSectionEl, fortuneContextSectionEl, blackMarketContextSectionEl, altarContextSectionEl].forEach((sectionEl) => {
        sectionEl.classList.toggle("visible", sectionEl === targetSectionEl);
      });
    }

    function getCurrentContextMenuSignature() {
      if (!shopOverlayEl.classList.contains("visible")) return "";
      const cellNumber = Number(tileContextMenuEl.dataset.cell || "0");
      const buyerId = String(shopBuyerSelectEl.value || "");
      const player = state.players.find((entry) => entry.id === buyerId) || null;
      if (!player) {
        return `${tileContextMode}|${cellNumber}|${buyerId}|none|${state.rolling ? 1 : 0}`;
      }
      return [
        tileContextMode,
        cellNumber,
        buyerId,
        player.position,
        player.hp,
        player.maxHp,
        player.gold,
        player.boots,
        player.shields,
        player.luckCharm,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal,
        player.bootsActive ? 1 : 0,
        player.fortuneQuest ? 1 : 0,
        state.rolling ? 1 : 0
      ].join("|");
    }

    function refreshCurrentContextMenu(force = false) {
      const perf = beginPerf("render.contextMenu");
      try {
        if (!shopOverlayEl.classList.contains("visible")) return;
        const beforeSignature = getCurrentContextMenuSignature();
        if (!force && beforeSignature === lastContextMenuSignature) return;
        const config = getContextModeConfigs()[tileContextMode];
        if (!config) return;
        config.refresh();
        lastContextMenuSignature = getCurrentContextMenuSignature();
      } finally {
        endPerf(perf);
      }
    }

    function openContextMenu(mode, cellNumber) {
      const config = getContextModeConfigs()[mode];
      if (!config) return;
      ensureContextInitialized(mode);
      closeInventoryOverlay();
      tileContextMode = mode;
      tileContextMenuEl.dataset.cell = String(cellNumber);
      tileContextTitleEl.textContent = config.title;
      tileContextSubtitleEl.textContent = config.subtitle;
      tileContextPlayerLabelEl.textContent = config.playerLabel;
      setContextSectionVisible(config.sectionEl);
      shopOverlayEl.classList.add("visible");
      lastContextMenuSignature = "";
      refreshCurrentContextMenu(true);
    }

    function handleBoardContextMenu(event) {
      const cellEl = event.target.closest(".cell");
      if (!cellEl) {
        hideTileContextMenu();
        return;
      }

      const cellNumber = Number(cellEl.dataset.cell || "0");
      if (!cellNumber) {
        hideTileContextMenu();
        return;
      }

      const contextModes = getContextModeConfigs();
      const targetMode = Object.keys(contextModes).find((mode) => hasCellType(cellNumber, contextModes[mode].cellType)) || "";
      if (!targetMode) {
        hideTileContextMenu();
        return;
      }

      event.preventDefault();
      state.selectedCell = cellNumber;
      renderSelectedTile();
      openContextMenu(targetMode, cellNumber);
    }

    function getCellTypeLabel(type) {
      const themedLabels = TEXTS.legend || {};
      const fallback = (CELL_TYPE_META[type] || CELL_TYPE_META.normal || {}).label;
      const label = themedLabels[type] || fallback;
      return typeof label === "object" ? (label[currentLanguage] || label[DEFAULT_LANGUAGE] || label.ru || label.en || "") : label || "";
    }

    function getCellTypeIcon(type) {
      return (CELL_TYPE_META[type] || CELL_TYPE_META.normal || {}).icon || "•";
    }

    function selectedPlayer() {
      return state.players.find((p) => p.id === state.selectedPlayerId) || null;
    }

    function handlePlayerFinished(player) {
      if (!player || isPlayerFinished(player)) return;
      const finishOrder = getFinishedPlayers().length + 1;
      player.finished = true;
      player.finishOrder = finishOrder;
      player.fortuneQuest = null;
      player.bootsActive = false;
      logEvent(`${player.name} reaches tile 100 ${getCellTypeIcon("finish")} and earns rank "${getFinishRankLabel(finishOrder)}".`);

      if (getFinishedPlayers().length >= FINISHERS_TO_END_GAME) {
        state.gameEnded = true;
        logEvent(`The ritual is over: Sanctuary gathered ${FINISHERS_TO_END_GAME} chosen ones.`);
        openVictoryOverlay();
      }
    }

    function updatePlayerInState(playerId, playerSnapshot) {
      const index = state.players.findIndex((entry) => entry.id === playerId);
      if (index < 0) return false;
      const previous = state.players[index];
      state.players[index] = playerSnapshot;
      markPlayerDirty(playerId, {
        row: true,
        stats: true,
        context: true,
        inventoryOverlay: true,
        posFrom: previous?.position ?? null,
        posTo: playerSnapshot?.position ?? null
      });
      return true;
    }

    async function handleFortuneTeller(player) {
      const fortuneCost = SERVICE_COSTS.fortuneTeller;
      const quest = createFortuneQuest(player);
      const result = FortuneActions.purchaseFortuneQuestState({
        player,
        cost: fortuneCost,
        quest
      });
      if (!result.ok && result.reason === "not_enough_gold") {
        logEvent(`${player.name} approaches the Oracle ${getCellTypeIcon("fortuneTeller")}, but lacks ${formatGold(fortuneCost)} for the ritual.`);
        return false;
      }
      if (!result.ok && result.reason === "already_has_quest") {
        logEvent(`${player.name} already has an active prophecy: ${getFortuneQuestConditionText(player.fortuneQuest)}`);
        return false;
      }
      if (!result.ok) {
        return false;
      }
      updatePlayerInState(player.id, result.player);
      animateContextGoldDelta(-fortuneCost);
      logEvent(`${player.name} pays ${formatGold(fortuneCost)} to the Oracle ${getCellTypeIcon("fortuneTeller")} and receives the sign: ${quest.omenLabel}.`);
      logEvent(`Oracle wording for ${player.name}: ${getFortuneQuestConditionText(quest)}`);
      return false;
    }

    function applyBlackMarketAction(player) {
      const fee = SERVICE_COSTS.blackMarket;
      const result = FortuneActions.applyBlackMarketState({
        player,
        fee,
        roll: Math.random(),
        profitChanceMax: CHANCES.blackMarket.profitMax,
        lossChanceMax: CHANCES.blackMarket.lossMax,
        profitGold: REWARDS.blackMarketProfitGold,
        maxLossGold: REWARDS.blackMarketMaxLossGold
      });
      if (!result.ok && result.reason === "not_enough_gold") {
        logEvent(`${player.name} enters the Shadow market ${getCellTypeIcon("blackMarket")}, but lacks ${formatGold(fee)} for the deal.`);
        return;
      }
      if (!result.ok) return;

      updatePlayerInState(player.id, result.player);
      animateContextGoldDelta(-fee);
      if (result.outcome === "profit") {
        animateContextGoldDelta(REWARDS.blackMarketProfitGold);
        logEvent(`${player.name} pays ${formatGold(fee)} at the Shadow market ${getCellTypeIcon("blackMarket")} and lands a profitable deal: +${formatGold(REWARDS.blackMarketProfitGold)}.`);
      } else if (result.outcome === "loss") {
        animateContextGoldDelta(-result.loss);
        logEvent(`${player.name} pays ${formatGold(fee)} at the Shadow market ${getCellTypeIcon("blackMarket")}, but gets tricked and loses another ${formatGold(result.loss)}.`);
      } else if (result.outcome === "shield") {
        logEvent(`${player.name} pays ${formatGold(fee)} at the Shadow market ${getCellTypeIcon("blackMarket")} and gets a rare trophy: +1 Protection Seal.`);
      }
    }

    function applyAltarAction(player) {
      const tribute = SERVICE_COSTS.altar;
      const result = FortuneActions.applyAltarState({
        player,
        tribute,
        blessingRoll: Math.random(),
        shieldChanceMax: CHANCES.altar.shieldMax,
        maxPenaltyGold: REWARDS.altarNoTributeMaxPenaltyGold
      });
      if (!result.ok) return;

      updatePlayerInState(player.id, result.player);
      animateContextGoldDelta(result.delta);

      if (result.outcome === "shield") {
        logEvent(`${player.name} offers ${formatGold(tribute)} at the Altar ${getCellTypeIcon("altar")} and receives a blessing: +1 Protection Seal.`);
        return;
      }
      if (result.outcome === "boots") {
        logEvent(`${player.name} offers ${formatGold(tribute)} at the Altar ${getCellTypeIcon("altar")} and receives the gift of the path: +1 Ritual Greaves.`);
        return;
      }
      logEvent(`${player.name} tries to address the Altar ${getCellTypeIcon("altar")} without tribute and loses ${formatGold(result.penalty)}.`);
    }

    function closeInventoryOverlay() {
      inventoryOverlayEl.classList.remove("visible");
      delete inventoryOverlayEl.dataset.playerId;
      lastInventorySignature = "";
    }

    function closeVictoryOverlay() {
      victoryOverlayEl.classList.remove("visible");
    }

    function renderVictoryOverlay() {
      const winners = getFinishedPlayers().slice(0, FINISHERS_TO_END_GAME);
      const listHtml = winners.map((player) => `
        <div class="victory-entry">
          <span class="victory-entry-name">${player.name}</span>
          <span class="victory-entry-rank">${getFinishRankLabel(player.finishOrder || 1)}</span>
        </div>
      `).join("");
      victoryBodyEl.innerHTML = `
        <div class="victory-copy">
          ${t("ui.victorySummary", { count: winners.length, total: FINISHERS_TO_END_GAME })}
        </div>
        <div class="victory-list">${listHtml}</div>
      `;
    }

    function openVictoryOverlay() {
      renderVictoryOverlay();
      victoryOverlayEl.classList.add("visible");
    }

    function openInventoryOverlay(playerId) {
      inventoryOverlayEl.dataset.playerId = playerId;
      renderInventoryOverlay();
      inventoryOverlayEl.classList.add("visible");
    }

    function renderInventoryOverlay() {
      const playerId = inventoryOverlayEl.dataset.playerId || "";
      const player = state.players.find((entry) => entry.id === playerId);
      if (!player) {
        closeInventoryOverlay();
        return;
      }
      const signature = [
        player.id,
        state.rolling ? 1 : 0,
        player.position,
        player.hp,
        player.maxHp,
        player.gold,
        player.boots,
        player.shields,
        player.luckCharm,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal,
        player.bootsActive ? 1 : 0,
        player.fortuneQuest ? JSON.stringify(player.fortuneQuest) : ""
      ].join("|");
      if (signature === lastInventorySignature) return;
      const { slotsHtml } = buildInventorySlotsHtml(player, { includeUseActions: true });
      const effectsHtml = buildEffectsPanelHtml(player);

      inventoryNameEl.textContent = player.name || t("ui.inventoryName");
      if (inventoryHpEl) inventoryHpEl.textContent = formatHp(player.hp);
      inventoryGoldEl.textContent = formatGold(player.gold);
      inventoryBodyEl.innerHTML = `
        <div class="inventory-slots">${slotsHtml}</div>
        ${effectsHtml}
      `;
      lastInventorySignature = signature;
    }

    async function useInventoryItem(itemId, explicitPlayerId = "") {
      const playerId = explicitPlayerId || inventoryOverlayEl.dataset.playerId || state.selectedPlayerId || "";
      const player = state.players.find((entry) => entry.id === playerId);
      if (!player || state.rolling || state.gameEnded) return;

      if (itemId === "boots") {
        if (player.boots < 1) return;
        if (player.bootsActive) {
        logEvent(`${player.name}: Ritual greaves are already primed for the next roll.`);
          return;
        }
        pushHistory("Use item: Ritual greaves");
        player.boots -= 1;
        player.bootsActive = true;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        logEvent(`${player.name} activates Ritual greaves. The next roll gets +2.`);
        queueRenderFromDirty({ autosave: true });
        return;
      }

      if (itemId === "luckCharm") {
        if (player.luckCharm < 1) return;
        pushHistory("Use item: Charm of favor");
        player.luckCharm -= 1;
        player.gold += REWARDS.luckCharmGold;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        logEvent(`${player.name} opens the Charm of favor and receives +${formatGold(REWARDS.luckCharmGold)}.`);
        queueRenderFromDirty({ autosave: true });
        return;
      }

      if (itemId === "trapKit") {
        if (player.trapKit < 1) return;
        const targetCell = clamp(Number(state.selectedCell) || 1, 1, LAST_CELL);
        if (targetCell === 1 || targetCell === LAST_CELL) {
          logEvent(`${player.name}: cannot place a trap on start or finish.`);
          return;
        }

        const target = state.cells[targetCell - 1];
        if (!target) return;
        const targetTypes = getCellTypes(targetCell);
        if (targetTypes.includes("trap")) {
          logEvent(`${player.name}: tile ${targetCell} already has a trap.`);
          return;
        }

        pushHistory("Use item: Cursed seal kit");
        player.trapKit -= 1;
        target.types = normalizeCellTypes([...targetTypes, "trap"], targetCell);
        createBoard();
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        logEvent(`${player.name} places a cursed seal on tile ${targetCell}.`);
        queueRenderFromDirty({ autosave: true, selectedTile: true, tokensFull: true });
        return;
      }

      if (itemId === "alchemyCrystal") {
        if (player.alchemyCrystal < 1) return;
        pushHistory("Use item: Blood shard");
        player.alchemyCrystal -= 1;
        player.gold += REWARDS.alchemyCrystalUseGold;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        logEvent(`${player.name} shatters a Blood shard and receives +${formatGold(REWARDS.alchemyCrystalUseGold)}.`);
        queueRenderFromDirty({ autosave: true });
        return;
      }

      if (itemId === "rerollStone") {
        if (player.rerollStone < 1) return;
        pushHistory("Use item: Second sign stone");
        player.rerollStone -= 1;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        state.rolling = true;
        queueRender({
          players: true,
          stats: true,
          selectedTile: true,
          refreshInventoryOverlay: true,
          refreshContextMenu: true,
          tokensFull: true
        });

        const reroll = Math.floor(Math.random() * 6) + 1;
        await animateDiceVisual(reroll);
        const from = player.position;
        const to = clamp(player.position + reroll, 1, LAST_CELL);
        logEvent(`${player.name} awakens the Second sign stone: ${reroll}. Move: ${from} -> ${to}.`);
        await movePlayerAnimated(player, to);
        await resolveCellEffects(player);

        state.rolling = false;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        queueRenderFromDirty({ autosave: true, selectedTile: true });
      }
    }

    function renderPlayerSelect() {
      const previous = state.selectedPlayerId;
      activePlayerSelectEl.innerHTML = `<option value="">${t("ui.activePlayerNone")}</option>`;

      state.players.forEach((player) => {
        const option = document.createElement("option");
        option.value = player.id;
        option.textContent = player.name;
        activePlayerSelectEl.appendChild(option);
      });

      if (state.players.some((p) => p.id === previous)) {
        activePlayerSelectEl.value = previous;
      } else {
        state.selectedPlayerId = getActivePlayers()[0]?.id || state.players[0]?.id || "";
        activePlayerSelectEl.value = state.selectedPlayerId;
      }
    }

    function renderPlayersMenu() {
      if (state.players.length === 0) {
        playersListEl.innerHTML = `<div class="players-empty">${t("ui.playersEmpty")}</div>`;
        return;
      }
      if (playersListEl.querySelector(".players-empty")) {
        playersListEl.innerHTML = "";
      }

      const existingRows = new Map();
      playersListEl.querySelectorAll(".players-list-row[data-player-row-id]").forEach((rowEl) => {
        existingRows.set(rowEl.dataset.playerRowId, rowEl);
      });
      const fragment = document.createDocumentFragment();
      const activeTurnPlayerId = getActivePlayers()[state.turnIndex]?.id || "";

      state.players.forEach((player, index) => {
        let rowEl = existingRows.get(player.id);
        if (!rowEl) {
          rowEl = document.createElement("div");
          rowEl.className = "players-list-row";
          rowEl.dataset.playerRowId = player.id;
          const removeTitle = t("ui.removePlayer");
          rowEl.innerHTML = `
            <button class="players-list-item" data-player-id="${player.id}"></button>
            <button class="players-remove" data-remove-player-id="${player.id}" title="${removeTitle}" aria-label="${removeTitle}">×</button>
          `;
        }

        const selectBtnEl = rowEl.querySelector("[data-player-id]");
        const removeBtnEl = rowEl.querySelector("[data-remove-player-id]");
        const classes = [
          "players-list-item",
          player.id === activeTurnPlayerId ? "active-turn" : "",
          player.id === state.selectedPlayerId ? "selected-player" : ""
        ].filter(Boolean).join(" ");

        selectBtnEl.className = classes;
        selectBtnEl.dataset.playerId = player.id;
        const avatarHtml = player.avatar
          ? `<img class="player-avatar" src="${player.avatar}" alt="avatar" onerror="this.onerror=null;this.src='${DEFAULT_AVATAR}'">`
          : "";
        const statusText = isPlayerFinished(player)
          ? t("ui.finishStatus", { order: player.finishOrder || "?" })
          : "";
        const tileLabel = t("ui.tile");
        selectBtnEl.innerHTML = `${avatarHtml}<span class="player-row-text">${index + 1}. ${player.name} (${tileLabel} ${player.position}, <span class="player-hp">${formatHp(player.hp)}</span>, ${formatGold(player.gold)}${statusText})</span>`;
        removeBtnEl.dataset.removePlayerId = player.id;

        fragment.appendChild(rowEl);
        existingRows.delete(player.id);
      });

      existingRows.forEach((rowEl) => rowEl.remove());
      playersListEl.appendChild(fragment);
    }

    function renderTurnManager() {
      const activePlayers = getActivePlayers();
      if (state.players.length === 0) {
        turnInfoEl.textContent = t("ui.noPlayers");
        turnListEl.textContent = "";
        if (nextTurnBtnEl) nextTurnBtnEl.disabled = true;
        undoBtnEl.disabled = state.history.length === 0;
        return;
      }

      syncTurnIndexToSelected();
      if (state.gameEnded) {
        turnInfoEl.textContent = t("ui.turnEnded", { count: getFinishedPlayers().length });
      } else if (activePlayers.length > 0) {
        turnInfoEl.textContent = t("ui.turnCurrent", { name: activePlayers[state.turnIndex]?.name || activePlayers[0].name });
      } else {
        turnInfoEl.textContent = t("ui.turnNone");
      }
      turnListEl.textContent = activePlayers.length ? t("ui.turnCount", { count: activePlayers.length }) : t("ui.turnAllFinished");
      if (nextTurnBtnEl) nextTurnBtnEl.disabled = state.rolling || state.gameEnded || activePlayers.length < 2;
      undoBtnEl.disabled = state.history.length === 0;
    }

    function renderSelectedTile() {
      const selectedCellNumber = clamp(state.selectedCell || 1, 1, LAST_CELL);
      state.selectedCell = selectedCellNumber;
      const types = getCellTypes(selectedCellNumber);
      const info = types.length
        ? types.map((type) => `${getCellTypeIcon(type)} ${getCellTypeLabel(type)}`).join(" + ")
        : t("ui.selectedTileDefault");
      tileInfoEl.textContent = t("ui.selectedTile", { cell: selectedCellNumber, info });
      moveToTileBtnEl.disabled = !selectedPlayer() || state.rolling || state.gameEnded || isPlayerFinished(selectedPlayer());
      if (lastRenderedSelectedCell !== selectedCellNumber) {
        const prevEl = boardCellEls[lastRenderedSelectedCell];
        const nextEl = boardCellEls[selectedCellNumber];
        if (prevEl) prevEl.classList.remove("selected");
        if (nextEl) nextEl.classList.add("selected");
        lastRenderedSelectedCell = selectedCellNumber;
      }
    }

    function getFortuneQuestConditionText(quest) {
      if (!quest) return "";
      if (quest.type === "reachCell") {
        return t("quest.reachCellHint", { stepHint: quest.stepHint || "several" });
      }
      if (quest.type === "itemOnCellType") {
        return t("quest.itemOnCellType", { item: quest.requiredItemLabel, cellTypeLabel: quest.requiredCellTypeLabel });
      }
      if (quest.type === "goldOnCellType") {
        return t("quest.goldOnCellType", { minGold: quest.minGold, cellTypeLabel: quest.requiredCellTypeLabel });
      }
      return quest.description || "";
    }

    function getFortuneQuestDebugConditionText(quest) {
      if (!quest) return "";
      if (quest.type === "reachCell") return t("quest.reachCellDebug", { targetCell: quest.targetCell });
      if (quest.type === "itemOnCellType") {
        return t("quest.itemOnCellTypeDebug", { item: quest.requiredItemLabel, cellTypeLabel: quest.requiredCellTypeLabel });
      }
      if (quest.type === "goldOnCellType") {
        return t("quest.goldOnCellTypeDebug", { minGold: quest.minGold, cellTypeLabel: quest.requiredCellTypeLabel });
      }
      return quest.description || "";
    }

    function buildEffectsPanelHtml(player) {
      const effects = [];
      if (player.fortuneQuest) {
        const toneClass = player.fortuneQuest.omenType === "bad" ? "bad-event" : "good-event";
        const toneBadgeClass = player.fortuneQuest.omenType === "bad" ? "bad" : "good";
        const toneLabel = player.fortuneQuest.omenLabel || t("ui.eventLabel");
        effects.push(`
          <div class="effect-item ${toneClass}">
            <div class="effect-name">${t("ui.prophecyTitle")} ${getCellTypeIcon("fortuneTeller")}</div>
            <div class="effect-tone ${toneBadgeClass}">${toneLabel}</div>
            <div class="effect-desc"><strong>${t("ui.prophecyActive")}</strong> ${getFortuneQuestConditionText(player.fortuneQuest)}</div>
            <div class="effect-desc"><strong>${t("ui.prophecyHint")}</strong> ${getFortuneQuestDebugConditionText(player.fortuneQuest)}</div>
          </div>
        `);
      }
      if (player.bootsActive) {
        effects.push(`
          <div class="effect-item">
            <div class="effect-name">${t("ui.bootsPrimed")} ${SHOP_ITEM_META.boots.icon}</div>
            <div class="effect-desc"><strong>${t("ui.condition")}</strong> ${t("ui.nextRollCondition")}</div>
          </div>
        `);
      }
      const body = effects.length ? effects.join("") : `<div class="effect-desc">${t("ui.activeEffectsNone")}</div>`;
      return `
        <div class="effects-panel">
          <div class="effects-title">${t("ui.activeEffectsTitle")}</div>
          ${body}
        </div>
      `;
    }

    function renderStats() {
      const player = selectedPlayer();
      if (!player) {
        activePlayerCardEl.style.display = "none";
        lastStatsSignature = "";
        return;
      }
      activePlayerCardEl.style.display = "block";

      const signature = [
        player.id,
        player.name,
        player.position,
        player.hp,
        player.maxHp,
        player.gold,
        player.boots,
        player.shields,
        player.luckCharm,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal,
        player.bootsActive ? 1 : 0,
        player.fortuneQuest ? JSON.stringify(player.fortuneQuest) : "",
        state.rolling ? 1 : 0
      ].join("|");
      if (signature === lastStatsSignature) {
        rollBtnEl.disabled = state.rolling || state.gameEnded || isPlayerFinished(player);
        return;
      }
      const { slotsHtml } = buildInventorySlotsHtml(player, { includeUseActions: true });
      const effectsHtml = buildEffectsPanelHtml(player);
      playerStatsEl.innerHTML = `
        <div class="player-header">
          <span class="player-name">${player.name}</span>
          <span class="player-meta">
            <span class="player-gold">${formatHp(player.hp)}</span>
            <span class="player-gold">${formatGold(player.gold)}</span>
          </span>
        </div>
        <div><strong>${t("ui.inventoryTitle")}:</strong></div>
        <div class="inventory-slots">${slotsHtml}</div>
        
        ${effectsHtml}
      `;

      rollBtnEl.disabled = state.rolling || state.gameEnded || isPlayerFinished(player);
      lastStatsSignature = signature;
    }

    function ensureToken(player) {
      let token = tokenElsById.get(player.id) || null;
      if (!token) {
        token = document.createElement("div");
        token.className = "token";
        token.dataset.token = player.id;
        token.innerHTML = `<img class="token-avatar" src="${player.avatar || DEFAULT_AVATAR}" alt="avatar"><span class="token-label">${player.name.charAt(0).toUpperCase()}</span>`;
        token.addEventListener("click", (event) => {
          event.stopPropagation();
          if (state.rolling) return;
          openInventoryOverlay(player.id);
        });
        tokensLayerEl.appendChild(token);
        tokenElsById.set(player.id, token);
      }
      return token;
    }

    function getCellCenter(cellNumber) {
      ensureCellCenters();
      return cellCenters[cellNumber] || { x: 0, y: 0 };
    }

    function applyTokenTransform(token, isActive) {
      const tx = Number(token.dataset.tx || "0");
      const ty = Number(token.dataset.ty || "0");
      const scale = isActive ? 1.08 : 1;
      token.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    }

    function getBoardCellSizePx() {
      const rect = boardEl.getBoundingClientRect();
      if (!rect.width || !rect.height) return 0;
      return Math.min(rect.width, rect.height) / BOARD_SIZE;
    }

    function buildTokenOffsetsForStack(count, tokenSizePx, cellSizePx) {
      if (count <= 0) return [];
      if (count === 1) return [{ x: 0, y: 0 }];

      const tokenSize = Math.max(16, Number(tokenSizePx) || 24);
      const cellSize = Math.max(tokenSize + 4, Number(cellSizePx) || tokenSize + 8);
      const maxRadius = Math.max(3, (cellSize - tokenSize) / 2 - 1);
      const ringRadius = Math.min(maxRadius, Math.max(4, tokenSize * 0.42));

      if (count === 2) {
        return [
          { x: -ringRadius, y: 0 },
          { x: ringRadius, y: 0 }
        ];
      }
      if (count === 3) {
        return [
          { x: 0, y: -ringRadius },
          { x: -ringRadius * 0.9, y: ringRadius * 0.75 },
          { x: ringRadius * 0.9, y: ringRadius * 0.75 }
        ];
      }
      if (count === 4) {
        return [
          { x: -ringRadius, y: -ringRadius },
          { x: ringRadius, y: -ringRadius },
          { x: -ringRadius, y: ringRadius },
          { x: ringRadius, y: ringRadius }
        ];
      }
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const maxSpanX = Math.max(0, maxRadius * 2);
      const maxSpanY = Math.max(0, maxRadius * 2);
      const stepX = cols > 1 ? Math.min(tokenSize * 0.78, maxSpanX / (cols - 1)) : 0;
      const stepY = rows > 1 ? Math.min(tokenSize * 0.78, maxSpanY / (rows - 1)) : 0;
      const startX = -((cols - 1) * stepX) / 2;
      const startY = -((rows - 1) * stepY) / 2;
      const offsets = [];

      for (let i = 0; i < count; i += 1) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        offsets.push({
          x: startX + col * stepX,
          y: startY + row * stepY
        });
      }

      return offsets;
    }

    function renderTokens(options = {}) {
      const perf = beginPerf("render.tokens");
      const forceFull = Boolean(options.forceFull);
      const positionSet = options.positions ? new Set(options.positions) : null;
      const highlightSet = options.activeIds ? new Set(options.activeIds) : null;
      const aliveIds = new Set(state.players.map((player) => player.id));

      tokenElsById.forEach((tokenEl, playerId) => {
        if (aliveIds.has(playerId)) return;
        tokenEl.remove();
        tokenElsById.delete(playerId);
      });

      const currentActiveId = state.selectedPlayerId || "";
      if (!forceFull && !positionSet && highlightSet) {
        state.players.forEach((player) => {
          if (highlightSet.has(player.id)) ensureToken(player);
        });
        if (lastActiveTokenId && lastActiveTokenId !== currentActiveId) {
          const prevActiveToken = tokenElsById.get(lastActiveTokenId);
          if (prevActiveToken) {
            prevActiveToken.classList.remove("active");
            applyTokenTransform(prevActiveToken, false);
          }
        }
        if (currentActiveId) {
          const currentToken = tokenElsById.get(currentActiveId);
          if (currentToken) {
            currentToken.classList.add("active");
            applyTokenTransform(currentToken, true);
          }
        }
        lastActiveTokenId = currentActiveId;
        endPerf(perf);
        return;
      }

      const groups = new Map();
      state.players.forEach((player) => {
        const key = player.position;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(player);
      });

      const cellSizePx = getBoardCellSizePx();
      const stackOffsetsByCell = new Map();
      groups.forEach((stack, position) => {
        const sampleToken = ensureToken(stack[0]);
        const tokenSizePx = sampleToken.offsetWidth || 24;
        stackOffsetsByCell.set(position, buildTokenOffsetsForStack(stack.length, tokenSizePx, cellSizePx));
      });

      state.players.forEach((player) => {
        if (!forceFull && positionSet && !positionSet.has(player.position)) return;
        const token = ensureToken(player);
        const stack = groups.get(player.position) || [];
        const stackIndex = stack.findIndex((p) => p.id === player.id);
        const offsets = stackOffsetsByCell.get(player.position) || [];
        const offset = offsets[stackIndex] || { x: 0, y: 0 };
        const center = getCellCenter(player.position);
        const tokenSizePx = token.offsetWidth || 24;
        const tx = center.x - tokenSizePx / 2 + offset.x;
        const ty = center.y - tokenSizePx / 2 + offset.y;
        token.dataset.tx = String(tx);
        token.dataset.ty = String(ty);
        if (forceFull || !highlightSet || highlightSet.has(player.id)) {
          const isActive = player.id === state.selectedPlayerId;
          token.classList.toggle("active", isActive);
          token.style.zIndex = isActive ? "50" : String(1 + stackIndex);
          applyTokenTransform(token, isActive);
        }
        // Ensure avatar image is up to date
        const img = token.querySelector && token.querySelector('img.token-avatar');
        if (img) {
          const src = player.avatar || DEFAULT_AVATAR;
          if (img.src !== src) img.src = src;
          img.onerror = function () { this.onerror = null; this.src = DEFAULT_AVATAR; };
        }
      });

      if (lastActiveTokenId && lastActiveTokenId !== currentActiveId) {
        const prevActiveToken = tokenElsById.get(lastActiveTokenId);
        if (prevActiveToken) {
          prevActiveToken.classList.remove("active");
          applyTokenTransform(prevActiveToken, false);
        }
      }
      if (currentActiveId) {
        const currentToken = tokenElsById.get(currentActiveId);
        if (currentToken) {
          currentToken.classList.add("active");
          applyTokenTransform(currentToken, true);
        }
      }
      lastActiveTokenId = currentActiveId;
      endPerf(perf);
    }

    const Render = {
      playerSelect: renderPlayerSelect,
      playersMenu: renderPlayersMenu,
      playersOnly: renderPlayersOnly,
      stats: renderStats,
      statsOnly: renderStatsOnly,
      turnManager: renderTurnManager,
      selectedTile: renderSelectedTile,
      tokens: renderTokens,
      contextMenu: refreshCurrentContextMenu,
      full: () => fullRender()
    };

    function fullRender(stateChanged = true) {
      state.players.forEach((player) => {
        tryResolveFortuneQuest(player);
      });
      queueRender({
        players: true,
        stats: true,
        selectedTile: true,
        refreshInventoryOverlay: true,
        refreshContextMenu: true,
        tokensFull: true
      }, { autosave: stateChanged });
    }

    async function fetchTwitchAvatar(username) {
      if (!username) return "";
      try {
        const resp = await fetch(`https://decapi.me/twitch/avatar/${encodeURIComponent(username)}`);
        const text = await resp.text();
        if (!text) return "";
        if (text.includes("User not found") || text.includes("Invalid")) return "";
        return text;
      } catch (err) {
        console.debug("avatar fetch failed", err);
        return "";
      }
    }

    async function addPlayer(name) {
      const id = `p_${Date.now()}_${Math.random().toString(16).slice(2, 7)}`;
      const username = String(name || "").trim().toLowerCase();
      let avatar = "";
      if (username.length >= 4) {
        avatar = await fetchTwitchAvatar(username);
      }
      const result = PlayerActions.addPlayerState({
        players: state.players,
        selectedPlayerId: state.selectedPlayerId,
        turnIndex: state.turnIndex,
        name,
        id,
        avatar
      });
      if (!result.ok) {
        if (result.reason === "duplicate") {
          logEvent(`A player named "${result.cleanName}" already exists. Choose another name.`);
        }
        return;
      }

      pushHistory("Add player");
      dispatch({
        type: "SET_PLAYERS_AND_TURN",
        players: result.players,
        selectedPlayerId: result.selectedPlayerId,
        turnIndex: result.turnIndex
      });
      logEvent(`${result.player.name} enters the game.`);
      playerNameEl.value = "";
      queueRender({
        players: true,
        stats: true,
        selectedTile: true,
        refreshInventoryOverlay: true,
        refreshContextMenu: true,
        tokensFull: true
      }, { autosave: true });
    }

    function removeSelectedPlayer() {
      if (state.rolling) {
        logEvent("Removal is unavailable while a player is moving.");
        return;
      }

      const player = selectedPlayer();
      if (!player) return;
      removePlayerById(player.id);
    }

    function removePlayerById(playerId) {
      if (state.rolling) {
        logEvent("Removal is unavailable while a player is moving.");
        return;
      }
      const snapshot = PlayerActions.removePlayerState({
        players: state.players,
        selectedPlayerId: state.selectedPlayerId,
        turnIndex: state.turnIndex,
        playerId
      });
      if (!snapshot.ok) return;

      pushHistory(`Remove player: ${snapshot.removedPlayer.name}`);
      dispatch({
        type: "SET_PLAYERS_AND_TURN",
        players: snapshot.players,
        selectedPlayerId: snapshot.selectedPlayerId,
        turnIndex: snapshot.turnIndex
      });
      logEvent(`Player ${snapshot.removedPlayer.name} removed from the game.`);
      queueRender({
        players: true,
        stats: true,
        selectedTile: true,
        refreshInventoryOverlay: true,
        refreshContextMenu: true,
        tokensFull: true
      }, { autosave: true });
    }

    const Actions = {
      addPlayerByName(name) {
        addPlayer(name);
      },
      removePlayer(playerId) {
        removePlayerById(playerId);
      },
      selectPlayer(playerId) {
        const selected = PlayerActions.selectPlayerState({
          players: state.players,
          selectedPlayerId: state.selectedPlayerId,
          turnIndex: state.turnIndex,
          playerId
        });
        if (!selected.ok) return;
        const prevSelectedId = state.selectedPlayerId;
        dispatch({
          type: "PATCH",
          patch: {
            selectedPlayerId: selected.selectedPlayerId,
            turnIndex: selected.turnIndex
          }
        });
        queueRender({
          players: true,
          stats: true,
          selectedTile: true,
          refreshInventoryOverlay: true,
          refreshContextMenu: true
        }, {
          autosave: true,
          tokenActiveIds: [prevSelectedId, state.selectedPlayerId]
        });
      }
    };

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function movePlayerAnimated(player, targetCell) {
      const start = player.position;
      if (start === targetCell) return;
      const direction = targetCell > start ? 1 : -1;
      for (let pos = start + direction; direction > 0 ? pos <= targetCell : pos >= targetCell; pos += direction) {
        const previousPos = player.position;
        player.position = pos;
        queueRender({}, {
          tokenPositions: [previousPos, pos],
          tokenActiveIds: [player.id]
        });
        await sleep(170);
      }
    }

    function eliminatePlayerFromGame(player, reasonText) {
      markPlayerDirty(player.id, {
        row: true,
        stats: true,
        context: true,
        inventoryOverlay: true,
        posFrom: player.position,
        posTo: null
      });
      const snapshot = PlayerActions.removePlayerState({
        players: state.players,
        selectedPlayerId: state.selectedPlayerId,
        turnIndex: state.turnIndex,
        playerId: player.id
      });
      if (!snapshot.ok) return false;

      dispatch({
        type: "SET_PLAYERS_AND_TURN",
        players: snapshot.players,
        selectedPlayerId: snapshot.selectedPlayerId,
        turnIndex: snapshot.turnIndex
      });

      if (inventoryOverlayEl.dataset.playerId === player.id) closeInventoryOverlay();
      hideTileContextMenu();
      logEvent(`${player.name} drops out of the match: ${reasonText}`);
      if (snapshot.players.length === 0) {
        logEvent("All players are out. The match is over.");
      }
      return true;
    }

    async function resolveCellEffects(player) {
      for (let i = 0; i < 6; i++) {
        const types = getCellTypes(player.position);
        const balance = getCurrentBalanceProfile();
        let moved = false;

        if (types.includes("trap")) {
          if (player.shields > 0) {
            player.shields -= 1;
            logEvent(formatShieldTrapLogMessage(player.name));
          } else {
            const trapDamage = Math.max(1, Number(balance.trapDamage) || 25);
            const hpBefore = player.hp;
            player.hp = clamp(player.hp - trapDamage, 0, player.maxHp);
            logEvent(formatTrapLogMessage(player.name, balance.key, trapDamage, hpBefore, player.hp));
            if (player.hp <= 0) {
              eliminatePlayerFromGame(player, "health dropped to 0");
              return { eliminated: true };
            }
          }
        }

        if (moved) continue;

        if (types.includes("boost")) {
          const from = player.position;
          const to = clamp(player.position + balance.boostForward, 1, LAST_CELL);
          logEvent(`${player.name} touches the Power seal ${getCellTypeIcon("boost")} (${getPhaseLabel(balance.key, "en")}) and surges from ${from} -> ${to}.`);
          await movePlayerAnimated(player, to);
          continue;
        }

        if (types.includes("shop")) {
          logEvent(`${player.name} enters the Relic shop ${getCellTypeIcon("shop")}. Rewards are handed out manually by the Keeper.`);
        }
        if (types.includes("blackMarket")) {
          logEvent(`${player.name} steps onto the Shadow market ${getCellTypeIcon("blackMarket")}. Right-click the tile to open the ritual menu.`);
        }
        if (types.includes("altar")) {
          logEvent(`${player.name} approaches the Blood altar ${getCellTypeIcon("altar")}. Right-click the tile to open the ritual menu.`);
        }
        if (types.includes("fortuneTeller")) {
          logEvent(`${player.name} enters the Oracle circle ${getCellTypeIcon("fortuneTeller")}. Right-click the Oracle tile to open the ritual menu.`);
        }
        if (types.includes("finish")) {
          handlePlayerFinished(player);
        }
        break;
      }
      return { eliminated: false };
    }

    async function rollForSelectedPlayer() {
      const player = selectedPlayer();
      if (!player || state.rolling || state.gameEnded || isPlayerFinished(player)) return;
      pushHistory("Roll die");
      state.rolling = true;
      queueRender({
        players: true,
        stats: true,
        refreshInventoryOverlay: true,
        refreshContextMenu: true
      }, {
        tokenActiveIds: [player.id]
      });

      const dice = Math.floor(Math.random() * 6) + 1;
      await animateDiceVisual(dice);
      let bonus = 0;
      const actingPlayerId = player.id;
      if (player.bootsActive && player.boots > 0) {
        bonus = 2;
        player.boots -= 1;
        player.bootsActive = false;
        logEvent(`${player.name} activated Ritual greaves: +2 to the roll.`);
      }

      const finalRoll = dice + bonus;
      const from = player.position;
      const target = clamp(player.position + finalRoll, 1, LAST_CELL);
      if (bonus) {
        logEvent(`${player.name} rolled the die: ${dice} (+${bonus}) = ${finalRoll}. Move: ${from} -> ${target}.`);
      } else {
        logEvent(`${player.name} rolled the die: ${dice}. Move: ${from} -> ${target}.`);
      }

      await movePlayerAnimated(player, target);
      try {
        const tokenEl = tokenElsById.get(player.id);
        if (window.UIEffects && tokenEl) UIEffects.popGoldAtElement(tokenEl, GOLD_PER_MOVE);
      } catch (e) {
        console.debug('ui effect gold-per-move failed', e);
      }
      player.gold += GOLD_PER_MOVE;
      markPlayerDirty(player.id, { row: true, stats: true });

      await resolveCellEffects(player);
      const actingPlayerAlive = state.players.some((entry) => entry.id === actingPlayerId);
      const activePlayers = getActivePlayers();

      if (!state.gameEnded && activePlayers.length > 1) {
        if (actingPlayerAlive) {
          const actingIndex = activePlayers.findIndex((entry) => entry.id === actingPlayerId);
          state.turnIndex = actingIndex >= 0 ? (actingIndex + 1) % activePlayers.length : state.turnIndex;
        }
        const prevSelectedId = state.selectedPlayerId;
        selectPlayerByTurnIndex();
        if (state.selectedPlayerId) {
          const nextPlayer = state.players.find((entry) => entry.id === state.selectedPlayerId);
          if (nextPlayer) logEvent(`Turn passed to: ${nextPlayer.name}.`);
        }
        markPlayerDirty(prevSelectedId, { row: true, stats: true });
      } else if (!state.gameEnded && activePlayers.length === 1) {
        state.turnIndex = 0;
        state.selectedPlayerId = activePlayers[0].id;
      } else if (activePlayers.length === 0) {
        state.turnIndex = 0;
        state.selectedPlayerId = state.players[0]?.id || "";
      }

      state.rolling = false;
      if (actingPlayerAlive) {
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      }
      queueRenderFromDirty({
        autosave: true,
        selectedTile: true,
        tokenActiveIds: [state.selectedPlayerId, player.id]
      });
    }

    function undoLastAction() {
      if (state.history.length === 0 || state.rolling) return;
      const snapshot = state.history.pop();
      state.players = clonePlayers(snapshot.players);
      if (Array.isArray(snapshot.cells) && snapshot.cells.length === LAST_CELL) {
        state.cells = cloneCells(snapshot.cells);
        createBoard();
      }
      state.selectedPlayerId = snapshot.selectedPlayerId;
      state.selectedCell = snapshot.selectedCell ?? state.selectedCell;
      state.turnIndex = snapshot.turnIndex;
      state.logEntries = Array.isArray(snapshot.logEntries) ? [...snapshot.logEntries] : [];
      state.gameEnded = Boolean(snapshot.gameEnded);
      renderLogWindow();
      if (state.gameEnded) {
        openVictoryOverlay();
      } else {
        closeVictoryOverlay();
      }
      logEvent(`Undid action: ${snapshot.actionLabel}.`);
      queueRender({
        players: true,
        stats: true,
        selectedTile: true,
        refreshInventoryOverlay: true,
        refreshContextMenu: true,
        tokensFull: true
      }, { autosave: true });
    }

    function withSelectedPlayer(action) {
      if (state.gameEnded) return;
      const player = selectedPlayer();
      if (!player) {
        logEvent("Select an active player first.");
        return;
      }
      action(player);
      markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });
    }

    async function moveSelectedPlayerToChosenTile() {
      const player = selectedPlayer();
      if (!player || state.rolling || state.gameEnded || isPlayerFinished(player)) return;
      pushHistory("Move to selected tile");
      state.rolling = true;
      renderStats();
      renderTurnManager();
      renderSelectedTile();

      const to = clamp(state.selectedCell, 1, LAST_CELL);
      const from = player.position;
      logEvent(`Keeper moves ${player.name} to tile ${to} (${from} -> ${to}).`);
      await movePlayerAnimated(player, to);
      await resolveCellEffects(player);

      state.rolling = false;
      markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true, posFrom: from, posTo: player.position });
      queueRenderFromDirty({ autosave: true, selectedTile: true, tokenActiveIds: [player.id] });
    }

    function applyShopAction(action) {
      if (state.gameEnded) return;
      const sourceEl = tileContextMenuEl.querySelector(`[data-shop-item-id="${action}"]`);
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) {
        logEvent("Purchase unavailable: no selected player is on the shop tile.");
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }
      if (!hasCellType(player.position, "shop")) {
        logEvent(`Purchase denied: ${player.name} must stand on any shop tile ${getCellTypeIcon("shop")}.`);
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }

      const item = SHOP_ITEMS.find((entry) => entry.id === action);
      if (!item) {
        return;
      }
      const playerProp = SHOP_ITEM_TO_PROP[action];
      if (!playerProp) return;

      if (!canAddItemType(player, action)) {
        logEvent(`Inventory full: ${player.name} has all ${INVENTORY_SLOT_LIMIT} slots occupied (a free slot is needed for a new item type).`);
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }

      if (player.gold < item.price) {
        logEvent(`Relic shop (tile ${player.position}): ${player.name} lacks gold to buy "${getShopItemName(item)}" (${formatGold(item.price)}).`);
        UIEffects.pulseClass(sourceEl, "shake", 400);
        const goldEl = document.getElementById("shopBuyerGold");
        UIEffects.pulseClass(goldEl, "shake", 400);
        queueRender({ refreshContextMenu: true, refreshInventoryOverlay: true });
        return;
      }

      pushHistory(`Buy at shop: ${getShopItemName(item)}`);
      const purchase = ShopActions.purchaseItemState({
        player,
        prop: playerProp,
        itemPrice: item.price,
        bonusGold: action === "alchemyCrystal" ? REWARDS.alchemyCrystalPurchaseBonusGold : 0
      });
      if (!purchase.ok) return;
      updatePlayerInState(player.id, purchase.player);

      UIEffects.pulseClass(sourceEl, "slot-flash", 400);
      const goldEl = document.getElementById("shopBuyerGold");
      UIEffects.popGoldAtElement(goldEl, -item.price);

      if (action === "alchemyCrystal") {
        logEvent(`Relic shop (tile ${player.position}): ${player.name} gets "${getShopItemName(item)}" for ${formatGold(item.price)} and immediately releases +${formatGold(REWARDS.alchemyCrystalPurchaseBonusGold)} energy.`);
      } else {
        logEvent(`Relic shop (tile ${player.position}): ${player.name} gets "${getShopItemName(item)}" for ${formatGold(item.price)}.`);
      }

      queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });

      // After rerender, highlight the buyer inventory slot that corresponds to this item.
      setTimeout(() => {
        const slot = shopPlayerInventoryEl.querySelector(`[data-inv-item-id="${action}"]`);
        if (!slot) return;
        UIEffects.pulseClass(slot, "inv-drop", 500);
      }, 0);
    }

    function sellShopBuyerItem(invItemId, slotEl) {
      if (state.gameEnded) return;
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) return;
      if (!hasCellType(player.position, "shop")) {
        logEvent(`Sale denied: ${player.name} must stand on any shop tile ${getCellTypeIcon("shop")}.`);
        return;
      }

      const map = {
        boots: { shopId: "boots", prop: SHOP_ITEM_TO_PROP.boots },
        shields: { shopId: "shield", prop: SHOP_ITEM_TO_PROP.shield },
        luckCharm: { shopId: "luckCharm", prop: SHOP_ITEM_TO_PROP.luckCharm },
        trapKit: { shopId: "trapKit", prop: SHOP_ITEM_TO_PROP.trapKit },
        rerollStone: { shopId: "rerollStone", prop: SHOP_ITEM_TO_PROP.rerollStone },
        alchemyCrystal: { shopId: "alchemyCrystal", prop: SHOP_ITEM_TO_PROP.alchemyCrystal }
      };
      const info = map[invItemId];
      if (!info) return;

      const item = SHOP_ITEMS.find((entry) => entry.id === info.shopId);
      if (!item) return;
      const sell = ShopActions.sellItemState({
        player,
        prop: info.prop,
        itemPrice: item.price,
        sellFactor: SELL_FACTOR
      });
      if (!sell.ok) return;
      const sellPrice = sell.gainedGold;

      if (slotEl) {
        UIEffects.pulseClass(slotEl, "sell-flash", 400);
        UIEffects.pulseClass(slotEl, "inv-drop", 500);
      }

      pushHistory(`Sell at shop: ${getShopItemName(item)}`);
      updatePlayerInState(player.id, sell.player);
      logEvent(`Relic shop (tile ${player.position}): ${player.name} trades 1x "${getShopItemName(item)}" for +${formatGold(sellPrice)}.`);

      queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });

      // Gold pop/glow after rerender so we target the current gold element.
      setTimeout(() => {
        const goldEl = document.getElementById("shopBuyerGold");
        UIEffects.popGoldAtElement(goldEl, sellPrice);
      }, 0);
    }

    function bindEvents() {
      if (languageSelectEl) {
        languageSelectEl.addEventListener("change", () => setLanguage(languageSelectEl.value));
      }
      if (settingsLauncherEl) {
        settingsLauncherEl.addEventListener("click", () => setSettingsPanelOpen(true));
      }
      if (settingsCloseBtnEl) {
        settingsCloseBtnEl.addEventListener("click", () => setSettingsPanelOpen(false));
      }
      if (installAppBtnEl) {
        installAppBtnEl.addEventListener("click", () => promptInstallApp());
      }
      if (sidePanelToggleBtnEl) {
        sidePanelToggleBtnEl.addEventListener("click", () => setSidePanelLeft(!sidePanelLeft));
      }
      if (saveConfigBtnEl) {
        saveConfigBtnEl.addEventListener("click", saveConfigOverridesFromMenu);
      }
      if (resetConfigBtnEl) {
        resetConfigBtnEl.addEventListener("click", resetConfigOverrides);
      }
      if (configBoardSizeEl) {
        configBoardSizeEl.addEventListener("input", () => refreshConfigPreview());
      }
      [configFortuneGoodChanceEl, configBlackMarketProfitChanceEl, configAltarShieldChanceEl].forEach((inputEl) => {
        if (inputEl) {
          inputEl.addEventListener("input", () => syncConfigRangeLabels());
        }
      });
      if (settingsGeneralTabBtnEl) {
        settingsGeneralTabBtnEl.addEventListener("click", () => setSettingsTab("general"));
      }
      if (settingsConfigTabBtnEl) {
        settingsConfigTabBtnEl.addEventListener("click", () => setSettingsTab("config"));
      }
      addPlayerBtnEl.addEventListener("click", () => {
        Actions.addPlayerByName(playerNameEl.value);
      });
      if (eventJournalLauncherEl) {
        eventJournalLauncherEl.addEventListener("click", toggleLogPanel);
      }
      if (logFilterSelectEl) {
        logFilterSelectEl.addEventListener("change", () => setLogFilter(logFilterSelectEl.value));
      }
      playerNameEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") Actions.addPlayerByName(playerNameEl.value);
      });

      activePlayerSelectEl.addEventListener("change", () => {
        Actions.selectPlayer(activePlayerSelectEl.value);
      });
      playersListEl.addEventListener("click", (event) => {
        const removeBtn = event.target.closest("[data-remove-player-id]");
        if (removeBtn) {
          Actions.removePlayer(removeBtn.dataset.removePlayerId);
          return;
        }
        const item = event.target.closest("[data-player-id]");
        if (!item) return;
        Actions.selectPlayer(item.dataset.playerId);
      });
      shopBuyerSelectEl.addEventListener("change", () => {
        const buyer = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
        if (tileContextMode === "shop") {
          const canBuyHere = buyer && hasCellType(buyer.position, "shop");
          shopItemsListEl.querySelectorAll("[data-shop-item-id]").forEach((el) => {
            el.classList.toggle("disabled", !canBuyHere || state.rolling);
          });
          renderShopPlayerInventory();
          return;
        }
        if (tileContextMode === "fortuneTeller") {
          renderFortunePlayerInfo();
          return;
        }
        if (tileContextMode === "blackMarket") {
          renderBlackMarketPlayerInfo();
          return;
        }
        if (tileContextMode === "altar") {
          renderAltarPlayerInfo();
        }
      });

      rollBtnEl.addEventListener("click", rollForSelectedPlayer);

      addGoldBtnEl.addEventListener("click", () => {
        withSelectedPlayer((player) => {
          pushHistory("Add gold");
          player.gold += 50;
          logEvent(`Keeper grants ${player.name} +${formatGold(50)} (total: ${formatGold(player.gold)}).`);
        });
      });

      removeGoldBtnEl.addEventListener("click", () => {
        withSelectedPlayer((player) => {
          pushHistory("Remove gold");
          player.gold = Math.max(0, player.gold - 50);
          logEvent(`Keeper takes ${formatGold(50)} from ${player.name} (total: ${formatGold(player.gold)}).`);
        });
      });

      giveBootsBtnEl.addEventListener("click", () => {
        withSelectedPlayer((player) => {
          pushHistory("Grant boots");
          if (!canAddItemType(player, "boots")) {
            logEvent(`Inventory full: ${player.name} has all ${INVENTORY_SLOT_LIMIT} slots occupied.`);
            state.history.pop();
            return;
          }
          player.boots += 1;
          logEvent(`Keeper hands ${player.name} Ritual greaves (total: ${player.boots}).`);
        });
      });

      giveShieldBtnEl.addEventListener("click", () => {
        withSelectedPlayer((player) => {
          pushHistory("Grant protection seal");
          if (!canAddItemType(player, "shield")) {
            logEvent(`Inventory full: ${player.name} has all ${INVENTORY_SLOT_LIMIT} slots occupied.`);
            state.history.pop();
            return;
          }
          player.shields += 1;
          logEvent(`Keeper hands ${player.name} Protection Seal (total: ${player.shields}).`);
        });
      });

      punishBtnEl.addEventListener("click", async () => {
        const player = selectedPlayer();
        if (!player || state.rolling) return;
        pushHistory("Punish player");
        state.rolling = true;
        renderStats();
        renderTurnManager();
        const from = player.position;
        const to = clamp(player.position - 3, 1, LAST_CELL);
        logEvent(`Keeper punishes ${player.name}: -3 tiles (${from} -> ${to}).`);
        await movePlayerAnimated(player, to);
        state.rolling = false;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true, posFrom: from, posTo: player.position });
        queueRenderFromDirty({ autosave: true, selectedTile: true, tokenActiveIds: [player.id] });
      });

      undoBtnEl.addEventListener("click", undoLastAction);
      saveGameBtnEl.addEventListener("click", () => saveGameState(false));
      loadGameBtnEl.addEventListener("click", loadGameState);
      newGameBtnEl.addEventListener("click", resetGameWithConfirm);
      moveToTileBtnEl.addEventListener("click", moveSelectedPlayerToChosenTile);
      closeInventoryBtnEl.addEventListener("click", closeInventoryOverlay);
      closeVictoryBtnEl.addEventListener("click", closeVictoryOverlay);
      inventoryOverlayEl.addEventListener("click", (event) => {
        if (event.target === inventoryOverlayEl) closeInventoryOverlay();
      });
      victoryOverlayEl.addEventListener("click", (event) => {
        if (event.target === victoryOverlayEl) closeVictoryOverlay();
      });
      inventoryBodyEl.addEventListener("click", (event) => {
        const slot = event.target.closest("[data-use-item]");
        if (!slot) return;
        if (slot.dataset.disabled === "true") return;
        useInventoryItem(slot.dataset.useItem);
      });
      playerStatsEl.addEventListener("click", (event) => {
        const slot = event.target.closest("[data-use-item]");
        if (!slot) return;
        if (slot.dataset.disabled === "true") return;
        const player = selectedPlayer();
        if (!player) return;
        useInventoryItem(slot.dataset.useItem, player.id);
      });
      boardEl.addEventListener("contextmenu", handleBoardContextMenu);
      closeShopBtnEl.addEventListener("click", hideTileContextMenu);
      shopOverlayEl.addEventListener("click", (event) => {
        if (event.target === shopOverlayEl) hideTileContextMenu();
      });
      shopPlayerInventoryEl.addEventListener("click", (event) => {
        const slot = event.target.closest("[data-inv-item-id]");
        if (!slot) return;
        sellShopBuyerItem(slot.dataset.invItemId, slot);
      });
      tileContextMenuEl.addEventListener("click", (event) => {
        const button = event.target.closest("[data-shop-item-id]");
        if (button) {
          applyShopAction(button.dataset.shopItemId);
          return;
        }
        const fortuneButton = event.target.closest("[data-fortune-action]");
        if (!fortuneButton) return;
        if (state.rolling || state.gameEnded) return;
        const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
        if (!player) {
        logEvent("Prophecy unavailable: no player is selected at the Oracle.");
          return;
        }
        if (!hasCellType(player.position, "fortuneTeller")) {
          logEvent(`Prophecy denied: ${player.name} must stand on the Oracle tile ${getCellTypeIcon("fortuneTeller")}.`);
          return;
        }
        if (player.fortuneQuest) {
          logEvent(`${player.name} already has an active prophecy: ${getFortuneQuestConditionText(player.fortuneQuest)}`);
          return;
        }
        (async () => {
          pushHistory("Oracle prophecy");
          state.rolling = true;
          renderStats();
          renderTurnManager();
          await handleFortuneTeller(player);
          state.rolling = false;
          markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
          queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });
        })();
        return;
      });
      tileContextMenuEl.addEventListener("click", (event) => {
        const contextActionButton = event.target.closest("[data-context-action]");
        if (!contextActionButton) return;
        if (state.rolling || state.gameEnded) return;
        const action = contextActionButton.dataset.contextAction;
        const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
        if (!player) {
          logEvent("Action unavailable: no player selected.");
          return;
        }
        if (action === "blackMarket" && !hasCellType(player.position, "blackMarket")) {
          logEvent(`Deal denied: ${player.name} must stand on the Shadow market tile ${getCellTypeIcon("blackMarket")}.`);
          return;
        }
        if (action === "altar" && !hasCellType(player.position, "altar")) {
          logEvent(`Ritual denied: ${player.name} must stand on the Altar tile ${getCellTypeIcon("altar")}.`);
          return;
        }
        pushHistory(action === "blackMarket" ? "Shadow market deal" : "Altar ritual");
        if (action === "blackMarket") {
          applyBlackMarketAction(player);
        } else if (action === "altar") {
          applyAltarAction(player);
        }
        queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });
      });
      document.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        if (shopOverlayEl.classList.contains("visible")) {
          if (tileContextMenuEl.contains(event.target)) return;
          hideTileContextMenu();
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && settingsPanelEl && !settingsPanelEl.classList.contains("is-hidden")) {
          setSettingsPanelOpen(false);
        }
        if (event.key === "Escape" && eventJournalEl && !eventJournalEl.classList.contains("is-hidden")) {
          closeLogPanel();
        }
        if (event.key === "Escape") hideTileContextMenu();
        if (event.key === "Escape") closeInventoryOverlay();
        if (event.key === "Escape") closeVictoryOverlay();
      });
      document.addEventListener("pointerdown", (event) => {
        if (!settingsPanelEl || settingsPanelEl.classList.contains("is-hidden")) return;
        const target = event.target;
        if (settingsPanelEl.contains(target)) return;
        if (settingsLauncherEl && settingsLauncherEl.contains(target)) return;
        setSettingsPanelOpen(false);
      });

      window.addEventListener("resize", () => {
        syncBoardScaleVars();
        invalidateCellCenterCache();
        renderBoardStaticLayer();
        queueRender({
          selectedTile: true,
          tokensFull: true
        });
        hideTileContextMenu();
      });

      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        syncInstallButton();
      });

      window.addEventListener("appinstalled", () => {
        deferredInstallPrompt = null;
        syncInstallButton();
      });
    }

    function init() {
      buildCells();
      createBoard();
      bindEvents();
      syncBoardScaleVars();
      syncSidePanelPosition();
      syncInstallButton();
      applyStaticTranslations();
      syncSettingsTab();
      syncConfigMenu();
      setSettingsPanelOpen(false);
      closeLogPanel();
      renderLogWindow();
      const loaded = loadGameState(true);
      applyStaticTranslations();
      if (!loaded) {
        fullRender(false);
        logEvent("Game ready. Add players and start the run!");
      }

      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("./sw.js").catch((error) => {
            console.debug("service worker registration failed", error);
          });
        });
      }
    }

    init();



