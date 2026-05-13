(function initFortuneDomain(global) {
  "use strict";

  function createFortuneQuest(player, deps) {
    const random = deps?.random || Math.random;
    const randomInt = deps?.randomInt;
    const clamp = deps?.clamp;
    const t = deps?.t;
    const getLuckTalismanBonus = deps?.getLuckTalismanBonus;
    const getCellTypeLabel = deps?.getCellTypeLabel;
    const getShopItemNameById = deps?.getShopItemNameById;
    const chances = deps?.chances;
    const lastCell = Number(deps?.lastCell || 100);

    const roll = random();
    const cellTypeChoices = ["shop", "blackMarket", "altar", "fortuneTeller"];
    const itemChoices = [
      { key: "boots", label: getShopItemNameById?.("boots") || "boots" },
      { key: "shields", label: getShopItemNameById?.("shield") || "shields" },
      { key: "luckCharm", label: getShopItemNameById?.("luckCharm") || "luckCharm" },
      { key: "adrenaline", label: getShopItemNameById?.("adrenaline") || "adrenaline" },
      { key: "trapKit", label: getShopItemNameById?.("trapKit") || "trapKit" }
    ];
    const omenGoodChance = clamp(
      Number(chances?.fortune?.omenGoodChance || 0) + Number(getLuckTalismanBonus?.(player) || 0),
      0,
      0.95
    );
    const omenType = random() < omenGoodChance ? "good" : "bad";
    const omenLabel = omenType === "good" ? t?.("ui.omenGood") : t?.("ui.omenBad");

    if (roll < Number(chances?.fortune?.questType?.reachCellMax || 0)) {
      const targetCell = clamp((Number(player?.position) || 1) + randomInt(4, 12), 2, lastCell);
      const stepHint = Math.max(1, targetCell - (Number(player?.position) || 1));
      return {
        omenType,
        omenLabel,
        type: "reachCell",
        targetCell,
        stepHint,
        description: t?.("quest.reachCell", { targetCell })
      };
    }

    if (roll < Number(chances?.fortune?.questType?.itemOnCellTypeMax || 0)) {
      const item = itemChoices[randomInt(0, itemChoices.length - 1)];
      const cellType = cellTypeChoices[randomInt(0, cellTypeChoices.length - 1)];
      return {
        omenType,
        omenLabel,
        type: "itemOnCellType",
        requiredItem: item.key,
        requiredItemLabel: item.label,
        requiredCellType: cellType,
        requiredCellTypeLabel: getCellTypeLabel?.(cellType),
        description: t?.("quest.itemOnCellType", { item: item.label, cellTypeLabel: getCellTypeLabel?.(cellType) })
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
      requiredCellTypeLabel: getCellTypeLabel?.(cellType),
      description: t?.("quest.goldOnCellType", { minGold: goldTarget, cellTypeLabel: getCellTypeLabel?.(cellType) })
    };
  }

  function isFortuneQuestCompleted(player, quest, deps) {
    if (!quest) return false;
    if (quest.type === "reachCell") return Number(player?.position) === Number(quest.targetCell);
    if (quest.type === "itemOnCellType") {
      return (Number(player?.[quest.requiredItem]) || 0) > 0 && Boolean(deps?.hasCellType?.(player?.position, quest.requiredCellType));
    }
    if (quest.type === "goldOnCellType") {
      return (Number(player?.gold) || 0) >= Number(quest.minGold || 0) && Boolean(deps?.hasCellType?.(player?.position, quest.requiredCellType));
    }
    return false;
  }

  function getFortuneQuestConditionText(quest, deps) {
    const t = deps?.t;
    if (!quest) return "";
    if (quest.type === "reachCell") {
      return t?.("quest.reachCellHint", { stepHint: quest.stepHint || "several" }) || "";
    }
    if (quest.type === "itemOnCellType") {
      return t?.("quest.itemOnCellType", { item: quest.requiredItemLabel, cellTypeLabel: quest.requiredCellTypeLabel }) || "";
    }
    if (quest.type === "goldOnCellType") {
      return t?.("quest.goldOnCellType", { minGold: quest.minGold, cellTypeLabel: quest.requiredCellTypeLabel }) || "";
    }
    return quest.description || "";
  }

  function getFortuneQuestDebugConditionText(quest, deps) {
    const t = deps?.t;
    if (!quest) return "";
    if (quest.type === "reachCell") return t?.("quest.reachCellDebug", { targetCell: quest.targetCell }) || "";
    if (quest.type === "itemOnCellType") {
      return t?.("quest.itemOnCellTypeDebug", { item: quest.requiredItemLabel, cellTypeLabel: quest.requiredCellTypeLabel }) || "";
    }
    if (quest.type === "goldOnCellType") {
      return t?.("quest.goldOnCellTypeDebug", { minGold: quest.minGold, cellTypeLabel: quest.requiredCellTypeLabel }) || "";
    }
    return quest.description || "";
  }

  function resolveFortuneQuestReward(player, quest, deps) {
    if (quest?.omenType === "bad") {
      const maxGoldLoss = Math.max(15, Math.round(Number(deps?.rewards?.fortuneGoldReward || 0) * 0.5));
      const maxHpDamage = Math.max(6, Math.round((Number(player?.maxHp) || Number(deps?.playerMaxHp) || 100) * 0.1));
      const result = deps?.fortuneActions?.applyFortunePenaltyState?.({
        player,
        roll: (deps?.random || Math.random)(),
        maxGoldLoss,
        maxHpDamage
      });
      if (!result?.ok) return;

      deps.updatePlayerInState?.(player.id, result.player);
      if (result.penalty === "gold") {
        deps.logEvent?.(deps.t?.("ui.prophecyBadGold", { name: player.name, loss: deps.formatGold?.(result.goldLoss) }));
        return;
      }

      deps.logEvent?.(deps.t?.("ui.prophecyBadHp", { name: player.name, damage: result.hpDamage, before: result.hpBefore, after: result.hpAfter }));
      if ((result.player.hp || 0) <= 0) {
        deps.eliminatePlayerFromGame?.(result.player, "prophecy drained their life");
      }
      return;
    }

    const result = deps?.fortuneActions?.applyFortuneRewardState?.({
      player,
      rewardRoll: (deps?.random || Math.random)(),
      goldChanceMax: Number(deps?.chances?.fortune?.reward?.goldMax || 0),
      shieldChanceMax: Number(deps?.chances?.fortune?.reward?.shieldMax || 0),
      goldReward: Number(deps?.rewards?.fortuneGoldReward || 0)
    });
    if (!result?.ok) return;

    deps.updatePlayerInState?.(player.id, result.player);
    if (result.reward === "gold") {
      deps.logEvent?.(`${player.name} receives a prophecy reward of +${deps.formatGold?.(result.goldReward)}.`);
      return;
    }
    if (result.reward === "shield") {
      deps.logEvent?.(`${player.name} receives +1 Protection Seal.`);
      return;
    }
    deps.logEvent?.(`${player.name} receives +1 Ritual Greaves.`);
  }

  function tryResolveFortuneQuest(player, deps) {
    if (!player?.fortuneQuest) return;
    if (!isFortuneQuestCompleted(player, player.fortuneQuest, { hasCellType: deps?.hasCellType })) return;
    resolveFortuneQuestReward(player, player.fortuneQuest, deps);
  }

  global.DomainFortune = global.DomainFortune || {
    version: 2,
    createFortuneQuest,
    isFortuneQuestCompleted,
    getFortuneQuestConditionText,
    getFortuneQuestDebugConditionText,
    resolveFortuneQuestReward,
    tryResolveFortuneQuest
  };
})(window);
