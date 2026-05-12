(function (global) {
  "use strict";

  global.GAME_CONFIG = {
    BOARD_SIZE: 10,
    LAST_CELL: 100,
    FINISHERS_TO_END_GAME: 1,
    GOLD_PER_MOVE: 10,
    PLAYER_MAX_HP: 100,
    EVENT_LOG_TTL_MS: 1200,
    EVENT_LOG_PRUNE_INTERVAL_MS: 50000,
    SAVE_KEY: "alchemist_dungeon_save_v1",
    LANGUAGE_KEY: "alchemist_dungeon_language_v1",
    DEFAULT_LANGUAGE: "ru",
    AUTOSAVE_DELAY_MS: 900,
    INVENTORY_SLOT_LIMIT: 4,
    SELL_FACTOR: 0.5,

    SERVICE_COSTS: {
      fortuneTeller: 25,
      blackMarket: 30,
      altar: 25
    },

    REWARDS: {
      alchemyCrystalPurchaseBonusGold: 30,
      alchemyCrystalUseGold: 25,
      fortuneGoldReward: 80,
      blackMarketProfitGold: 70,
      blackMarketMaxLossGold: 35,
      altarNoTributeMaxPenaltyGold: 15
    },

    CHANCES: {
      fortune: {
        omenGoodChance: 0.6,
        questType: {
          reachCellMax: 0.4,
          itemOnCellTypeMax: 0.75
        },
        reward: {
          goldMax: 0.45,
          shieldMax: 0.75
        }
      },
      blackMarket: {
        profitMax: 0.45,
        lossMax: 0.8
      },
      altar: {
        shieldMax: 0.6
      }
    },

    PHASE_BALANCE: [
      { key: "early", until: 34, trapBack: 3, trapDamage: 20 },
      { key: "mid", until: 69, trapBack: 5, trapDamage: 30 },
      { key: "late", until: 100, trapBack: 7, trapDamage: 40 }
    ],

    CELL_LAYOUT: {
      trap: [9, 17, 28, 33, 41, 52, 64, 73, 88, 96],
      shop: [7, 19, 27, 44, 56, 69, 83, 94],
      blackMarket: [12, 36, 62, 86],
      altar: [24, 49, 74],
      fortuneTeller: [16, 39, 71, 92]
    },

    SHOP_ITEMS: [
      { id: "boots", nameKey: "items.boots.name", descKey: "items.boots.desc", price: 80 },
      { id: "shield", nameKey: "items.shield.name", descKey: "items.shield.desc", price: 70 },
      { id: "luckCharm", nameKey: "items.luckCharm.name", descKey: "items.luckCharm.desc", price: 120 },
      { id: "adrenaline", nameKey: "items.adrenaline.name", descKey: "items.adrenaline.desc", price: 150 },
      { id: "smallHealPotion", nameKey: "items.smallHealPotion.name", descKey: "items.smallHealPotion.desc", price: 55 },
      { id: "trapKit", nameKey: "items.trapKit.name", descKey: "items.trapKit.desc", price: 95 },
      { id: "rerollStone", nameKey: "items.rerollStone.name", descKey: "items.rerollStone.desc", price: 140 },
      { id: "lotteryTicket", nameKey: "items.lotteryTicket.name", descKey: "items.lotteryTicket.desc", price: 60 },
      { id: "alchemyCrystal", nameKey: "items.alchemyCrystal.name", descKey: "items.alchemyCrystal.desc", price: 220 },
      { id: "fakeCrystal", nameKey: "items.fakeCrystal.name", descKey: "items.fakeCrystal.desc", price: 70 },
      { id: "fateChalice", nameKey: "items.fateChalice.name", descKey: "items.fateChalice.desc", price: 130 },
      { id: "cleansingIncense", nameKey: "items.cleansingIncense.name", descKey: "items.cleansingIncense.desc", price: 110 }
    ],

    SHOP_ITEM_META: {
      boots: { icon: "🥾" },
      shield: { icon: "🛡️" },
      luckCharm: { icon: "🍀" },
      adrenaline: { icon: "🧪" },
      trapKit: { icon: "🧰" },
      rerollStone: { icon: "🎲" },
      alchemyCrystal: { icon: "💎" },
      smallHealPotion: { icon: "🍷" },
      lotteryTicket: { icon: "🎟️" },
      fakeCrystal: { icon: "💎" },
      fateChalice: { icon: "🍷" },
      cleansingIncense: { icon: "🕯️" }
    },

    CELL_TYPE_META: {
      trap: { icon: "💀" },
      shop: { icon: "💰" },
      blackMarket: { icon: "🕶️" },
      altar: { icon: "🛐" },
      fortuneTeller: { icon: "🔮" },
      finish: { icon: "🏆" },
      normal: { icon: "•" }
    },

    CELL_TYPE_COLORS: {
      trap: "rgba(255, 68, 68, 0.24)",
      shop: "rgba(217, 177, 76, 0.24)",
      blackMarket: "rgba(186, 98, 48, 0.28)",
      altar: "rgba(88, 120, 219, 0.28)",
      fortuneTeller: "rgba(214, 88, 166, 0.28)",
      finish: "rgba(92, 200, 255, 0.28)"
    }
  };
})(window);
