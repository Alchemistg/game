(function initTradeDomain(global) {
  "use strict";

  const TRADE_ITEM_DEFS = [
    { prop: "boots", addKey: "boots", shopId: "boots" },
    { prop: "shields", addKey: "shield", shopId: "shield" },
    { prop: "luckCharm", addKey: "luckCharm", shopId: "luckCharm" },
    { prop: "adrenaline", addKey: "adrenaline", shopId: "adrenaline" },
    { prop: "smallHealPotion", addKey: "smallHealPotion", shopId: "smallHealPotion" },
    { prop: "trapKit", addKey: "trapKit", shopId: "trapKit" },
    { prop: "rerollStone", addKey: "rerollStone", shopId: "rerollStone" },
    { prop: "unstablePortal", addKey: "unstablePortal", shopId: "unstablePortal" },
    { prop: "lotteryTicket", addKey: "lotteryTicket", shopId: "lotteryTicket" },
    { prop: "alchemyCrystal", addKey: "alchemyCrystal", shopId: "alchemyCrystal" },
    { prop: "fakeCrystal", addKey: "fakeCrystal", shopId: "fakeCrystal" },
    { prop: "fateChalice", addKey: "fateChalice", shopId: "fateChalice" },
    { prop: "cleansingIncense", addKey: "cleansingIncense", shopId: "cleansingIncense" }
  ];

  function getTradeItemDefs(player, deps) {
    const getShopItemById = deps?.getShopItemById;
    const getShopItemName = deps?.getShopItemName;
    const getShopItemDesc = deps?.getShopItemDesc;
    const getShopItemIcon = deps?.getShopItemIcon;
    const iconUnknown = deps?.iconUnknown;

    return TRADE_ITEM_DEFS
      .filter((item) => Math.max(0, Number(player[item.prop]) || 0) > 0)
      .map((item) => {
        const shopItem = typeof getShopItemById === "function" ? getShopItemById(item.shopId) : null;
        return {
          prop: item.prop,
          addKey: item.addKey,
          shopId: item.shopId,
          count: Math.max(0, Number(player[item.prop]) || 0),
          name: shopItem && typeof getShopItemName === "function" ? getShopItemName(shopItem) : item.prop,
          icon: (typeof getShopItemIcon === "function" ? getShopItemIcon(item.shopId) : "") || (typeof iconUnknown === "function" ? iconUnknown() : "?"),
          desc: shopItem && typeof getShopItemDesc === "function" ? getShopItemDesc(shopItem) : item.prop
        };
      });
  }

  function getTradeTransferDef(itemProp) {
    const def = TRADE_ITEM_DEFS.find((item) => item.prop === itemProp);
    if (!def) return null;
    return { addKey: def.addKey, shopId: def.shopId };
  }

  function buildTradeInventoryCounts(player) {
    return TRADE_ITEM_DEFS.reduce((acc, item) => {
      acc[item.prop] = Number(player[item.prop]) || 0;
      return acc;
    }, {});
  }

  function canResolveTradeInventory(player, giveItems, getItems, inventorySlotLimit) {
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
    return occupied <= Number(inventorySlotLimit || 0);
  }

  function applyUnifiedTrade(owner, target, deal, deps) {
    if (!owner || !target || !deal) return false;
    if ((Number(owner.tradeBlockedTurns) || 0) > 0 || (Number(target.tradeBlockedTurns) || 0) > 0) {
      deps.logEvent?.(deps.t ? deps.t("ui.tradeBlockedByChain") : "Trade blocked.");
      return false;
    }
    if (!deps.isSameCell?.(owner.position, target.position)) {
      deps.logEvent?.(`Trade denied: ${owner.name} and ${target.name} must be on the same tile.`);
      return false;
    }

    const giveGold = Math.max(0, Math.trunc(Number(deal.giveGold) || 0));
    const getGold = Math.max(0, Math.trunc(Number(deal.getGold) || 0));
    const giveItems = [...new Set((Array.isArray(deal.giveItems) ? deal.giveItems : []).map((item) => String(item || "")).filter(Boolean))];
    const getItems = [...new Set((Array.isArray(deal.getItems) ? deal.getItems : []).map((item) => String(item || "")).filter(Boolean))];
    if (!giveItems.length && !getItems.length && giveGold < 1 && getGold < 1) return false;
    if (!canResolveTradeInventory(owner, giveItems, getItems, deps.inventorySlotLimit)) return false;
    if (!canResolveTradeInventory(target, getItems, giveItems, deps.inventorySlotLimit)) return false;
    if (owner.gold < giveGold) return false;
    if (target.gold < getGold) return false;

    deps.pushHistory?.(`Trade deal: ${owner.name} <-> ${target.name}`);
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

    deps.markPlayerDirty?.(owner.id, { row: true, stats: true, context: true, inventoryOverlay: true });
    deps.markPlayerDirty?.(target.id, { row: true, stats: true, context: true, inventoryOverlay: true });
    const giveGoldLabel = giveGold > 0 ? ` + ${deps.formatGold?.(giveGold) || giveGold}` : "";
    const getGoldLabel = getGold > 0 ? ` + ${deps.formatGold?.(getGold) || getGold}` : "";
    const giveItemsLabel = giveItems.length ? giveItems.join(", ") : (giveGold > 0 ? "gold" : "nothing");
    const getItemsLabel = getItems.length ? getItems.join(", ") : (getGold > 0 ? "gold" : "nothing");
    deps.logEvent?.(`Trade: ${owner.name} gives ${giveItemsLabel}${giveGoldLabel}, gets ${getItemsLabel}${getGoldLabel}.`);
    deps.queueRenderFromDirty?.({ autosave: true, tokenActiveIds: [owner.id, target.id] });
    return true;
  }

  function applyItemTrade(fromPlayer, toPlayer, itemProp, deps) {
    const def = getTradeTransferDef(itemProp);
    if (!def) return;
    if (!deps.isSameCell?.(fromPlayer.position, toPlayer.position)) {
      deps.logEvent?.(`Trade denied: ${fromPlayer.name} and ${toPlayer.name} must be on the same tile.`);
      return;
    }
    if ((fromPlayer[itemProp] || 0) < 1) {
      deps.logEvent?.(`Trade denied: ${fromPlayer.name} does not have the selected item.`);
      return;
    }
    if (!deps.canAddItemType?.(toPlayer, def.addKey)) {
      deps.logEvent?.(`Trade denied: ${toPlayer.name} has no free inventory slot for a new item type.`);
      return;
    }
    const shopItem = deps.getShopItemById?.(def.shopId) || null;
    const itemLabel = shopItem ? deps.getShopItemName?.(shopItem) : itemProp;
    deps.pushHistory?.(`Trade item: ${fromPlayer.name} -> ${toPlayer.name}`);
    fromPlayer[itemProp] -= 1;
    toPlayer[itemProp] += 1;
    deps.markPlayerDirty?.(fromPlayer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
    deps.markPlayerDirty?.(toPlayer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
    deps.logEvent?.(`Trade: ${fromPlayer.name} gives ${toPlayer.name} item "${itemLabel}".`);
    deps.queueRenderFromDirty?.({ autosave: true, tokenActiveIds: [fromPlayer.id, toPlayer.id] });
  }

  function applyGoldForItemTrade(buyer, seller, itemProp, priceRaw, deps) {
    const def = getTradeTransferDef(itemProp);
    if (!def) return;
    const price = Math.max(1, Math.trunc(Number(priceRaw) || 0));
    if (!deps.isSameCell?.(buyer.position, seller.position)) {
      deps.logEvent?.(`Trade denied: ${buyer.name} and ${seller.name} must be on the same tile.`);
      return;
    }
    if ((buyer.gold || 0) < price) {
      deps.logEvent?.(`Trade denied: ${buyer.name} does not have enough gold.`);
      return;
    }
    if ((seller[itemProp] || 0) < 1) {
      deps.logEvent?.(`Trade denied: ${seller.name} does not have the selected item.`);
      return;
    }
    if (!deps.canAddItemType?.(buyer, def.addKey)) {
      deps.logEvent?.(`Trade denied: ${buyer.name} has no free inventory slot for a new item type.`);
      return;
    }
    const shopItem = deps.getShopItemById?.(def.shopId) || null;
    const itemLabel = shopItem ? deps.getShopItemName?.(shopItem) : itemProp;
    deps.pushHistory?.(`Trade deal: ${buyer.name} buys ${itemLabel} from ${seller.name}`);
    buyer.gold -= price;
    seller.gold += price;
    seller[itemProp] -= 1;
    buyer[itemProp] += 1;
    deps.markPlayerDirty?.(buyer.id, { row: true, stats: true, context: true, inventoryOverlay: true });
    deps.markPlayerDirty?.(seller.id, { row: true, stats: true, context: true, inventoryOverlay: true });
    deps.logEvent?.(`Trade deal: ${buyer.name} pays ${deps.formatGold?.(price) || price} to ${seller.name} for "${itemLabel}".`);
    deps.queueRenderFromDirty?.({ autosave: true, tokenActiveIds: [buyer.id, seller.id] });
  }

  global.DomainTrade = global.DomainTrade || {
    version: 2,
    getTradeItemDefs,
    getTradeTransferDef,
    buildTradeInventoryCounts,
    canResolveTradeInventory,
    applyUnifiedTrade,
    applyItemTrade,
    applyGoldForItemTrade
  };
})(window);
