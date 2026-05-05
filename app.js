let CONFIG = window.GAME_CONFIG;
const CONFIG_OVERRIDES_STORAGE_KEY = "alchemist_dungeon_config_overrides_v1";
const PENDING_NEW_GAME_KEY = "alchemist_dungeon_pending_new_game_v1";
const SAVE_PLAYERS_OPTION_KEY = "alchemist_dungeon_save_players_v1";
const PENDING_NEW_GAME_PLAYERS_KEY = "alchemist_dungeon_pending_new_game_players_v1";
const PENDING_NEW_GAME_NAME_KEY = "alchemist_dungeon_pending_new_game_name_v1";
const TUTORIAL_PROGRESS_KEY = "alchemist_dungeon_tutorial_step_v1";
const TUTORIAL_SEEN_KEY = "alchemist_dungeon_tutorial_seen_v1";

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
    if (!window.GAME_I18N) {
      window.GAME_I18N = {
        bundles: { ru: {} },
        DEFAULT_LANGUAGE: "ru",
        getPreferredLanguage: (_k, d) => d || "ru",
        getBundle: () => ({}),
        localizeValue: (v) => v,
        getShopItemName: (item) => String(item?.name || ""),
        getShopItemDesc: (item) => String(item?.desc || ""),
        getPhaseLabel: (key) => String(key || ""),
        t: (path) => String(path || ""),
        translateLogMessage: (text) => String(text || ""),
        setLanguageKey: () => {}
      };
    }
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
      adrenaline: "adrenaline",
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
    const elementCache = new Map();

    function getEl(id) {
      if (elementCache.has(id)) {
        return elementCache.get(id);
      }
      const el = id === "boardWrap"
        ? document.querySelector(".board-wrap")
        : document.getElementById(id);
      if (el) {
        elementCache.set(id, el);
      }
      return el;
    }

      const DEFAULT_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="#2a2a2a" width="100%" height="100%"/><text x="50%" y="50%" dy=".35em" font-size="28" text-anchor="middle" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif">?</text></svg>');

    const boardEl = getEl('board');
    const boardWrapEl = getEl('boardWrap');
    const boardStaticLayerEl = getEl('boardStaticLayer');
    const tokensLayerEl = getEl('tokensLayer');

    const gameTitleEl = getEl('gameTitle');
    const mainMenuEl = getEl('mainMenu');
    const mainMenuContinueBtnEl = getEl('mainMenuContinueBtn');
    const mainMenuSettingsBtnEl = getEl('mainMenuSettingsBtn');
    const settingsLauncherEl = getEl('settingsLauncher');
    const settingsPanelEl = getEl('settingsPanel');
    const settingsCloseBtnEl = getEl('settingsCloseBtn');
    const settingsGeneralTabBtnEl = getEl('settingsGeneralTabBtn');
    const settingsConfigTabBtnEl = getEl('settingsConfigTabBtn');
    const sidePanelToggleBtnEl = getEl('sidePanelToggleBtn');
    const languageSelectEl = getEl('languageSelect');
    const configBoardSizeEl = getEl('configBoardSize');
    const configPlayerMaxHpEl = getEl('configPlayerMaxHp');
    const configGoldPerMoveEl = getEl('configGoldPerMove');
    const configInventorySlotsEl = getEl('configInventorySlots');
    const configAutosaveDelayEl = getEl('configAutosaveDelay');
    const configFinishersToEndGameEl = getEl('configFinishersToEndGame');
    const configFortuneGoodChanceEl = getEl('configFortuneGoodChance');
    const configBlackMarketProfitChanceEl = getEl('configBlackMarketProfitChance');
    const configAltarShieldChanceEl = getEl('configAltarShieldChance');
    const fortuneGoodChanceValueEl = getEl('fortuneGoodChanceValue');
    const blackMarketProfitChanceValueEl = getEl('blackMarketProfitChanceValue');
    const altarShieldChanceValueEl = getEl('altarShieldChanceValue');
    const configLastCellPreviewEl = getEl('configLastCellPreview');
    const configEditorStatusEl = getEl('configEditorStatus');
    const saveConfigBtnEl = getEl('saveConfigBtn');
    const resetConfigBtnEl = getEl('resetConfigBtn');
    const toastContainerEl = getEl('toastContainer');
    const eventJournalLauncherEl = getEl('eventJournalLauncher');
    const eventJournalEl = getEl('eventJournal');
    const copyLogsBtnEl = getEl('copyLogsBtn');
    const logFilterSelectEl = getEl('logFilterSelect');
    const logBoxEl = getEl('logBox');
    const playerNameEl = getEl('playerName');
    const addPlayerBtnEl = getEl('addPlayerBtn');
    const playersListEl = getEl('playersList');
    const activePlayerSelectEl = getEl('activePlayerSelect');
    const turnInfoEl = getEl('turnInfo');
    const turnListEl = getEl('turnList');
    const nextTurnBtnEl = getEl('nextTurnBtn');
    const undoBtnEl = getEl('undoBtn');
    const saveGameBtnEl = getEl('saveGameBtn');
    const loadGameBtnEl = getEl('loadGameBtn');
    const newGameBtnEl = getEl('newGameBtn');
    const newGameSetupEl = getEl('newGameSetup');
    const newGameStartBtnEl = getEl('newGameStartBtn');
    const newGameCloseBtnEl = getEl('newGameCloseBtn');
    const newGameNameInputEl = getEl('newGameNameInput');
    const savePlayersToggleEl = getEl('savePlayersToggle');
    const installAppBtnEl = getEl('installAppBtn');
    const tutorialBtnEl = getEl('tutorialBtn');
    const sessionSelectEl = getEl('sessionSelect');
    const sessionNewBtnEl = getEl('sessionNewBtn');
    const sessionSaveBtnEl = getEl('sessionSaveBtn');
    const sessionPickerEl = getEl('sessionPicker');
    const sessionPickerSelectEl = getEl('sessionPickerSelect');
    const sessionPickerCloseBtnEl = getEl('sessionPickerCloseBtn');
    const sessionPickerCloseIconBtnEl = getEl('sessionPickerCloseIconBtn');
    const sessionPickerLoadBtnEl = getEl('sessionPickerLoadBtn');
    const sessionPickerRenameBtnEl = getEl('sessionPickerRenameBtn');
    const sessionPickerDeleteBtnEl = getEl('sessionPickerDeleteBtn');
    const activePlayerCardEl = getEl('activePlayerCard');
    const playerStatsEl = getEl('playerStats');
    const rollBtnEl = getEl('rollBtn');
    const diceCubeEl = getEl('diceCube');
    const diceResultEl = getEl('diceResult');
    const addGoldBtnEl = getEl('addGoldBtn');
    const removeGoldBtnEl = getEl('removeGoldBtn');
    const giveBootsBtnEl = getEl('giveBootsBtn');
    const giveShieldBtnEl = getEl('giveShieldBtn');
    const punishBtnEl = getEl('punishBtn');
    const tileInfoEl = getEl('tileInfo');
    const moveToTileBtnEl = getEl('moveToTileBtn');
    const shopOverlayEl = getEl('shopOverlay');
    const tileContextMenuEl = getEl('tileContextMenu');
    const tileContextTitleEl = getEl('tileContextTitle');
    const tileContextSubtitleEl = getEl('tileContextSubtitle');
    const tileContextPlayerLabelEl = getEl('tileContextPlayerLabel');
    const closeShopBtnEl = getEl('closeShopBtn');
    const shopBuyerSelectEl = getEl('shopBuyerSelect');
    const shopContextSectionEl = getEl('shopContextSection');
    const shopItemsListEl = getEl('shopItemsList');
    const shopPlayerMetaEl = getEl('shopPlayerMeta');
    const shopPlayerInventoryEl = getEl('shopPlayerInventory');
    const fortuneContextSectionEl = getEl('fortuneContextSection');
    const fortuneTextEl = getEl('fortuneText');
    const fortunePlayerMetaEl = getEl('fortunePlayerMeta');
    const fortuneActionBtnEl = getEl('fortuneActionBtn');
    const blackMarketContextSectionEl = getEl('blackMarketContextSection');
    const blackMarketPlayerMetaEl = getEl('blackMarketPlayerMeta');
    const blackMarketActionBtnEl = getEl('blackMarketActionBtn');
    const altarContextSectionEl = getEl('altarContextSection');
    const altarPlayerMetaEl = getEl('altarPlayerMeta');
    const altarActionBtnEl = getEl('altarActionBtn');
    const inventoryOverlayEl = getEl('inventoryOverlay');
    const inventoryNameEl = getEl('inventoryName');
    const inventoryHpEl = getEl('inventoryHp');
    const inventoryGoldEl = getEl('inventoryGold');
    const inventoryBodyEl = getEl('inventoryBody');
    const closeInventoryBtnEl = getEl('closeInventoryBtn');
    const tradeOverlayEl = getEl('tradeOverlay');
    const tradeBodyEl = getEl('tradeBody');
    const closeTradeBtnEl = getEl('closeTradeBtn');
    const victoryOverlayEl = getEl('victoryOverlay');
    const victoryBodyEl = getEl('victoryBody');
    const closeVictoryBtnEl = getEl('closeVictoryBtn');
    const victoryNewGameBtnEl = getEl('victoryNewGameBtn');
    let autosaveTimer = null;
    let tileContextMode = "shop";
    let boardCellEls = [];
let cellCenters = [];
let cellCentersValid = false;
let cellCentersRafId = null;
let scaleVarsSignature = '';
let scaleVarsValueSignature = '';
let lastRenderedSelectedCell = 0;
let perfSectionTimes = {};
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
    let lastLogRenderedSignature = "";
    let lastInventorySignature = "";
    let deferredInstallPrompt = null;
    let tutorialManager = null;
    let suppressTutorialAutostartOnce = false;
    let mainMenuScrollY = 0;
    const SESSIONS_INDEX_KEY = "alchemist_dungeon_sessions_v1";
    const ACTIVE_SESSION_KEY = "alchemist_dungeon_active_session_v1";
    const SAVE_SLOT_PREFIX = `${SAVE_KEY}__slot__`;
    let activeSessionId = "";
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
    const tradeTargetByPlayerId = new Map();
    const tradeSelectionByPlayerId = new Map();
    const contextInit = {
      shop: false,
      fortuneTeller: false,
      blackMarket: false,
      altar: false
    };
    let lastShopMenuMode = "";
    const inventorySlotsCache = new Map();
    const MAX_INVENTORY_CACHE = 180;
    const effectsPanelCache = new Map();
    const MAX_EFFECTS_CACHE = 180;
    let diceRotationX = -30;
    let diceRotationY = 45;
    let autosaveDirty = false;
    const DICE_ANIMATION_MS = 1100;
