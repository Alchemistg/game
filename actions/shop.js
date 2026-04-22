(function (global) {
  "use strict";

  function calculateSellPrice(itemPrice, sellFactor) {
    return Math.max(1, Math.floor(itemPrice * sellFactor));
  }

  function purchaseItemState(input) {
    const player = { ...input.player };
    const itemPrice = input.itemPrice;
    const bonusGold = Math.max(0, Number(input.bonusGold) || 0);

    if (player.gold < itemPrice) {
      return { ok: false, reason: "not_enough_gold" };
    }

    player.gold -= itemPrice;
    const prop = input.prop;
    player[prop] = (player[prop] || 0) + 1;

    if (bonusGold > 0) {
      player.gold += bonusGold;
    }

    return {
      ok: true,
      player,
      spentGold: itemPrice,
      gainedItemProp: prop,
      bonusGold
    };
  }

  function sellItemState(input) {
    const player = { ...input.player };
    const prop = input.prop;

    if ((player[prop] || 0) < 1) {
      return { ok: false, reason: "no_item" };
    }

    const gain = calculateSellPrice(input.itemPrice, input.sellFactor);
    player[prop] -= 1;
    player.gold += gain;

    return {
      ok: true,
      player,
      gainedGold: gain,
      soldProp: prop
    };
  }

  global.ShopActions = {
    calculateSellPrice,
    purchaseItemState,
    sellItemState
  };
})(window);
