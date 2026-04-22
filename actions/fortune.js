(function (global) {
  "use strict";

  function applyBlackMarketState(input) {
    const player = { ...input.player };
    const fee = input.fee;
    const roll = input.roll;
    const profitChanceMax = Number(input.profitChanceMax ?? 0.45);
    const lossChanceMax = Number(input.lossChanceMax ?? 0.8);
    const profitGold = Number(input.profitGold ?? 70);
    const maxLossGold = Number(input.maxLossGold ?? 35);

    if (player.gold < fee) {
      return { ok: false, reason: "not_enough_gold", player };
    }

    player.gold -= fee;
    let delta = -fee;
    let outcome = "fee_only";

    if (roll < profitChanceMax) {
      player.gold += profitGold;
      delta += profitGold;
      outcome = "profit";
    } else if (roll < lossChanceMax) {
      const loss = Math.min(maxLossGold, player.gold);
      player.gold -= loss;
      delta -= loss;
      outcome = "loss";
      return { ok: true, player, delta, outcome, loss };
    } else {
      player.shields += 1;
      outcome = "shield";
    }

    return { ok: true, player, delta, outcome };
  }

  function applyAltarState(input) {
    const player = { ...input.player };
    const tribute = input.tribute;
    const blessingRoll = input.blessingRoll;
    const shieldChanceMax = Number(input.shieldChanceMax ?? 0.6);
    const maxPenaltyGold = Number(input.maxPenaltyGold ?? 15);

    if (player.gold >= tribute) {
      player.gold -= tribute;
      const delta = -tribute;
      if (blessingRoll < shieldChanceMax) {
        player.shields += 1;
        return { ok: true, player, delta, outcome: "shield" };
      }
      player.boots += 1;
      return { ok: true, player, delta, outcome: "boots" };
    }

    const penalty = Math.min(maxPenaltyGold, player.gold);
    player.gold -= penalty;
    return { ok: true, player, delta: -penalty, outcome: "penalty", penalty };
  }

  function purchaseFortuneQuestState(input) {
    const player = { ...input.player };
    const cost = input.cost;
    if (player.gold < cost) {
      return { ok: false, reason: "not_enough_gold", player };
    }
    if (player.fortuneQuest) {
      return { ok: false, reason: "already_has_quest", player };
    }

    player.gold -= cost;
    player.fortuneQuest = input.quest;
    return { ok: true, player, delta: -cost };
  }

  function clearFortuneQuestState(input) {
    const player = { ...input.player, fortuneQuest: null };
    return { ok: true, player };
  }

  function applyFortuneRewardState(input) {
    const player = { ...input.player, fortuneQuest: null };
    const rewardRoll = input.rewardRoll;
    const goldChanceMax = Number(input.goldChanceMax ?? 0.45);
    const shieldChanceMax = Number(input.shieldChanceMax ?? 0.75);
    const goldReward = Number(input.goldReward ?? 80);

    if (rewardRoll < goldChanceMax) {
      player.gold += goldReward;
      return { ok: true, player, reward: "gold", gold: goldReward };
    }
    if (rewardRoll < shieldChanceMax) {
      player.shields = (player.shields || 0) + 1;
      return { ok: true, player, reward: "shield" };
    }

    player.boots = (player.boots || 0) + 1;
    return { ok: true, player, reward: "boots" };
  }

  global.FortuneActions = {
    applyBlackMarketState,
    applyAltarState,
    purchaseFortuneQuestState,
    clearFortuneQuestState,
    applyFortuneRewardState
  };
})(window);