const DICE_ROTATIONS = {
      1: { x: 0, y: 0 },
      2: { x: -90, y: 0 },
      3: { x: 0, y: -90 },
      4: { x: 0, y: 90 },
      5: { x: 90, y: 0 },
      6: { x: 0, y: 180 }
    };

    let logFormatCache = new WeakMap();
    let logCacheHits = 0;

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
      settingsTab = nextTab || "general";
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

    function buildConfigOverridesFromInputs() {
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
      return overrides;
    }

    function shouldSavePlayersBetweenNewGames() {
      try {
        return window.localStorage.getItem(SAVE_PLAYERS_OPTION_KEY) === "1";
      } catch (_) {
        return false;
      }
    }

    function syncSavePlayersToggle() {
      if (!savePlayersToggleEl) return;
      savePlayersToggleEl.checked = shouldSavePlayersBetweenNewGames();
    }

    function persistConfigOverrides(overrides) {
      try {
        window.localStorage.setItem(CONFIG_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
        return true;
      } catch (_) {
        return false;
      }
    }

    function saveConfigOverridesFromMenu() {
      const overrides = buildConfigOverridesFromInputs();
      if (!persistConfigOverrides(overrides)) {
        setConfigEditorStatus(t("ui.configSaveFailed"), "error");
        showLogToast(t("ui.configSaveFailed"));
        return;
      }
      setConfigEditorStatus(t("ui.configSaved"), "success");
      showLogToast(t("ui.configSaved"));
      window.setTimeout(() => window.location.reload(), 500);
    }

    function setNewGameSetupOpen(isOpen) {
      if (!newGameSetupEl) return;
      newGameSetupEl.classList.toggle("is-hidden", !isOpen);
      if (isOpen) emitGameEvent("new-game-menu-opened");
      if (isOpen) setSettingsPanelOpen(false);
    }

    function startNewGameWithConfig() {
      const overrides = buildConfigOverridesFromInputs();
      if (!persistConfigOverrides(overrides)) {
        setConfigEditorStatus(t("ui.configSaveFailed"), "error");
        showLogToast(t("ui.configSaveFailed"));
        return;
      }
      try {
        window.localStorage.setItem(PENDING_NEW_GAME_KEY, "1");
        if (document.body.classList.contains("tutorial-active")) {
          // Tutorial step "start new game" triggers page reload. Move to the next step explicitly.
          window.localStorage.setItem(TUTORIAL_PROGRESS_KEY, "4");
          window.localStorage.removeItem(TUTORIAL_SEEN_KEY);
        }
        if (shouldSavePlayersBetweenNewGames() && Array.isArray(state.players) && state.players.length > 0) {
          window.localStorage.setItem(PENDING_NEW_GAME_PLAYERS_KEY, JSON.stringify(clonePlayers(state.players)));
        } else {
          window.localStorage.removeItem(PENDING_NEW_GAME_PLAYERS_KEY);
        }
        const pendingName = String(newGameNameInputEl?.value || "").trim().slice(0, 40);
        if (pendingName) window.localStorage.setItem(PENDING_NEW_GAME_NAME_KEY, pendingName);
        else window.localStorage.removeItem(PENDING_NEW_GAME_NAME_KEY);
      } catch (_) {
        // ignore
      }
      window.location.reload();
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

      if (mainMenuSettingsBtnEl) mainMenuSettingsBtnEl.textContent = t("ui.settingsTitle");
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
        if (buttonEl) buttonEl.textContent = "\u00D7";
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

      // Clear log format cache on language change
      logFormatCache = new WeakMap();

      applyStaticTranslations();
      queueRender({ stats: true, players: true, selectedTile: true, refreshContextMenu: true, refreshInventoryOverlay: true, tokensFull: true });
    }

    function syncSidePanelPosition() {
      document.body.classList.toggle("side-panel-left", sidePanelLeft);
      if (sidePanelToggleBtnEl) {
        const label = t(sidePanelLeft ? "ui.sidePanelToggleRight" : "ui.sidePanelToggleLeft");
        sidePanelToggleBtnEl.textContent = label;
        sidePanelToggleBtnEl.setAttribute("aria-label", label);
        sidePanelToggleBtnEl.title = label;
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

if (PERF_ENABLED && logCacheHits > 0 && logCacheHits % 100 === 0) {
  console.debug(`[perf] logFormatCache: hits=${logCacheHits} (${((logCacheHits/(logCacheHits+100))*100).toFixed(1)}% hit rate)`);
}
      performance.clearMarks(handle.startMark);
      performance.clearMarks(endMark);
    }

    function recordPerfSection(name, duration) {
      if (!PERF_ENABLED) return;
      const stat = perfSectionTimes[name] || { count: 0, total: 0, max: 0 };
      stat.count += 1;
      stat.total += duration;
      stat.max = Math.max(stat.max, duration);
      perfSectionTimes[name] = stat;
      if (stat.count % 60 === 0) {
        const avg = stat.total / stat.count;
        console.debug(`[perf] section ${name}: avg=${avg.toFixed(2)}ms max=${stat.max.toFixed(2)}ms n=${stat.count}`);
      }
    }

    function measurePerfSection(name, fn) {
      if (!PERF_ENABLED) return fn();
      const started = performance.now();
      const result = fn();
      recordPerfSection(name, performance.now() - started);
      return result;
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
  const cached = logFormatCache.get(entry);
  if (cached !== undefined) {
    if (PERF_ENABLED) logCacheHits++;
    return cached;
  }

  const safeAt = Number.isFinite(Number(entry?.at)) ? Number(entry.at) : Date.now();
  const safeText = String(entry?.text || "").trim();
  if (!safeText) return "";

  const locale = currentLanguage === "en" ? "en-US" : currentLanguage === "uk" ? "uk-UA" : "ru-RU";
  const time = new Date(safeAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const localizedText = window.GAME_I18N.translateLogMessage(safeText, currentLanguage);
  const value = `[${time}] ${localizedText}`;

  logFormatCache.set(entry, value);
  return value;
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

    function getFilteredLogTextForCopy() {
      const selectedFilter = state.logFilter || "all";
      return state.logEntries
        .filter((entry) => selectedFilter === "all" || entry.kind === selectedFilter)
        .map((entry) => formatLogEntry(entry))
        .filter(Boolean)
        .join("\n")
        .trim();
    }

    async function copyTextToClipboard(text) {
      const value = String(text || "").trim();
      if (!value) return false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          return true;
        }
      } catch (_) {
        // fall through to legacy copy
      }

      try {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.setAttribute("readonly", "true");
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const ok = document.execCommand("copy");
        textArea.remove();
        return Boolean(ok);
      } catch (_) {
        return false;
      }
    }

    async function copyVisibleLogsToClipboard() {
      const text = getFilteredLogTextForCopy();
      const ok = await copyTextToClipboard(text);
      showLogToast(ok ? t("eventJournal.copyDone") : t("eventJournal.copyFailed"));
    }

    function renderLogWindow() {
      const selectedFilter = state.logFilter || "all";
      const lastAt = state.logEntries[state.logEntries.length - 1]?.at || 0;
      const signature = `${currentLanguage}|${selectedFilter}|${state.logEntries.length}|${lastAt}`;
      if (signature === lastLogRenderedSignature) return;
      lastLogRenderedSignature = signature;
      const visibleEntries = [];
      for (let i = state.logEntries.length - 1; i >= 0 && visibleEntries.length < LOG_DOM_LIMIT; i -= 1) {
        const entry = state.logEntries[i];
        if (!entry) continue;
        if (selectedFilter !== "all" && entry.kind !== selectedFilter) continue;
        visibleEntries.push(entry);
      }
      visibleEntries.reverse();
      const visible = visibleEntries.map((entry) => formatLogEntry(entry)).filter(Boolean);
      logBoxEl.textContent = visible.length ? `${visible.join("\n")}\n` : (state.logEntries.length ? t("eventJournal.emptyFiltered") : t("eventJournal.empty"));
      if (!eventJournalEl.classList.contains("is-hidden")) {
        logBoxEl.scrollTop = logBoxEl.scrollHeight;
      }
    }

    function syncLogLauncherState() {
      if (!eventJournalLauncherEl) return;
      const isOpen = !eventJournalEl.classList.contains("is-hidden");
      eventJournalLauncherEl.textContent = isOpen ? "\u2212" : "\u2261";
      const launcherLabel = isOpen ? t("eventJournal.collapse") : t("eventJournal.expand");
      eventJournalLauncherEl.setAttribute("aria-label", launcherLabel);
      eventJournalLauncherEl.setAttribute("title", launcherLabel);
      eventJournalLauncherEl.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    function openLogPanel() {
      eventJournalEl.classList.remove("is-hidden");
      syncLogLauncherState();
      renderLogWindow();
      logBoxEl.scrollTop = logBoxEl.scrollHeight;
      emitGameEvent("logs-opened");
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
      if (settingsLauncherEl) {
        settingsLauncherEl.classList.toggle("is-hidden", isOpen);
        settingsLauncherEl.setAttribute("aria-expanded", isOpen ? "true" : "false");
      }
      if (isOpen) setNewGameSetupOpen(false);
      if (isOpen) syncSettingsTab();
    }

    function safeJsonParse(raw, fallback = null) {
      try {
        return JSON.parse(raw);
      } catch (_) {
        return fallback;
      }
    }

    function nowIso() {
      try {
        return new Date().toISOString();
      } catch (_) {
        return "";
      }
    }

    function getSaveSlotKey(sessionId) {
      return `${SAVE_SLOT_PREFIX}${sessionId}`;
    }

    function readSessionsIndex() {
      try {
        const raw = localStorage.getItem(SESSIONS_INDEX_KEY);
        if (!raw) return [];
        const parsed = safeJsonParse(raw, []);
        return Array.isArray(parsed) ? parsed.filter((s) => s && typeof s === "object" && typeof s.id === "string") : [];
      } catch (_) {
        return [];
      }
    }

    function writeSessionsIndex(sessions) {
      try {
        localStorage.setItem(SESSIONS_INDEX_KEY, JSON.stringify(Array.isArray(sessions) ? sessions : []));
        return true;
      } catch (_) {
        return false;
      }
    }

    function readActiveSessionId() {
      try {
        return String(localStorage.getItem(ACTIVE_SESSION_KEY) || "");
      } catch (_) {
        return "";
      }
    }

    function writeActiveSessionId(sessionId) {
      try {
        localStorage.setItem(ACTIVE_SESSION_KEY, String(sessionId || ""));
      } catch (_) {
        // ignore
      }
    }

    function generateSessionId() {
      return `s_${Date.now()}_${Math.random().toString(16).slice(2, 7)}`;
    }

    function buildDefaultSessionName(existingCount) {
      const next = Math.max(1, Number(existingCount) || 0) + 1;
      return `${t("ui.sessionNameDefault")} ${next}`;
    }

    function ensureSessionsInitialized() {
      const existing = readSessionsIndex();
      const active = readActiveSessionId();
      if (existing.length > 0) {
        activeSessionId = existing.some((s) => s.id === active) ? active : existing[0].id;
        writeActiveSessionId(activeSessionId);
        return;
      }

      let legacyRaw = "";
      try {
        legacyRaw = String(localStorage.getItem(SAVE_KEY) || "");
      } catch (_) {
        legacyRaw = "";
      }

      const firstId = generateSessionId();
      const sessions = [{
        id: firstId,
        name: `${t("ui.sessionNameDefault")} 1`,
        createdAt: nowIso(),
        updatedAt: nowIso()
      }];

      if (legacyRaw && legacyRaw.trim()) {
        try {
          localStorage.setItem(getSaveSlotKey(firstId), legacyRaw);
          localStorage.removeItem(SAVE_KEY);
        } catch (_) {
          // ignore
        }
      }

      writeSessionsIndex(sessions);
      activeSessionId = firstId;
      writeActiveSessionId(activeSessionId);
    }

    function getSessionLabel(session) {
      const name = String(session?.name || "").trim() || t("ui.sessionNameDefault");
      const updated = String(session?.updatedAt || "").trim();
      if (!updated) return name;
      const date = new Date(updated);
      if (isNaN(date.getTime())) return `${name} \u2022 ${updated}`;
      const locale = currentLanguage === "en" ? "en-US" : (currentLanguage === "uk" ? "uk-UA" : "ru-RU");
      const formattedDate = date.toLocaleString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      return `${name} \u2022 ${formattedDate}`;
    }

    function syncSessionSelect() {
      if (!sessionSelectEl) return;
      const sessions = readSessionsIndex();
      const prev = String(sessionSelectEl.value || "");
      sessionSelectEl.innerHTML = "";
      sessions.forEach((session) => {
        const option = document.createElement("option");
        option.value = session.id;
        option.textContent = getSessionLabel(session);
        if (session.finished) {
          option.className = "session-finished";
          option.textContent = "РІСљвЂњ " + option.textContent;
        }
        sessionSelectEl.appendChild(option);
      });
      const target = sessions.some((s) => s.id === activeSessionId) ? activeSessionId : (sessions[0]?.id || "");
      sessionSelectEl.value = sessions.some((s) => s.id === prev) ? prev : target;
    }

    function syncSessionPickerSelect() {
      if (!sessionPickerSelectEl) return;
      const sessions = readSessionsIndex();
      const prev = String(sessionPickerSelectEl.value || "");
      sessionPickerSelectEl.innerHTML = "";
      sessions.forEach((session) => {
        const option = document.createElement("option");
        option.value = session.id;
        option.textContent = getSessionLabel(session);
        if (session.finished) {
          option.className = "session-finished";
          option.textContent = "РІСљвЂњ " + option.textContent;
        }
        sessionPickerSelectEl.appendChild(option);
      });
      const target = sessions.some((s) => s.id === activeSessionId) ? activeSessionId : (sessions[0]?.id || "");
      sessionPickerSelectEl.value = sessions.some((s) => s.id === prev) ? prev : target;
    }

    function setSessionPickerOpen(isOpen) {
      if (!sessionPickerEl) return;
      sessionPickerEl.classList.toggle("is-hidden", !isOpen);
      if (isOpen) {
        syncSessionPickerSelect();
        sessionPickerSelectEl?.focus();
      }
    }

    function openSessionPicker() {
      setSessionPickerOpen(true);
    }

    function setActiveSession(sessionId) {
      const id = String(sessionId || "");
      const sessions = readSessionsIndex();
      if (!sessions.some((s) => s.id === id)) return false;
      activeSessionId = id;
      writeActiveSessionId(activeSessionId);
      syncSessionSelect();
      syncSessionPickerSelect();
      syncMainMenu();
      return true;
    }

    function createNewSession() {
      const sessions = readSessionsIndex();
      const id = generateSessionId();
      const session = { id, name: buildDefaultSessionName(sessions.length), createdAt: nowIso(), updatedAt: nowIso(), finished: false };
      const next = sessions.concat(session);
      if (!writeSessionsIndex(next)) return null;
      setActiveSession(id);
      return session;
    }

    function setSessionNameById(sessionId, sessionName) {
      const id = String(sessionId || "");
      const clean = String(sessionName || "").trim().slice(0, 40);
      if (!id || !clean) return false;
      const sessions = readSessionsIndex();
      const updated = sessions.map((s) => s.id === id ? { ...s, name: clean } : s);
      if (!writeSessionsIndex(updated)) return false;
      syncSessionSelect();
      syncSessionPickerSelect();
      syncMainMenu();
      return true;
    }

    function renameActiveSession() {
      if (!activeSessionId) return false;
      const sessions = readSessionsIndex();
      const session = sessions.find((s) => s.id === activeSessionId);
      if (!session) return false;
      const nextName = window.prompt(t("ui.sessionNamePrompt"), String(session.name || "").trim() || t("ui.sessionNameDefault"));
      if (!nextName) return false;
      const clean = String(nextName).trim().slice(0, 40);
      if (!clean) return false;
      const updated = sessions.map((s) => s.id === activeSessionId ? { ...s, name: clean } : s);
      writeSessionsIndex(updated);
      syncSessionSelect();
      syncMainMenu();
      return true;
    }

    function renameSessionById(sessionId) {
      const id = String(sessionId || "");
      if (!id) return false;
      const sessions = readSessionsIndex();
      const session = sessions.find((s) => s.id === id);
      if (!session) return false;
      const nextName = window.prompt(t("ui.sessionNamePrompt"), String(session.name || "").trim() || t("ui.sessionNameDefault"));
      if (!nextName) return false;
      const clean = String(nextName).trim().slice(0, 40);
      if (!clean) return false;
      const updated = sessions.map((s) => s.id === id ? { ...s, name: clean } : s);
      writeSessionsIndex(updated);
      syncSessionSelect();
      syncSessionPickerSelect();
      syncMainMenu();
      return true;
    }

    function deleteActiveSession() {
      const sessions = readSessionsIndex();
      if (!activeSessionId || sessions.length === 0) return false;
      const session = sessions.find((s) => s.id === activeSessionId);
      if (!session) return false;
      const ok = window.confirm(t("ui.sessionDeleteConfirm", { name: String(session.name || t("ui.sessionNameDefault")) }));
      if (!ok) return false;
      const remaining = sessions.filter((s) => s.id !== activeSessionId);
      try {
        localStorage.removeItem(getSaveSlotKey(activeSessionId));
      } catch (_) {
        // ignore
      }
      if (remaining.length === 0) {
        writeSessionsIndex([]);
        writeActiveSessionId("");
        activeSessionId = "";
        ensureSessionsInitialized();
      } else {
        writeSessionsIndex(remaining);
        activeSessionId = remaining[0].id;
        writeActiveSessionId(activeSessionId);
      }
      syncSessionSelect();
      syncMainMenu();
      return true;
    }

    function deleteSessionById(sessionId) {
      const id = String(sessionId || "");
      const sessions = readSessionsIndex();
      const session = sessions.find((s) => s.id === id);
      if (!session) return false;
      const ok = window.confirm(t("ui.sessionDeleteConfirm", { name: String(session.name || t("ui.sessionNameDefault")) }));
      if (!ok) return false;
      const remaining = sessions.filter((s) => s.id !== id);
      try {
        localStorage.removeItem(getSaveSlotKey(id));
      } catch (_) {
        // ignore
      }

      // If the active session was deleted, fall back to the first remaining (or create a new one).
      if (activeSessionId === id) {
        if (remaining.length === 0) {
          writeSessionsIndex([]);
          writeActiveSessionId("");
          activeSessionId = "";
          ensureSessionsInitialized();
        } else {
          activeSessionId = remaining[0].id;
          writeActiveSessionId(activeSessionId);
        }
      }

      writeSessionsIndex(remaining);
      syncSessionSelect();
      syncSessionPickerSelect();
      syncMainMenu();
      return true;
    }

    function hasSessionSave(sessionId) {
      const targetSessionId = String(sessionId || "");
      if (!targetSessionId) return false;
      try {
        const raw = localStorage.getItem(getSaveSlotKey(targetSessionId));
        return Boolean(raw && raw.trim());
      } catch (_) {
        return false;
      }
    }

    function getContinueSessionId() {
      const sessions = readSessionsIndex();
      const candidates = sessions.filter((s) => hasSessionSave(s.id));
      if (candidates.length === 0) return "";

      // пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ (updatedAt) пїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅ пїЅпїЅпїЅпїЅпїЅпїЅпїЅпїЅ
      candidates.sort((a, b) => {
        const timeA = new Date(a.updatedAt || 0).getTime();
        const timeB = new Date(b.updatedAt || 0).getTime();
        return (Number.isFinite(timeB) ? timeB : 0) - (Number.isFinite(timeA) ? timeA : 0);
      });

      return candidates[0].id;
    }

    function hasSavedGame() {
      return Boolean(getContinueSessionId());
    }

    function lockScrollForMainMenu() {
      mainMenuScrollY = window.scrollY || 0;
      document.body.classList.add("main-menu-open");
      // Hard lock: prevents wheel/touch scroll from moving the page under the overlay.
      document.body.style.position = "fixed";
      document.body.style.top = `-${mainMenuScrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }

    function unlockScrollForMainMenu() {
      document.body.classList.remove("main-menu-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, mainMenuScrollY || 0);
    }

    function setMainMenuOpen(isOpen) {
      if (!mainMenuEl) return;
      mainMenuEl.classList.toggle("is-hidden", !isOpen);
      if (settingsLauncherEl) {
        settingsLauncherEl.classList.toggle("is-hidden", isOpen);
      }
      if (isOpen) setSettingsPanelOpen(false);
      if (isOpen) lockScrollForMainMenu();
      else unlockScrollForMainMenu();
      syncMainMenu();
    }

    function syncMainMenu() {
      if (!mainMenuEl) return;
      const canContinue = hasSavedGame();
      if (mainMenuContinueBtnEl) {
        mainMenuContinueBtnEl.disabled = !canContinue;
        mainMenuContinueBtnEl.textContent = canContinue ? t("ui.continueGameBtn") : t("ui.continueGameNoSaveBtn");
      }
    }

    function emitGameEvent(name, detail = {}) {
      document.dispatchEvent(new CustomEvent(`game:${name}`, { detail }));
    }

    function isTutorialActive() {
      return Boolean(tutorialManager && tutorialManager.isActive());
    }

    function getFirstCellWithType(type) {
      const cell = state.cells.find((entry) => getCellTypes(entry.number).includes(type));
      return cell ? cell.number : 0;
    }

    function prepareTutorialPlayerForShop(player) {
      if (!player || !isTutorialActive()) return;
      if (player.gold < 160) {
        player.gold = 160;
      }
    }

    function getTutorialForcedRoll(player) {
      if (!player || !isTutorialActive() || player.position !== 1) return 0;
      const shopCell = (CELL_LAYOUT.shop || []).find((cellNumber) => cellNumber > 1 && cellNumber <= 7);
      const target = shopCell || getFirstCellWithType("shop");
      const distance = target - player.position;
      return distance >= 1 && distance <= 6 ? distance : 0;
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
      autosaveDirty = autosaveDirty || Boolean(options.autosave);
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
        measurePerfSection("players", () => {
          renderPlayerSelect();
          renderPlayersMenu();
          renderTurnManager();
        });
        flags.players = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.stats) {
        measurePerfSection("stats", () => {
          renderStats();
        });
        flags.stats = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.selectedTile) {
        measurePerfSection("selectedTile", () => {
          renderSelectedTile();
        });
        flags.selectedTile = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.refreshInventoryOverlay && inventoryOverlayEl.classList.contains("visible")) {
        measurePerfSection("inventory", () => {
          renderInventoryOverlay();
        });
        flags.refreshInventoryOverlay = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.refreshContextMenu) {
        measurePerfSection("contextMenu", () => {
          refreshCurrentContextMenu();
        });
        flags.refreshContextMenu = false;
        if (shouldYield()) {
          requeueRemaining(flags, tokenPositions, tokenActiveIds, shouldAutosave);
          endPerf(perf);
          return;
        }
      }
      if (flags.tokensFull) {
        measurePerfSection("tokens", () => {
          renderTokens({ forceFull: true });
        });
        tokenRenderDone = true;
      } else if (tokenPositions.size > 0 || tokenActiveIds.size > 0) {
        measurePerfSection("tokens", () => {
          renderTokens({
            positions: Array.from(tokenPositions),
            activeIds: Array.from(tokenActiveIds)
          });
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
        measurePerfSection("autosave", () => {
          scheduleAutoSave();
        });
      }
      endPerf(perf);
    }

    function logEvent(text) {
      const message = window.GAME_I18N.translateLogMessage(text, currentLanguage);
      appendLogEntry(text);
      showLogToast(message);
      if (!eventJournalEl.classList.contains("is-hidden")) {
        renderLogWindow();
      } else {
        // Defer rebuilding the log DOM until the panel is opened.
        lastLogRenderedSignature = "";
      }
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
  const nextSignature = [
    boardSize,
    cellPad,
    cellInset,
    cellRadius,
    cellNumFont,
    cellIconFont,
    cellRuneFont,
    cellIconRight,
    cellIconBottom,
    tokenSize,
    tokenFont
  ].join("|");
  if (nextSignature === scaleVarsValueSignature) return;
  scaleVarsValueSignature = nextSignature;

  boardWrapEl.style.setProperty("--board-size", String(boardSize));
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

function rafDebounceSyncScale() {
  if (cellCentersRafId) return;
  cellCentersRafId = requestAnimationFrame(() => {
    cellCentersRafId = null;
    const rect = boardWrapEl.getBoundingClientRect();
    const newSig = `${rect.width.toFixed(0)}|${rect.height.toFixed(0)}|${BOARD_SIZE}`;
    if (newSig === scaleVarsSignature) return;
    scaleVarsSignature = newSig;
    const perfScale = beginPerf('scaleVars');
    syncBoardScaleVars();
    invalidateCellCenterCache();
    endPerf(perfScale);
  });
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
        adrenaline: 0,
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
        shop: [],
        blackMarket: [],
        altar: [],
        fortuneTeller: []
      };
      const typeOrder = ["trap", "shop", "blackMarket", "altar", "fortuneTeller"];
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

    function renderShopMenuItems(mode = "shop") {
      const fragment = document.createDocumentFragment();
      shopItemsListEl.innerHTML = "";
      const isShadowMarket = mode === "blackMarket";
      const blackMarketOnly = new Set(["adrenaline", "trapKit"]);
      SHOP_ITEMS.filter((item) => isShadowMarket || !blackMarketOnly.has(item.id)).forEach((item) => {
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
        fragment.appendChild(slot);
      });
      shopItemsListEl.appendChild(fragment);
      contextInit.shop = true;
      lastShopMenuMode = mode;
    }

    function ensureContextInitialized(mode) {
      if ((mode === "shop" || mode === "blackMarket") && (!contextInit.shop || lastShopMenuMode !== mode)) {
        renderShopMenuItems(mode);
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
        player.adrenaline,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal
      ].join("|");
      const cached = inventorySlotsCache.get(cacheKey);
      if (cached) return cached;
      const itemDefs = [
        { id: "boots", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "boots")), icon: SHOP_ITEM_META.boots.icon, count: player.boots, usable: true, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "boots")) },
        { id: "shields", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "shield")), icon: SHOP_ITEM_META.shield.icon, count: player.shields, usable: false, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "shield")) },
        { id: "luckCharm", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "luckCharm")), icon: SHOP_ITEM_META.luckCharm.icon, count: player.luckCharm, usable: false, desc: t("items.luckCharm.desc") },
        { id: "adrenaline", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "adrenaline")), icon: SHOP_ITEM_META.adrenaline.icon, count: player.adrenaline, usable: false, desc: getShopItemDesc(SHOP_ITEMS.find((item) => item.id === "adrenaline")) },
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
        player.adrenaline,
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
        adrenaline: player.adrenaline,
        trapKit: player.trapKit,
        rerollStone: player.rerollStone,
        alchemyCrystal: player.alchemyCrystal
      };
      const current = byId[itemId] ?? 0;
      if (current > 0) return true;
      return getOccupiedInventorySlots(player) < INVENTORY_SLOT_LIMIT;
    }

    function isAdjacentCell(a, b) {
      return Math.abs(Number(a) - Number(b)) === 1;
    }

    function isSameCell(a, b) {
      return Number(a) === Number(b);
    }

    function getAvatarHueSeed(player) {
      const seed = String(player?.id || player?.name || "");
      let hash = 0;
      for (let i = 0; i < seed.length; i += 1) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash) % 360;
    }

    function getAdjacentPlayersFor(player) {
      if (!player) return [];
      return state.players.filter((entry) => entry.id !== player.id && isSameCell(entry.position, player.position));
    }

    function getTradeSelectionState(playerId) {
      const key = String(playerId || "");
      let stateEntry = tradeSelectionByPlayerId.get(key) || null;
      if (!stateEntry) {
        stateEntry = { giveItems: [], getItems: [] };
        tradeSelectionByPlayerId.set(key, stateEntry);
      }
      if (!Array.isArray(stateEntry.giveItems)) stateEntry.giveItems = [];
      if (!Array.isArray(stateEntry.getItems)) stateEntry.getItems = [];
      return stateEntry;
    }

    function getTradeItemDefs(player) {
      const defs = [
        { prop: "boots", addKey: "boots", shopId: "boots" },
        { prop: "shields", addKey: "shield", shopId: "shield" },
        { prop: "luckCharm", addKey: "luckCharm", shopId: "luckCharm" },
        { prop: "adrenaline", addKey: "adrenaline", shopId: "adrenaline" },
        { prop: "trapKit", addKey: "trapKit", shopId: "trapKit" },
        { prop: "rerollStone", addKey: "rerollStone", shopId: "rerollStone" },
        { prop: "alchemyCrystal", addKey: "alchemyCrystal", shopId: "alchemyCrystal" }
      ];
      return defs
        .filter((item) => Math.max(0, Number(player[item.prop]) || 0) > 0)
        .map((item) => {
          const shopItem = SHOP_ITEMS.find((entry) => entry.id === item.shopId);
          return {
            prop: item.prop,
            addKey: item.addKey,
            count: Math.max(0, Number(player[item.prop]) || 0),
            name: shopItem ? getShopItemName(shopItem) : item.prop,
            icon: SHOP_ITEM_META[item.shopId]?.icon || iconUnknown(),
            desc: shopItem ? getShopItemDesc(shopItem) : item.prop
          };
        });
    }

    function getTradeTransferDef(itemProp) {
      const transferDefs = {
        boots: { addKey: "boots", shopId: "boots" },
        shields: { addKey: "shield", shopId: "shield" },
        luckCharm: { addKey: "luckCharm", shopId: "luckCharm" },
        adrenaline: { addKey: "adrenaline", shopId: "adrenaline" },
        trapKit: { addKey: "trapKit", shopId: "trapKit" },
        rerollStone: { addKey: "rerollStone", shopId: "rerollStone" },
        alchemyCrystal: { addKey: "alchemyCrystal", shopId: "alchemyCrystal" }
      };
      return transferDefs[itemProp] || null;
    }

    function buildTradeInventoryCounts(player) {
      return {
        boots: Number(player.boots) || 0,
        shields: Number(player.shields) || 0,
        luckCharm: Number(player.luckCharm) || 0,
        adrenaline: Number(player.adrenaline) || 0,
        trapKit: Number(player.trapKit) || 0,
        rerollStone: Number(player.rerollStone) || 0,
        alchemyCrystal: Number(player.alchemyCrystal) || 0
      };
    }

    function canResolveTradeInventory(player, giveItems, getItems) {
      const nextCounts = buildTradeInventoryCounts(player);
      const giveUnique = [...new Set((Array.isArray(giveItems) ? giveItems : []).filter(Boolean))];
      const getUnique = [...new Set((Array.isArray(getItems) ? getItems : []).filter(Boolean))];

      giveUnique.forEach((prop) => {
        nextCounts[prop] = (nextCounts[prop] || 0) - 1;
      });
      getUnique.forEach((prop) => {
        nextCounts[prop] = (nextCounts[prop] || 0) + 1;
      });

      const hasNegative = Object.values(nextCounts).some((count) => count < 0);
      if (hasNegative) return false;

      const occupied = Object.values(nextCounts).reduce((acc, count) => acc + (count > 0 ? 1 : 0), 0);
      return occupied <= INVENTORY_SLOT_LIMIT;
    }

    function buildTradeInventoryHtml(items, selectedProps, role) {
      const selectedSet = new Set(Array.isArray(selectedProps) ? selectedProps : []);
      const slots = Array.from({ length: INVENTORY_SLOT_LIMIT }, (_, index) => items[index] || null);
      return slots.map((item) => {
        if (!item) return `<div class="inv-slot trade-inv-slot empty">+</div>`;
        const isSelected = selectedSet.has(item.prop);
        return `
          <div class="inv-slot occupied trade-inv-slot${isSelected ? " selected" : ""}" data-trade-select="${role}" data-trade-item="${item.prop}" data-trade-selected="${isSelected ? "true" : "false"}">
            <span class="item-icon">${item.icon}</span>
            <span class="slot-count">x${item.count}</span>
            <div class="item-tooltip"><b>${item.name}</b><br>${item.desc}</div>
          </div>
        `;
      }).join("");
    }

    function renderTradePanelHtml(player) {
      const neighbors = getAdjacentPlayersFor(player);
      if (neighbors.length === 0) {
        return `
          <div class="trade-panel">
            <div class="effect-desc">${t("ui.tradePanelNoDeal")}</div>
          </div>
        `;
      }

      const currentStored = String(tradeTargetByPlayerId.get(player.id) || "");
      const selectedId = neighbors.some((entry) => entry.id === currentStored) ? currentStored : neighbors[0].id;
      tradeTargetByPlayerId.set(player.id, selectedId);
      const selectedTarget = neighbors.find((entry) => entry.id === selectedId) || neighbors[0];
      const items = getTradeItemDefs(player);
      const targetItems = getTradeItemDefs(selectedTarget);
      const goldMax = Math.max(0, Number(player.gold) || 0);
      const targetGoldMax = Math.max(0, Number(selectedTarget.gold) || 0);
      const tradeSelection = getTradeSelectionState(player.id);
      const neighborsOptions = neighbors.map((entry) => {
        const selected = entry.id === selectedId ? "selected" : "";
        return `<option value="${entry.id}" ${selected}>${entry.name} (tile ${entry.position})</option>`;
      }).join("");
      const targetControlHtml = neighbors.length > 1
        ? `<select id="tradeTargetSelect" data-trade-target-select="true">${neighborsOptions}</select>`
        : ``;

      tradeSelection.giveItems = tradeSelection.giveItems.filter((prop) => items.some((item) => item.prop === prop));
      tradeSelection.getItems = tradeSelection.getItems.filter((prop) => targetItems.some((item) => item.prop === prop));
      const giveInventoryHtml = buildTradeInventoryHtml(items, tradeSelection.giveItems, "give");
      const getInventoryHtml = buildTradeInventoryHtml(targetItems, tradeSelection.getItems, "get");

      return `
          <div class="contract-card trade-panel" data-trade-owner-id="${player.id}" data-trade-target-id="${selectedTarget.id}">
            <div class="trade-seal" data-trade-seal="true">${t("ui.tradeSeal")}</div>
            <div class="header">
              <h2>${t("ui.tradeContractTitle")}</h2>
            </div>
            <div class="footer">
              ${targetControlHtml}
            </div>
            <div class="trade-zones">
              <div class="zone">
                <h3>${t("ui.tradePlayerGives", { name: player.name })}</h3>
                <div class="trade-player-gold">${formatGold(player.gold)}</div>
                <div class="item-slot trade-item-slot">
                  <div class="trade-inventory-slots">${giveInventoryHtml}</div>
                </div>
                <div class="gold-row">
                  <span class="gold-mark">\uD83D\uDCB0</span>
                  <input type="number" class="gold-input" min="0" max="${goldMax}" value="0" data-trade-give-gold="true" ${goldMax < 1 ? "disabled" : ""}>
                </div>
              </div>
              <div class="divider">\u21C4</div>
              <div class="zone">
                <h3>${t("ui.tradePlayerGives", { name: selectedTarget.name })}</h3>
                <div class="trade-player-gold">${formatGold(selectedTarget.gold)}</div>
                <div class="item-slot trade-item-slot">
                  <div class="trade-inventory-slots">${getInventoryHtml}</div>
                </div>
                <div class="gold-row">
                  <span class="gold-mark">\uD83D\uDCB0</span>
                  <input type="number" class="gold-input" min="0" max="${targetGoldMax}" value="0" data-trade-get-gold="true" ${targetGoldMax < 1 ? "disabled" : ""}>
                </div>
              </div>
            </div>
            <div class="footer">
              <button class="btn-sign" data-trade-submit="true">${t("ui.tradeSealBtn")}</button>
            </div>
          </div>
      `;
    }

    function getTradeDraftFromDom(rootEl) {
      if (!rootEl) return null;
      const tradePanelEl = rootEl.querySelector("[data-trade-owner-id]");
      const targetSelect = rootEl.querySelector("[data-trade-target-select]");
      const giveGoldEl = rootEl.querySelector("[data-trade-give-gold]");
      const getGoldEl = rootEl.querySelector("[data-trade-get-gold]");
      return {
        targetId: String(targetSelect?.value || tradePanelEl?.dataset.tradeTargetId || ""),
        giveItems: Array.from(rootEl.querySelectorAll('[data-trade-select="give"][data-trade-selected="true"]'))
          .map((el) => String(el.dataset.tradeItem || ""))
          .filter(Boolean)
          .sort(),
        getItems: Array.from(rootEl.querySelectorAll('[data-trade-select="get"][data-trade-selected="true"]'))
          .map((el) => String(el.dataset.tradeItem || ""))
          .filter(Boolean)
          .sort(),
        giveGold: Math.max(0, Math.trunc(Number(giveGoldEl?.value || 0))),
        getGold: Math.max(0, Math.trunc(Number(getGoldEl?.value || 0)))
      };
    }

    function isTradeDraftIdentical(draft) {
      if (!draft) return true;
      return draft.giveGold === draft.getGold
        && draft.giveItems.length === draft.getItems.length
        && draft.giveItems.every((item, index) => item === draft.getItems[index]);
    }

    function isTradeDraftEmpty(draft) {
      if (!draft) return true;
      return draft.giveGold < 1
        && draft.getGold < 1
        && draft.giveItems.length === 0
        && draft.getItems.length === 0;
    }

    function syncTradeSubmitState() {
      if (!tradeBodyEl) return;
      const submitBtn = tradeBodyEl.querySelector("[data-trade-submit]");
      if (!submitBtn) return;
      const draft = getTradeDraftFromDom(tradeBodyEl);
      const disabled = !draft?.targetId || isTradeDraftEmpty(draft) || isTradeDraftIdentical(draft);
      submitBtn.disabled = disabled;
      if (isTradeDraftEmpty(draft)) {
        submitBtn.title = t("ui.tradeSubmitNeedOffer");
      } else if (isTradeDraftIdentical(draft)) {
        submitBtn.title = t("ui.tradeSubmitSameOffer");
      } else {
        submitBtn.removeAttribute("title");
      }
    }

    function applyUnifiedTrade(owner, target, deal) {
      if (!owner || !target || !deal) return false;
      if (!isSameCell(owner.position, target.position)) {
        logEvent(`Trade denied: ${owner.name} and ${target.name} must be on the same tile.`);
        return false;
      }

      const giveGold = Math.max(0, Math.trunc(Number(deal.giveGold) || 0));
      const getGold = Math.max(0, Math.trunc(Number(deal.getGold) || 0));
      const giveItems = [...new Set((Array.isArray(deal.giveItems) ? deal.giveItems : []).map((item) => String(item || "")).filter(Boolean))];
      const getItems = [...new Set((Array.isArray(deal.getItems) ? deal.getItems : []).map((item) => String(item || "")).filter(Boolean))];
      if (!giveItems.length && !getItems.length && giveGold < 1 && getGold < 1) return false;
      if (!canResolveTradeInventory(owner, giveItems, getItems)) return false;
      if (!canResolveTradeInventory(target, getItems, giveItems)) return false;
      if (owner.gold < giveGold) return false;
      if (target.gold < getGold) return false;

      pushHistory(`Trade deal: ${owner.name} <-> ${target.name}`);
      giveItems.forEach((itemProp) => {
        owner[itemProp] -= 1;
        target[itemProp] += 1;
      });
      getItems.forEach((itemProp) => {
        target[itemProp] -= 1;
        owner[itemProp] += 1;
      });
      if (giveGold > 0) {
        owner.gold -= giveGold;
        target.gold += giveGold;
      }
      if (getGold > 0) {
        target.gold -= getGold;
        owner.gold += getGold;
      }

      markPlayerDirty(owner.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      markPlayerDirty(target.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      const giveGoldLabel = giveGold > 0 ? ` + ${formatGold(giveGold)}` : "";
      const getGoldLabel = getGold > 0 ? ` + ${formatGold(getGold)}` : "";
      const giveItemsLabel = giveItems.length ? giveItems.join(", ") : (giveGold > 0 ? "gold" : "nothing");
      const getItemsLabel = getItems.length ? getItems.join(", ") : (getGold > 0 ? "gold" : "nothing");
      logEvent(`Trade: ${owner.name} gives ${giveItemsLabel}${giveGoldLabel}, gets ${getItemsLabel}${getGoldLabel}.`);
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [owner.id, target.id] });
      return true;
    }
    function applyGoldTrade(fromPlayer, toPlayer, amountRaw) {
      const amount = Math.max(1, Math.trunc(Number(amountRaw) || 0));
      if (!amount) return;
      if (!isSameCell(fromPlayer.position, toPlayer.position)) {
        logEvent(`РћР±РјРµРЅ РѕС‚РєР»РѕРЅС‘РЅ: ${fromPlayer.name} Рё ${toPlayer.name} РґРѕР»Р¶РЅС‹ СЃС‚РѕСЏС‚СЊ РЅР° РѕРґРЅРѕР№ РєР»РµС‚РєРµ.`);
        return;
      }
      if ((fromPlayer.gold || 0) < amount) {
        logEvent(`РћР±РјРµРЅ РѕС‚РєР»РѕРЅС‘РЅ: Сѓ ${fromPlayer.name} РЅРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ Р·РѕР»РѕС‚Р°.`);
        return;
      }
      pushHistory(`Trade gold: ${fromPlayer.name} -> ${toPlayer.name}`);
      fromPlayer.gold -= amount;
      toPlayer.gold += amount;
      markPlayerDirty(fromPlayer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      markPlayerDirty(toPlayer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      logEvent(`РўРѕСЂРіРѕРІР»СЏ: ${fromPlayer.name} РїРµСЂРµРґР°С‘С‚ ${toPlayer.name} ${formatGold(amount)}.`);
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [fromPlayer.id, toPlayer.id] });
    }

    function applyItemTrade(fromPlayer, toPlayer, itemProp) {
      const def = getTradeTransferDef(itemProp);
      if (!def) return;
      if (!isSameCell(fromPlayer.position, toPlayer.position)) {
        logEvent(`РћР±РјРµРЅ РѕС‚РєР»РѕРЅС‘РЅ: ${fromPlayer.name} Рё ${toPlayer.name} РґРѕР»Р¶РЅС‹ СЃС‚РѕСЏС‚СЊ РЅР° РѕРґРЅРѕР№ РєР»РµС‚РєРµ.`);
        return;
      }
      if ((fromPlayer[itemProp] || 0) < 1) {
        logEvent(`РћР±РјРµРЅ РѕС‚РєР»РѕРЅС‘РЅ: Сѓ ${fromPlayer.name} РЅРµС‚ РЅСѓР¶РЅРѕРіРѕ РїСЂРµРґРјРµС‚Р°.`);
        return;
      }
      if (!canAddItemType(toPlayer, def.addKey)) {
        logEvent(`РћР±РјРµРЅ РѕС‚РєР»РѕРЅС‘РЅ: Сѓ ${toPlayer.name} РЅРµС‚ СЃРІРѕР±РѕРґРЅРѕРіРѕ СЃР»РѕС‚Р° РґР»СЏ РЅРѕРІРѕРіРѕ С‚РёРїР° РїСЂРµРґРјРµС‚Р°.`);
        return;
      }
      const shopItem = SHOP_ITEMS.find((entry) => entry.id === def.shopId);
      const itemLabel = shopItem ? getShopItemName(shopItem) : itemProp;
      pushHistory(`Trade item: ${fromPlayer.name} -> ${toPlayer.name}`);
      fromPlayer[itemProp] -= 1;
      toPlayer[itemProp] += 1;
      markPlayerDirty(fromPlayer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      markPlayerDirty(toPlayer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      logEvent(`РўРѕСЂРіРѕРІР»СЏ: ${fromPlayer.name} РїРµСЂРµРґР°С‘С‚ ${toPlayer.name} РїСЂРµРґРјРµС‚ "${itemLabel}".`);
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [fromPlayer.id, toPlayer.id] });
    }

    function applyGoldForItemTrade(buyer, seller, itemProp, priceRaw) {
      const def = getTradeTransferDef(itemProp);
      if (!def) return;
      const price = Math.max(1, Math.trunc(Number(priceRaw) || 0));
      if (!isSameCell(buyer.position, seller.position)) {
        logEvent(`Trade denied: ${buyer.name} and ${seller.name} must be on the same tile.`);
        return;
      }
      if ((buyer.gold || 0) < price) {
        logEvent(`Trade denied: ${buyer.name} does not have enough gold.`);
        return;
      }
      if ((seller[itemProp] || 0) < 1) {
        logEvent(`Trade denied: ${seller.name} does not have the selected item.`);
        return;
      }
      if (!canAddItemType(buyer, def.addKey)) {
        logEvent(`Trade denied: ${buyer.name} has no free inventory slot for a new item type.`);
        return;
      }
      const shopItem = SHOP_ITEMS.find((entry) => entry.id === def.shopId);
      const itemLabel = shopItem ? getShopItemName(shopItem) : itemProp;
      pushHistory(`Trade deal: ${buyer.name} buys ${itemLabel} from ${seller.name}`);
      buyer.gold -= price;
      seller.gold += price;
      seller[itemProp] -= 1;
      buyer[itemProp] += 1;
      markPlayerDirty(buyer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      markPlayerDirty(seller.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      logEvent(`Trade deal: ${buyer.name} pays ${formatGold(price)} to ${seller.name} for "${itemLabel}".`);
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [buyer.id, seller.id] });
    }

    function renderShopPlayerInventory() {
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) {
        shopPlayerMetaEl.textContent = "";
        shopPlayerInventoryEl.innerHTML = Array.from({ length: 4 }, () => `<div class="inv-slot">+</div>`).join("");
        return;
      }

      shopPlayerMetaEl.innerHTML = `
        <span id="shopBuyerHp" class="player-gold">${formatHp(player.hp)}</span>
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

    function getLuckTalismanBonus(player) {
      // Passive: each talisman slightly reduces odds of bad random outcomes.
      const count = Math.max(0, Number(player?.luckCharm) || 0);
      return clamp(count * 0.05, 0, 0.15);
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
      const cellTypeChoices = ["shop", "blackMarket", "altar", "fortuneTeller"];
      const itemChoices = [
        { key: "boots", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "boots")) },
        { key: "shields", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "shield")) },
        { key: "luckCharm", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "luckCharm")) },
        { key: "adrenaline", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "adrenaline")) },
        { key: "trapKit", label: getShopItemName(SHOP_ITEMS.find((item) => item.id === "trapKit")) }
      ];
      const omenGoodChance = clamp(Number(CHANCES.fortune.omenGoodChance) + getLuckTalismanBonus(player), 0, 0.95);
      const omenType = Math.random() < omenGoodChance ? "good" : "bad";
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
      if (quest?.omenType === "bad") {
        const maxGoldLoss = Math.max(15, Math.round(REWARDS.fortuneGoldReward * 0.5));
        const maxHpDamage = Math.max(6, Math.round((player.maxHp || PLAYER_MAX_HP || 100) * 0.1));
        const result = FortuneActions.applyFortunePenaltyState({
          player,
          roll: Math.random(),
          maxGoldLoss,
          maxHpDamage
        });
        if (!result.ok) return;

        updatePlayerInState(player.id, result.player);
        if (result.penalty === "gold") {
          logEvent(t("ui.prophecyBadGold", { name: player.name, loss: formatGold(result.goldLoss) }));
          return;
        }

        logEvent(t("ui.prophecyBadHp", { name: player.name, damage: result.hpDamage, before: result.hpBefore, after: result.hpAfter }));
        if ((result.player.hp || 0) <= 0) {
          eliminatePlayerFromGame(result.player, "prophecy drained their life");
        }
        return;
      }

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
      if (tileContextMode === "blackMarket") metaEl = shopPlayerMetaEl;
      if (tileContextMode === "altar") metaEl = altarPlayerMetaEl;
      const goldEls = metaEl ? metaEl.querySelectorAll(".player-gold") : [];
      const goldEl = goldEls.length > 1 ? goldEls[goldEls.length - 1] : goldEls[0] || null;
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
        ad: player.adrenaline,
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
        adrenaline: Number(raw.ad) || 0,
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

    function saveGameState(silent = false, force = false, sessionId = "") {
      const perf = beginPerf("autosave.write");
      if (!force && !autosaveDirty) {
        endPerf(perf);
        return;
      }
      if (!activeSessionId) ensureSessionsInitialized();
      const targetSessionId = String(sessionId || activeSessionId || "");
      if (!targetSessionId) {
        endPerf(perf);
        return;
      }
      const snapshot = packSnapshot(buildSaveSnapshot());
      const snapshotJson = JSON.stringify(snapshot);
      if (snapshotJson === lastSavedSnapshotJson) {
        autosaveDirty = false;
        endPerf(perf);
        return;
      }
      localStorage.setItem(getSaveSlotKey(targetSessionId), snapshotJson);
      // Update session metadata.
      const sessions = readSessionsIndex();
      const updated = sessions.map((s) => s.id === targetSessionId ? { ...s, updatedAt: nowIso(), finished: state.gameEnded } : s);
      writeSessionsIndex(updated);
      syncSessionSelect();
      syncMainMenu();
      lastSavedSnapshotJson = snapshotJson;
      autosaveDirty = false;
      endPerf(perf);
      if (!silent) logEvent(t("ui.gameSaved"));
    }

    function scheduleAutoSave() {
      const perf = beginPerf("autosave.schedule");
      clearTimeout(autosaveTimer);
      cancelIdle();
      autosaveTimer = setTimeout(() => {
        requestIdle(() => saveGameState(true, false));
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

    function loadGameState(silent = false, sessionId = "") {
      if (!activeSessionId) ensureSessionsInitialized();
      const targetSessionId = String(sessionId || activeSessionId || "");
      if (!targetSessionId) {
        if (!silent) logEvent(t("ui.saveNotFound"));
        return false;
      }
      const raw = localStorage.getItem(getSaveSlotKey(targetSessionId));
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
        adrenaline: Math.max(0, Number(player.adrenaline) || 0),
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
      setActiveSession(targetSessionId);
      if (state.gameEnded) openVictoryOverlay();
      if (!silent) logEvent(t("ui.saveLoaded"));
      return true;
    }

    function startNewGameWithSamePlayers() {
      clearTimeout(autosaveTimer);
      cancelIdle();
      if (!activeSessionId) ensureSessionsInitialized();
      if (activeSessionId) {
        try {
          localStorage.removeItem(getSaveSlotKey(activeSessionId));
        } catch (_) {
          // ignore
        }
      }
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
      if (!suppressTutorialAutostartOnce && tutorialManager && window.TutorialManager && !window.TutorialManager.wasSeen()) {
        window.setTimeout(() => tutorialManager.start({ force: true }), 250);
      }
      suppressTutorialAutostartOnce = false;
    }

    function resetGameWithConfirm() {
      const useFullReset = false;
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
      // Wipe all sessions & saves.
      const sessions = readSessionsIndex();
      sessions.forEach((session) => {
        try {
          localStorage.removeItem(getSaveSlotKey(session.id));
        } catch (_) {
          // ignore
        }
      });
      try {
        localStorage.removeItem(SESSIONS_INDEX_KEY);
        localStorage.removeItem(ACTIVE_SESSION_KEY);
        localStorage.removeItem(SAVE_KEY);
      } catch (_) {
        // ignore
      }
      activeSessionId = "";
      ensureSessionsInitialized();
      syncSessionSelect();
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
      if (!suppressTutorialAutostartOnce && tutorialManager && window.TutorialManager && !window.TutorialManager.wasSeen()) {
        window.setTimeout(() => tutorialManager.start({ force: true }), 250);
      }
      suppressTutorialAutostartOnce = false;
    }

    function startBlankRunInActiveSession() {
      clearTimeout(autosaveTimer);
      cancelIdle();
      if (!activeSessionId) ensureSessionsInitialized();
      if (activeSessionId) {
        try {
          localStorage.removeItem(getSaveSlotKey(activeSessionId));
        } catch (_) {
          // ignore
        }
      }
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
      syncMainMenu();
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
      const shops = new Set(layout.shop || []);
      const blackMarkets = new Set(layout.blackMarket || []);
      const altars = new Set(layout.altar || []);
      const fortuneTellers = new Set(layout.fortuneTeller || []);

      state.cells = Array.from({ length: LAST_CELL }, (_, i) => {
        const number = i + 1;
        const types = [];
        if (number === LAST_CELL) types.push("finish");
        if (traps.has(number)) types.push("trap");
        if (shops.has(number)) types.push("shop");
        if (blackMarkets.has(number)) types.push("blackMarket");
        if (altars.has(number)) types.push("altar");
        if (fortuneTellers.has(number)) types.push("fortuneTeller");
        return { number, types };
      });
    }

    function normalizeCellTypes(rawTypes, number = 1) {
      const allowed = new Set(["trap", "shop", "blackMarket", "altar", "fortuneTeller", "lottery", "finish"]);
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
  rafDebounceSyncScale();
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
          sectionEl: shopContextSectionEl,
          refresh: () => {
            const buyer = renderContextPlayerSelect("blackMarket", t("emptySelect.blackMarket"));
            const canBuyHere = Boolean(buyer);
            shopItemsListEl.querySelectorAll("[data-shop-item-id]").forEach((el) => {
              el.classList.toggle("disabled", !canBuyHere || state.rolling);
            });
            renderShopPlayerInventory();
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
        player.adrenaline,
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
      emitGameEvent("context-opened", { mode, cellNumber });
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
      return (CELL_TYPE_META[type] || CELL_TYPE_META.normal || {}).icon || "вЂў";
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
      const baseProfitChanceMax = Number(CHANCES.blackMarket.profitMax);
      const baseLossChanceMax = Number(CHANCES.blackMarket.lossMax);
      const luckBonus = getLuckTalismanBonus(player);
      const profitChanceMax = clamp(baseProfitChanceMax + luckBonus, 0, 0.95);
      const lossChanceMax = clamp(Math.max(profitChanceMax, baseLossChanceMax - luckBonus), 0, 1);
      const result = FortuneActions.applyBlackMarketState({
        player,
        fee,
        roll: Math.random(),
        profitChanceMax,
        lossChanceMax,
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

    function renderTradeOverlay() {
      if (!tradeBodyEl) return;
      const player = selectedPlayer();
      if (!player) {
        tradeBodyEl.innerHTML = `<div class="effect-desc">${t("ui.tradeSelectPlayerPrompt")}</div>`;
        return;
      }
      tradeBodyEl.innerHTML = renderTradePanelHtml(player);
      syncTradeSubmitState();
    }

    function closeTradeOverlay() {
      if (!tradeOverlayEl) return;
      tradeOverlayEl.classList.remove("visible");
    }

    function openTradeOverlay() {
      if (!tradeOverlayEl) return;
      renderTradeOverlay();
      tradeOverlayEl.classList.add("visible");
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
      victoryNewGameBtnEl?.focus();
    }

    function openInventoryOverlay(playerId) {
      inventoryOverlayEl.dataset.playerId = playerId;
      renderInventoryOverlay();
      inventoryOverlayEl.classList.add("visible");
      emitGameEvent("inventory-opened", { playerId });
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
        player.adrenaline,
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
        // Luck talisman is passive.
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
      const perf = beginPerf("render.playersMenu");
      try {
        if (state.players.length === 0) {
          if (playersListEl.children.length > 0 || playersListEl.querySelector(".players-empty")) {
            playersListEl.innerHTML = `<div class="players-empty">${t("ui.playersEmpty")}</div>`;
          }
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
              <button class="players-remove" data-remove-player-id="${player.id}" title="${removeTitle}" aria-label="${removeTitle}">\u00D7</button>
            `;
          }

          rowEl._selectBtnEl = rowEl._selectBtnEl || rowEl.querySelector("[data-player-id]");
          rowEl._removeBtnEl = rowEl._removeBtnEl || rowEl.querySelector("[data-remove-player-id]");
          const selectBtnEl = rowEl._selectBtnEl;
          const removeBtnEl = rowEl._removeBtnEl;
          const classes = [
            "players-list-item",
            player.id === activeTurnPlayerId ? "active-turn" : "",
            player.id === state.selectedPlayerId ? "selected-player" : ""
          ].filter(Boolean).join(" ");

          selectBtnEl.className = classes;
          selectBtnEl.dataset.playerId = player.id;
          const avatarInitial = (player.name || "?").trim().charAt(0).toUpperCase() || "?";
          const avatarHue = getAvatarHueSeed(player);
          const avatarHtml = player.avatar
            ? `<img class="player-avatar" src="${player.avatar}" alt="avatar" onerror="this.onerror=null;this.style.display='none';this.insertAdjacentHTML('afterend','<span class=&quot;player-avatar-fallback&quot; style=&quot;--avatar-hue:${avatarHue};&quot;>${avatarInitial}</span>');">`
            : `<span class="player-avatar-fallback" style="--avatar-hue:${avatarHue};">${avatarInitial}</span>`;
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
      } finally {
        endPerf(perf);
      }
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
      const cacheKey = [
        currentLanguage,
        player.id,
        player.bootsActive ? 1 : 0,
        player.fortuneQuest ? JSON.stringify(player.fortuneQuest) : ""
      ].join("|");
      const cached = effectsPanelCache.get(cacheKey);
      if (cached) return cached;
      const effects = [];
      if (player.fortuneQuest) {
        const toneClass = player.fortuneQuest.omenType === "bad" ? "bad-event" : "good-event";
        const toneBadgeClass = player.fortuneQuest.omenType === "bad" ? "bad" : "good";
        const toneLabel = player.fortuneQuest.omenType === "bad"
          ? t("ui.omenBad")
          : player.fortuneQuest.omenType === "good"
            ? t("ui.omenGood")
            : (player.fortuneQuest.omenLabel || t("ui.eventLabel"));
        effects.push(`
          <div class="effect-item ${toneClass}">
            <div class="effect-name">${t("ui.prophecyTitle")} ${getCellTypeIcon("fortuneTeller")}</div>
            <div class="effect-tone ${toneBadgeClass}">${toneLabel}</div>
            <div class="effect-desc"><strong>${t("ui.prophecyActive")}</strong> ${getFortuneQuestConditionText(player.fortuneQuest)}</div>
            <div class="effect-desc"><strong>${t("ui.prophecyHint")}</strong> <span class="hint-blur">${getFortuneQuestDebugConditionText(player.fortuneQuest)}</span></div>
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
      const html = `
        <div class="effects-panel">
          <div class="effects-title">${t("ui.activeEffectsTitle")}</div>
          ${body}
        </div>
      `;
      effectsPanelCache.set(cacheKey, html);
      if (effectsPanelCache.size > MAX_EFFECTS_CACHE) {
        const firstKey = effectsPanelCache.keys().next().value;
        effectsPanelCache.delete(firstKey);
      }
      return html;
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
        player.adrenaline,
        player.trapKit,
        player.rerollStone,
        player.alchemyCrystal,
        player.bootsActive ? 1 : 0,
        player.fortuneQuest ? JSON.stringify(player.fortuneQuest) : "",
        state.players.map((entry) => `${entry.id}:${entry.position}:${entry.gold}`).join(";"),
        String(tradeTargetByPlayerId.get(player.id) || ""),
        state.rolling ? 1 : 0
      ].join("|");
      if (signature === lastStatsSignature) {
        rollBtnEl.disabled = state.rolling || state.gameEnded || isPlayerFinished(player);
        return;
      }
      const { slotsHtml } = buildInventorySlotsHtml(player, { includeUseActions: true });
      const effectsHtml = buildEffectsPanelHtml(player);
      const canOpenTrade = getAdjacentPlayersFor(player).length > 0;
      const tradeOpenTitle = canOpenTrade ? t("ui.tradeOpenTitle") : t("ui.tradeUnavailableTitle");
      playerStatsEl.innerHTML = `
        <div class="player-header">
          <span class="player-name">${player.name}</span>
          <button class="trade-open-btn" data-open-trade="true" type="button" title="${tradeOpenTitle}" ${canOpenTrade ? "" : "disabled"}>\u21C4</button>
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
      if (tradeOverlayEl && tradeOverlayEl.classList.contains("visible")) {
        renderTradeOverlay();
      }
    }

    function ensureToken(player) {
      let token = tokenElsById.get(player.id) || null;
      if (!token) {
        token = document.createElement("div");
        const imgEl = document.createElement("img");
        const labelEl = document.createElement("span");
        token.className = "token";
        token.dataset.token = player.id;
        imgEl.className = "token-avatar";
        imgEl.alt = "avatar";
        imgEl.onerror = function onTokenAvatarError() {
          this.onerror = null;
          token.classList.add("no-avatar");
        };
        labelEl.className = "token-label";
        token.appendChild(imgEl);
        token.appendChild(labelEl);
        token._imgEl = imgEl;
        token._labelEl = labelEl;
        token.addEventListener("click", (event) => {
          event.stopPropagation();
          if (state.rolling) return;
          openInventoryOverlay(player.id);
        });
        tokensLayerEl.appendChild(token);
        tokenElsById.set(player.id, token);
      }
      const hasAvatar = Boolean(String(player.avatar || "").trim());
      const avatarHue = getAvatarHueSeed(player);
      token.classList.toggle("no-avatar", !hasAvatar);
      token.style.setProperty("--avatar-hue", String(avatarHue));
      if (token._imgEl && hasAvatar && token._imgEl.src !== player.avatar) {
        token._imgEl.src = player.avatar;
      }
      if (token._labelEl) {
        const nextLabel = player.name.charAt(0).toUpperCase();
        if (token._labelEl.textContent !== nextLabel) {
          token._labelEl.textContent = nextLabel;
        }
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
      const stackMetaByPlayerId = new Map();
      groups.forEach((stack, position) => {
        const sampleToken = ensureToken(stack[0]);
        const tokenSizePx = sampleToken.offsetWidth || 24;
        stackOffsetsByCell.set(position, buildTokenOffsetsForStack(stack.length, tokenSizePx, cellSizePx));
        stack.forEach((stackPlayer, index) => {
          stackMetaByPlayerId.set(stackPlayer.id, index);
        });
      });

      state.players.forEach((player) => {
        if (!forceFull && positionSet && !positionSet.has(player.position)) return;
        const token = ensureToken(player);
        const stackIndex = stackMetaByPlayerId.get(player.id) ?? 0;
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

      prepareTutorialPlayerForShop(result.player);
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
      emitGameEvent("player-added", { playerId: result.player.id });
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

    function openTutorialContextForSelectedPlayer(mode = "shop") {
      const player = selectedPlayer();
      if (!player) return;
      const targetMode = mode || "shop";
      const configs = getContextModeConfigs();
      const config = configs[targetMode];
      if (!config) return;

      let cellNumber = player.position;
      if (!hasCellType(cellNumber, config.cellType)) {
        cellNumber = getFirstCellWithType(config.cellType);
        if (!cellNumber) return;
        const from = player.position;
        player.position = cellNumber;
        markPlayerDirty(player.id, {
          row: true,
          stats: true,
          context: true,
          inventoryOverlay: true,
          posFrom: from,
          posTo: cellNumber
        });
      }

      prepareTutorialPlayerForShop(player);
      state.selectedCell = cellNumber;
      renderSelectedTile();
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });
      openContextMenu(targetMode, cellNumber);
    }

    function setupTutorial() {
      if (!window.TutorialManager) return;
      tutorialManager = new window.TutorialManager({
        api: {
          openContextForSelectedPlayer: openTutorialContextForSelectedPlayer,
          closeContext: hideTileContextMenu,
          closeInventory: closeInventoryOverlay
        }
      });
    }

    // Tutorial starts on "New game" flow (see reset handlers).

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function movePlayerAnimated(player, targetCell) {
      const start = player.position;
      if (start === targetCell) return;
      const direction = targetCell > start ? 1 : -1;
      const distance = Math.abs(targetCell - start);
      // Keep movement smooth for short hops but reduce the number of renders for long moves.
      const step = Math.max(1, Math.ceil(distance / 18));
      const stepDelay = clamp(170 - Math.min(distance, 20) * 4, 50, 170);
      for (let pos = start + direction; direction > 0 ? pos <= targetCell : pos >= targetCell; pos += direction * step) {
        const previousPos = player.position;
        const nextPos = direction > 0 ? Math.min(pos, targetCell) : Math.max(pos, targetCell);
        player.position = nextPos;
        queueRender({}, {
          tokenPositions: [previousPos, nextPos],
          tokenActiveIds: [player.id]
        });
        await sleep(stepDelay);
      }
      if (player.position !== targetCell) {
        const lastPos = player.position;
        player.position = targetCell;
        queueRender({}, { tokenPositions: [lastPos, targetCell], tokenActiveIds: [player.id] });
      }
    }

    function eliminatePlayerFromGame(player, reasonText) {
      if ((player?.hp || 0) <= 0 && (player?.adrenaline || 0) > 0) {
        player.adrenaline -= 1;
        player.hp = 1;
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
        logEvent(t("ui.adrenalineTriggered", { name: player.name }));
        return false;
      }

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
              if (eliminatePlayerFromGame(player, "health dropped to 0")) {
                return { eliminated: true };
              }
            }
          }
        }

        if (moved) continue;

        if (types.includes("shop")) {
          logEvent(`${player.name} enters the ${getCellTypeLabel("shop")} ${getCellTypeIcon("shop")}.`);
        }
        if (types.includes("blackMarket")) {
          logEvent(t("ui.enterBlackMarket", { name: player.name, icon: getCellTypeIcon("blackMarket") }));
        }
        if (types.includes("altar")) {
          logEvent(`${player.name} approaches the Blood altar ${getCellTypeIcon("altar")}.`);
        }
        if (types.includes("fortuneTeller")) {
          logEvent(`${player.name} enters the Oracle circle ${getCellTypeIcon("fortuneTeller")}.`);
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

      const dice = getTutorialForcedRoll(player) || (Math.floor(Math.random() * 6) + 1);
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
      if (isTutorialActive() && actingPlayerAlive) {
        prepareTutorialPlayerForShop(player);
        markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      }
      queueRenderFromDirty({
        autosave: true,
        selectedTile: true,
        tokenActiveIds: [state.selectedPlayerId, player.id]
      });
      emitGameEvent("roll-finished", { playerId: player.id, position: player.position });
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

    async function moveSelectedPlayerToChosenTile(options = {}) {
      const player = selectedPlayer();
      if (!player || state.rolling || state.gameEnded || isPlayerFinished(player)) return;
      const instant = Boolean(options.instant);
      pushHistory("Move to selected tile");
      state.rolling = true;
      renderStats();
      renderTurnManager();
      renderSelectedTile();

      const to = clamp(state.selectedCell, 1, LAST_CELL);
      const from = player.position;
      logEvent(`Keeper moves ${player.name} to tile ${to} (${from} -> ${to}).`);
      if (instant) {
        const previousPos = player.position;
        player.position = to;
        queueRender({}, { tokenPositions: [previousPos, to], tokenActiveIds: [player.id] });
      } else {
        await movePlayerAnimated(player, to);
      }
      await resolveCellEffects(player);

      state.rolling = false;
      markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true, posFrom: from, posTo: player.position });
      queueRenderFromDirty({ autosave: true, selectedTile: true, tokenActiveIds: [player.id] });
    }

    async function applyShopAction(action) {
      if (state.gameEnded) return;
      if (state.rolling) return;
      const sourceEl = tileContextMenuEl.querySelector(`[data-shop-item-id="${action}"]`);
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      const isShadowMarket = tileContextMode === "blackMarket";
      const marketCellType = isShadowMarket ? "blackMarket" : "shop";
      const marketLabel = getCellTypeLabel(marketCellType);
      const marketIcon = getCellTypeIcon(marketCellType);
      if (!player) {
        logEvent(`Purchase unavailable: no selected player is on the ${marketLabel} tile.`);
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }
      if (!hasCellType(player.position, marketCellType)) {
        logEvent(`Purchase denied: ${player.name} must stand on the ${marketLabel} tile ${marketIcon}.`);
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }

      const item = SHOP_ITEMS.find((entry) => entry.id === action);
      if (!item) {
        return;
      }
      const playerProp = SHOP_ITEM_TO_PROP[action];
      if (!playerProp) return;
      if (!isShadowMarket && (action === "adrenaline" || action === "trapKit")) {
        logEvent(t("ui.shopItemBlackMarketOnly", { shop: getCellTypeLabel("shop"), cell: player.position, item: getShopItemName(item) }));
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }

      if (!canAddItemType(player, action)) {
        logEvent(`Inventory full: ${player.name} has all ${INVENTORY_SLOT_LIMIT} slots occupied (a free slot is needed for a new item type).`);
        UIEffects.pulseClass(sourceEl, "shake", 400);
        return;
      }

      if (player.gold < item.price) {
        if (isShadowMarket) {
          logEvent(t("ui.blackMarketNotEnoughGold", { cell: player.position, name: player.name, item: getShopItemName(item), price: formatGold(item.price) }));
        } else {
          logEvent(`${marketLabel} (tile ${player.position}): ${player.name} lacks gold to buy "${getShopItemName(item)}" (${formatGold(item.price)}).`);
        }
        UIEffects.pulseClass(sourceEl, "shake", 400);
        const goldEl = document.getElementById("shopBuyerGold");
        UIEffects.pulseClass(goldEl, "shake", 400);
        queueRender({ refreshContextMenu: true, refreshInventoryOverlay: true });
        return;
      }

      if (!isShadowMarket) {
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
          logEvent(t("ui.shopBuyAlchemyCrystal", {
            shop: getCellTypeLabel("shop"),
            cell: player.position,
            name: player.name,
            item: getShopItemName(item),
            price: formatGold(item.price),
            bonus: formatGold(REWARDS.alchemyCrystalPurchaseBonusGold)
          }));
        } else {
          logEvent(t("ui.shopBuy", {
            shop: getCellTypeLabel("shop"),
            cell: player.position,
            name: player.name,
            item: getShopItemName(item),
            price: formatGold(item.price)
          }));
        }

        queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });
        emitGameEvent("item-bought", { playerId: player.id, itemId: action, market: "shop" });

        // After rerender, highlight the buyer inventory slot that corresponds to this item.
        setTimeout(() => {
          const inventorySlotId = action === "shield" ? "shields" : action;
          const slot = shopPlayerInventoryEl.querySelector(`[data-inv-item-id="${inventorySlotId}"]`);
          if (!slot) return;
          UIEffects.pulseClass(slot, "inv-drop", 500);
        }, 0);
        return;
      }

      pushHistory(`Buy at shadow market: ${getShopItemName(item)}`);
      state.rolling = true;
      renderStats();
      renderTurnManager();
      refreshCurrentContextMenu(true);

      player.gold -= item.price;
      UIEffects.pulseClass(sourceEl, "slot-flash", 400);
      const goldEl = document.getElementById("shopBuyerGold");
      UIEffects.popGoldAtElement(goldEl, -item.price);

      const successChance = Math.min(1, Math.max(0, Number(CHANCES.blackMarket?.profitMax ?? 0.45)));
      const luckBonus = getLuckTalismanBonus(player);
      const adjustedSuccessChance = Math.min(0.95, successChance + luckBonus);
      const failSlice = (1 - adjustedSuccessChance) / 4;
      const roll = Math.random();
      let granted = false;

      if (roll < adjustedSuccessChance) {
        player[playerProp] = (player[playerProp] || 0) + 1;
        granted = true;
        if (action === "alchemyCrystal") {
          player.gold += REWARDS.alchemyCrystalPurchaseBonusGold;
          animateContextGoldDelta(REWARDS.alchemyCrystalPurchaseBonusGold);
        }
        logEvent(t("ui.blackMarketBuySuccess", { name: player.name, item: getShopItemName(item), price: formatGold(item.price) }));
      } else if (roll < adjustedSuccessChance + failSlice) {
        logEvent(t("ui.blackMarketBuyNoItem", { name: player.name, item: getShopItemName(item), price: formatGold(item.price) }));
        hideTileContextMenu();
      } else if (roll < adjustedSuccessChance + failSlice * 2) {
        const damage = Math.min(10, Math.max(1, Math.round((player.maxHp || 100) * 0.05)));
        const beforeHp = player.hp;
        player.hp = clamp(player.hp - damage, 0, player.maxHp);
        const hpEl = document.getElementById("shopBuyerHp");
        UIEffects.popTextAtElement(hpEl, `-${damage}${iconHp()}`);
        logEvent(t("ui.blackMarketBuyHurt", { name: player.name, price: formatGold(item.price), damage, before: beforeHp, after: player.hp }));
        if (player.hp <= 0) {
          if (eliminatePlayerFromGame(player, "health dropped to 0")) {
            state.rolling = false;
            queueRender({
              players: true,
              stats: true,
              selectedTile: true,
              refreshInventoryOverlay: true,
              refreshContextMenu: true,
              tokensFull: true
            }, { autosave: true });
            return;
          }
        }
      } else if (roll < adjustedSuccessChance + failSlice * 3) {
        // Cheated: the deal goes through (item is granted), but the buyer loses extra gold.
        player[playerProp] = (player[playerProp] || 0) + 1;
        granted = true;
        if (action === "alchemyCrystal") {
          player.gold += REWARDS.alchemyCrystalPurchaseBonusGold;
          animateContextGoldDelta(REWARDS.alchemyCrystalPurchaseBonusGold);
        }
        const extraLoss = Math.min(player.gold, Math.max(5, Math.round(item.price * 0.12)));
        player.gold -= extraLoss;
        UIEffects.popGoldAtElement(goldEl, -extraLoss);
        logEvent(t("ui.blackMarketBuyCheated", { name: player.name, item: getShopItemName(item), price: formatGold(item.price), loss: formatGold(extraLoss) }));
      } else {
        const from = player.position;
        let direction = Math.random() < 0.5 ? -1 : 1;
        if (from <= 1) direction = 1;
        if (from >= LAST_CELL) direction = -1;
        const to = clamp(from + direction, 1, LAST_CELL);
        logEvent(t("ui.blackMarketBuyThrown", { name: player.name, price: formatGold(item.price), from, to }));
        hideTileContextMenu();
        await movePlayerAnimated(player, to);
        const resolved = await resolveCellEffects(player);
        if (resolved.eliminated) {
          state.rolling = false;
          queueRender({
            players: true,
            stats: true,
            selectedTile: true,
            refreshInventoryOverlay: true,
            refreshContextMenu: true,
            tokensFull: true
          }, { autosave: true });
          return;
        }
      }

      state.rolling = false;
      markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });
      if (granted) emitGameEvent("item-bought", { playerId: player.id, itemId: action, market: "blackMarket" });

      if (granted) {
        setTimeout(() => {
          const inventorySlotId = action === "shield" ? "shields" : action;
          const slot = shopPlayerInventoryEl.querySelector(`[data-inv-item-id="${inventorySlotId}"]`);
          if (!slot) return;
          UIEffects.pulseClass(slot, "inv-drop", 500);
        }, 0);
      }
    }

    async function sellShopBuyerItem(invItemId, slotEl) {
      if (state.gameEnded) return;
      if (state.rolling) return;
      const player = state.players.find((entry) => entry.id === shopBuyerSelectEl.value) || null;
      if (!player) return;
      const isShadowMarket = tileContextMode === "blackMarket";
      const marketCellType = isShadowMarket ? "blackMarket" : "shop";
      const marketLabel = getCellTypeLabel(marketCellType);
      const marketIcon = getCellTypeIcon(marketCellType);
      if (!hasCellType(player.position, marketCellType)) {
        logEvent(`Sale denied: ${player.name} must stand on the ${marketLabel} tile ${marketIcon}.`);
        return;
      }

      const map = {
        boots: { shopId: "boots", prop: SHOP_ITEM_TO_PROP.boots },
        shields: { shopId: "shield", prop: SHOP_ITEM_TO_PROP.shield },
        luckCharm: { shopId: "luckCharm", prop: SHOP_ITEM_TO_PROP.luckCharm },
        adrenaline: { shopId: "adrenaline", prop: SHOP_ITEM_TO_PROP.adrenaline },
        trapKit: { shopId: "trapKit", prop: SHOP_ITEM_TO_PROP.trapKit },
        rerollStone: { shopId: "rerollStone", prop: SHOP_ITEM_TO_PROP.rerollStone },
        alchemyCrystal: { shopId: "alchemyCrystal", prop: SHOP_ITEM_TO_PROP.alchemyCrystal }
      };
      const info = map[invItemId];
      if (!info) return;

      const item = SHOP_ITEMS.find((entry) => entry.id === info.shopId);
      if (!item) return;
      const sellPrice = ShopActions.calculateSellPrice(item.price, SELL_FACTOR);

      if (slotEl) {
        UIEffects.pulseClass(slotEl, "sell-flash", 400);
        UIEffects.pulseClass(slotEl, "inv-drop", 500);
      }

      pushHistory(`Sell at ${isShadowMarket ? "shadow market" : "shop"}: ${getShopItemName(item)}`);

      if (!isShadowMarket) {
        const sell = ShopActions.sellItemState({
          player,
          prop: info.prop,
          itemPrice: item.price,
          sellFactor: SELL_FACTOR
        });
        if (!sell.ok) return;
        updatePlayerInState(player.id, sell.player);
        logEvent(t("ui.shopSell", {
          shop: getCellTypeLabel("shop"),
          cell: player.position,
          name: player.name,
          item: getShopItemName(item),
          gold: formatGold(sellPrice)
        }));

        queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });

        // Gold pop/glow after rerender so we target the current gold element.
        setTimeout(() => {
          const goldEl = document.getElementById("shopBuyerGold");
          UIEffects.popGoldAtElement(goldEl, sellPrice);
        }, 0);
        return;
      }

      // Shadow market sell: item is always handed over, but the outcome varies.
      if ((player[info.prop] || 0) < 1) return;
      state.rolling = true;
      renderStats();
      renderTurnManager();
      refreshCurrentContextMenu(true);

      player[info.prop] -= 1;

      const successChance = Math.min(1, Math.max(0, Number(CHANCES.blackMarket?.profitMax ?? 0.45)));
      const luckBonus = getLuckTalismanBonus(player);
      const adjustedSuccessChance = Math.min(0.95, successChance + luckBonus);
      const failSlice = (1 - adjustedSuccessChance) / 4;
      const roll = Math.random();
      let goldDelta = 0;

      if (roll < adjustedSuccessChance) {
        player.gold += sellPrice;
        goldDelta = sellPrice;
        logEvent(t("ui.blackMarketSellSuccess", { name: player.name, item: getShopItemName(item), gold: formatGold(sellPrice) }));
      } else if (roll < adjustedSuccessChance + failSlice) {
        logEvent(t("ui.blackMarketSellNoGold", { name: player.name, item: getShopItemName(item) }));
        hideTileContextMenu();
      } else if (roll < adjustedSuccessChance + failSlice * 2) {
        const damage = Math.min(10, Math.max(1, Math.round((player.maxHp || 100) * 0.05)));
        const beforeHp = player.hp;
        player.hp = clamp(player.hp - damage, 0, player.maxHp);
        const hpEl = document.getElementById("shopBuyerHp");
        UIEffects.popTextAtElement(hpEl, `-${damage}${iconHp()}`);
        logEvent(t("ui.blackMarketSellHurt", { name: player.name, damage, before: beforeHp, after: player.hp }));
        if (player.hp <= 0) {
          if (eliminatePlayerFromGame(player, "health dropped to 0")) {
            state.rolling = false;
            queueRender({
              players: true,
              stats: true,
              selectedTile: true,
              refreshInventoryOverlay: true,
              refreshContextMenu: true,
              tokensFull: true
            }, { autosave: true });
            return;
          }
        }
      } else if (roll < adjustedSuccessChance + failSlice * 3) {
        const from = player.position;
        let direction = Math.random() < 0.5 ? -1 : 1;
        if (from <= 1) direction = 1;
        if (from >= LAST_CELL) direction = -1;
        const to = clamp(from + direction, 1, LAST_CELL);
        logEvent(t("ui.blackMarketSellThrown", { name: player.name, from, to }));
        hideTileContextMenu();
        await movePlayerAnimated(player, to);
        const resolved = await resolveCellEffects(player);
        if (resolved.eliminated) {
          state.rolling = false;
          queueRender({
            players: true,
            stats: true,
            selectedTile: true,
            refreshInventoryOverlay: true,
            refreshContextMenu: true,
            tokensFull: true
          }, { autosave: true });
          return;
        }
      } else {
        const extraLoss = Math.min(player.gold, Math.max(5, Math.round(item.price * 0.12)));
        player.gold -= extraLoss;
        goldDelta = -extraLoss;
        logEvent(t("ui.blackMarketSellCheated", { name: player.name, loss: formatGold(extraLoss) }));
      }

      state.rolling = false;
      markPlayerDirty(player.id, { row: true, stats: true, context: true, inventoryOverlay: true });
      queueRenderFromDirty({ autosave: true, tokenActiveIds: [player.id] });

      if (goldDelta) {
        setTimeout(() => {
          const goldEl = document.getElementById("shopBuyerGold");
          UIEffects.popGoldAtElement(goldEl, goldDelta);
        }, 0);
      }
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
      if (savePlayersToggleEl) {
        savePlayersToggleEl.addEventListener("change", () => {
          try {
            window.localStorage.setItem(SAVE_PLAYERS_OPTION_KEY, savePlayersToggleEl.checked ? "1" : "0");
          } catch (_) {
            // ignore
          }
        });
      }
      if (tutorialBtnEl) {
        tutorialBtnEl.addEventListener("click", () => {
          setSettingsPanelOpen(false);
          if (!tutorialManager && window.TutorialManager) setupTutorial();
          window.TutorialManager?.reset();
          setMainMenuOpen(true);
          window.setTimeout(() => tutorialManager?.start({ force: true }), 80);
        });
      }
      if (sessionSelectEl) {
        sessionSelectEl.addEventListener("change", () => {
          setActiveSession(sessionSelectEl.value);
        });
      }
      if (sessionNewBtnEl) {
        sessionNewBtnEl.addEventListener("click", () => {
          createNewSession();
          startBlankRunInActiveSession();
        logEvent(t("ui.gameReady"));
        });
      }
      if (sessionSaveBtnEl) {
        sessionSaveBtnEl.addEventListener("click", () => {
          saveGameState(false, true);
        });
      }
      if (mainMenuContinueBtnEl) {
        mainMenuContinueBtnEl.addEventListener("click", () => {
          const continueSessionId = getContinueSessionId();
          if (!continueSessionId) return;
          setActiveSession(continueSessionId);
          const ok = loadGameState(false, continueSessionId);
          if (ok) setMainMenuOpen(false);
        });
      }
      if (mainMenuSettingsBtnEl) {
        mainMenuSettingsBtnEl.addEventListener("click", () => {
          setSettingsPanelOpen(true);
        });
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
      if (copyLogsBtnEl) {
        copyLogsBtnEl.addEventListener("click", () => void copyVisibleLogsToClipboard());
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
          const canBuyHere = buyer && hasCellType(buyer.position, "blackMarket");
          shopItemsListEl.querySelectorAll("[data-shop-item-id]").forEach((el) => {
            el.classList.toggle("disabled", !canBuyHere || state.rolling);
          });
          renderShopPlayerInventory();
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
      saveGameBtnEl.addEventListener("click", () => {
        saveGameState(false, true);
        syncMainMenu();
      });
      loadGameBtnEl.addEventListener("click", () => {
        openSessionPicker();
      });
      newGameBtnEl.addEventListener("click", () => {
        syncConfigMenu();
        setNewGameSetupOpen(true);
      });
      if (newGameStartBtnEl) {
        newGameStartBtnEl.addEventListener("click", () => startNewGameWithConfig());
      }
      if (newGameCloseBtnEl) {
        newGameCloseBtnEl.addEventListener("click", () => setNewGameSetupOpen(false));
      }
      victoryNewGameBtnEl?.addEventListener("click", () => {
        closeVictoryOverlay();
        setMainMenuOpen(true);
      });

      if (sessionPickerCloseBtnEl) {
        sessionPickerCloseBtnEl.addEventListener("click", () => setSessionPickerOpen(false));
      }
      if (sessionPickerCloseIconBtnEl) {
        sessionPickerCloseIconBtnEl.addEventListener("click", () => setSessionPickerOpen(false));
      }
      if (settingsPanelEl) {
        settingsPanelEl.addEventListener("click", (event) => {
          if (event.target === settingsPanelEl) setSettingsPanelOpen(false);
        });
      }
      if (newGameSetupEl) {
        newGameSetupEl.addEventListener("click", (event) => {
          if (event.target === newGameSetupEl) setNewGameSetupOpen(false);
        });
      }
      if (sessionPickerEl) {
        sessionPickerEl.addEventListener("click", (event) => {
          if (event.target === sessionPickerEl) setSessionPickerOpen(false);
        });
      }
      if (sessionPickerLoadBtnEl) {
        sessionPickerLoadBtnEl.addEventListener("click", () => {
          const sessionId = String(sessionPickerSelectEl?.value || "");
          if (!sessionId) return;
          const ok = loadGameState(false, sessionId);
          if (!ok) return;
          setSessionPickerOpen(false);
          setMainMenuOpen(false);
        });
      }
      if (sessionPickerRenameBtnEl) {
        sessionPickerRenameBtnEl.addEventListener("click", () => {
          const sessionId = String(sessionPickerSelectEl?.value || "");
          if (!sessionId) return;
          renameSessionById(sessionId);
        });
      }
      if (sessionPickerDeleteBtnEl) {
        sessionPickerDeleteBtnEl.addEventListener("click", () => {
          const sessionId = String(sessionPickerSelectEl?.value || "");
          if (!sessionId) return;
          const deleted = deleteSessionById(sessionId);
          if (!deleted) return;
          // Keep picker usable if the selected session disappeared.
          syncSessionPickerSelect();
        });
      }
      let moveToTileClickTimer = null;
      moveToTileBtnEl.addEventListener("click", () => {
        // Delay single-click so a double-click can override it.
        if (moveToTileClickTimer) clearTimeout(moveToTileClickTimer);
        moveToTileClickTimer = setTimeout(() => {
          moveToTileClickTimer = null;
          void moveSelectedPlayerToChosenTile({ instant: false });
        }, 300);
      });
      moveToTileBtnEl.addEventListener("dblclick", (event) => {
        event.preventDefault();
        if (moveToTileClickTimer) {
          clearTimeout(moveToTileClickTimer);
          moveToTileClickTimer = null;
        }
        void moveSelectedPlayerToChosenTile({ instant: true });
      });
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
      inventoryOverlayEl.addEventListener("click", (event) => {
        const openTradeBtn = event.target.closest("[data-open-trade]");
        if (!openTradeBtn) return;
        const playerId = String(inventoryOverlayEl.dataset.playerId || "");
        if (!playerId) return;
        if (state.selectedPlayerId !== playerId) {
          Actions.selectPlayer(playerId);
        }
        openTradeOverlay();
      });
      playerStatsEl.addEventListener("click", (event) => {
        const slot = event.target.closest("[data-use-item]");
        if (slot) {
          if (slot.dataset.disabled === "true") return;
          const player = selectedPlayer();
          if (!player) return;
          useInventoryItem(slot.dataset.useItem, player.id);
          return;
        }
        const openTradeBtn = event.target.closest("[data-open-trade]");
        if (openTradeBtn) {
          openTradeOverlay();
          return;
        }
      });
      if (tradeBodyEl) {
        tradeBodyEl.addEventListener("click", (event) => {
        const tradeSlot = event.target.closest("[data-trade-select]");
        if (tradeSlot) {
          const owner = selectedPlayer();
          if (!owner) return;
          const tradeSelection = getTradeSelectionState(owner.id);
          const role = String(tradeSlot.dataset.tradeSelect || "");
          const itemId = String(tradeSlot.dataset.tradeItem || "");
          if (!itemId) return;
          const key = role === "give" ? "giveItems" : role === "get" ? "getItems" : "";
          if (!key) return;
          const selectedItems = new Set(tradeSelection[key]);
          if (selectedItems.has(itemId)) {
            selectedItems.delete(itemId);
          } else {
            selectedItems.add(itemId);
          }
          tradeSelection[key] = [...selectedItems];
          renderTradeOverlay();
          return;
        }
        const submitTradeBtn = event.target.closest("[data-trade-submit]");
        if (submitTradeBtn) {
          const owner = selectedPlayer();
          if (!owner || state.gameEnded) return;
          const targetSelect = tradeBodyEl.querySelector("[data-trade-target-select]");
          const giveItemEls = Array.from(tradeBodyEl.querySelectorAll('[data-trade-select="give"][data-trade-selected="true"]'));
          const giveGoldEl = tradeBodyEl.querySelector("[data-trade-give-gold]");
          const getItemEls = Array.from(tradeBodyEl.querySelectorAll('[data-trade-select="get"][data-trade-selected="true"]'));
          const getGoldEl = tradeBodyEl.querySelector("[data-trade-get-gold]");
          const tradePanelEl = tradeBodyEl.querySelector("[data-trade-owner-id]");
          const targetId = String(targetSelect?.value || tradePanelEl?.dataset.tradeTargetId || "");
          const target = state.players.find((entry) => entry.id === targetId) || null;
          if (!target) return;

          const success = applyUnifiedTrade(owner, target, {
            giveItems: giveItemEls.map((el) => String(el.dataset.tradeItem || "")).filter(Boolean),
            giveGold: Number(giveGoldEl?.value || 0),
            getItems: getItemEls.map((el) => String(el.dataset.tradeItem || "")).filter(Boolean),
            getGold: Number(getGoldEl?.value || 0)
          });
          if (success) {
            const sealEl = tradeBodyEl.querySelector("[data-trade-seal]");
            if (sealEl) {
              sealEl.classList.add("active");
              window.setTimeout(() => sealEl.classList.remove("active"), 850);
            }
          }
          return;
        }
      });
      tradeBodyEl.addEventListener("change", (event) => {
        const targetSelect = event.target.closest("[data-trade-target-select]");
        if (targetSelect) {
          const owner = selectedPlayer();
          if (!owner) return;
          tradeTargetByPlayerId.set(owner.id, String(targetSelect.value || ""));
          renderTradeOverlay();
          return;
        }
        syncTradeSubmitState();
      });
      tradeBodyEl.addEventListener("input", (event) => {
        const goldInput = event.target.closest("[data-trade-give-gold], [data-trade-get-gold]");
        if (!goldInput) return;
        syncTradeSubmitState();
      });
      }
      if (closeTradeBtnEl) {
        closeTradeBtnEl.addEventListener("click", closeTradeOverlay);
      }
      if (tradeOverlayEl) {
        tradeOverlayEl.addEventListener("click", (event) => {
          if (event.target === tradeOverlayEl) closeTradeOverlay();
        });
      }
      boardEl.addEventListener("contextmenu", handleBoardContextMenu);
      closeShopBtnEl.addEventListener("click", hideTileContextMenu);
      shopOverlayEl.addEventListener("click", (event) => {
        if (event.target === shopOverlayEl) hideTileContextMenu();
      });
      shopPlayerInventoryEl.addEventListener("click", (event) => {
        const slot = event.target.closest("[data-inv-item-id]");
        if (!slot) return;
        void sellShopBuyerItem(slot.dataset.invItemId, slot);
      });
      tileContextMenuEl.addEventListener("click", (event) => {
        const button = event.target.closest("[data-shop-item-id]");
        if (button) {
          void applyShopAction(button.dataset.shopItemId);
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
          return;
        }
        if (event.key === "Escape" && newGameSetupEl && !newGameSetupEl.classList.contains("is-hidden")) {
          setNewGameSetupOpen(false);
          return;
        }
        if (event.key === "Escape" && sessionPickerEl && !sessionPickerEl.classList.contains("is-hidden")) {
          setSessionPickerOpen(false);
          return;
        }
        if (event.key === "Escape" && eventJournalEl && !eventJournalEl.classList.contains("is-hidden")) {
          closeLogPanel();
        }
        if (event.key === "Escape") hideTileContextMenu();
        if (event.key === "Escape") closeInventoryOverlay();
        if (event.key === "Escape") closeTradeOverlay();
        if (event.key === "Escape") closeVictoryOverlay();
        if (event.key === "Escape" && mainMenuEl) {
          const isOpen = !mainMenuEl.classList.contains("is-hidden");
          setMainMenuOpen(!isOpen);
        }
      });
      document.addEventListener("pointerdown", (event) => {
        if (!settingsPanelEl || settingsPanelEl.classList.contains("is-hidden")) return;
        const target = event.target;
        if (settingsPanelEl.contains(target)) return;
        if (settingsLauncherEl && settingsLauncherEl.contains(target)) return;
        setSettingsPanelOpen(false);
      });
      document.addEventListener("pointerdown", (event) => {
        if (!newGameSetupEl || newGameSetupEl.classList.contains("is-hidden")) return;
        if (document.body.classList.contains("tutorial-active")) return;
        const target = event.target;
        if (newGameSetupEl.contains(target)) return;
        setNewGameSetupOpen(false);
      });

      window.addEventListener("resize", () => {
        rafDebounceSyncScale();
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
      ensureSessionsInitialized();
      let shouldStartPendingNewGame = false;
      let pendingPlayersSeed = [];
      let pendingSessionName = "";
      let shouldResumeTutorial = false;
      try {
        shouldStartPendingNewGame = window.localStorage.getItem(PENDING_NEW_GAME_KEY) === "1";
        if (shouldStartPendingNewGame) window.localStorage.removeItem(PENDING_NEW_GAME_KEY);
        const pendingPlayersRaw = window.localStorage.getItem(PENDING_NEW_GAME_PLAYERS_KEY);
        if (pendingPlayersRaw) {
          const parsed = JSON.parse(pendingPlayersRaw);
          pendingPlayersSeed = Array.isArray(parsed) ? parsed : [];
        }
        window.localStorage.removeItem(PENDING_NEW_GAME_PLAYERS_KEY);
        pendingSessionName = String(window.localStorage.getItem(PENDING_NEW_GAME_NAME_KEY) || "").trim().slice(0, 40);
        window.localStorage.removeItem(PENDING_NEW_GAME_NAME_KEY);
        shouldResumeTutorial = !window.localStorage.getItem(TUTORIAL_SEEN_KEY) && Boolean(window.localStorage.getItem(TUTORIAL_PROGRESS_KEY));
      } catch (_) {
        shouldStartPendingNewGame = false;
        pendingPlayersSeed = [];
        pendingSessionName = "";
        shouldResumeTutorial = false;
      }
      buildCells();
      createBoard();
      bindEvents();
      setupTutorial();
      syncBoardScaleVars();
      syncSidePanelPosition();
      syncInstallButton();
      applyStaticTranslations();
      syncSettingsTab();
      syncConfigMenu();
      syncSavePlayersToggle();
      setSettingsPanelOpen(false);
      closeLogPanel();
      renderLogWindow();
      syncSessionSelect();
      setActiveSession(activeSessionId);
      if (shouldStartPendingNewGame) {
        const createdSession = createNewSession();
        if (createdSession && pendingSessionName) {
          setSessionNameById(createdSession.id, pendingSessionName);
        }
        if (pendingPlayersSeed.length > 0) {
          const nextPlayers = pendingPlayersSeed.map((player) => createFreshPlayerState(player));
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
        } else {
          startBlankRunInActiveSession();
        }
        emitGameEvent("new-game-started");
      }
      fullRender(false);
      logEvent(t("ui.gameReady"));
      setMainMenuOpen(!shouldStartPendingNewGame);
      if (shouldResumeTutorial) {
        window.setTimeout(() => tutorialManager?.start(), 120);
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

