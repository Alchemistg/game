(function initInventoryDomain(global) {
  "use strict";

  function getInventoryItemCountById(player, itemId, shopItemToProp) {
    if (!player || !itemId) return 0;
    if (itemId === "shields") return Number(player.shields) || 0;
    if (shopItemToProp && itemId in shopItemToProp) {
      const prop = shopItemToProp[itemId];
      return Number(player[prop]) || 0;
    }
    return Number(player[itemId]) || 0;
  }

  function getAvailableInventoryItemIds(player, ids, shopItemToProp) {
    const list = Array.isArray(ids) ? ids : [];
    return list.filter((itemId) => getInventoryItemCountById(player, itemId, shopItemToProp) > 0);
  }

  function getOccupiedInventorySlots(player, slotProps) {
    const props = Array.isArray(slotProps) ? slotProps : [];
    return props.reduce((acc, prop) => acc + ((Number(player?.[prop]) || 0) > 0 ? 1 : 0), 0);
  }

  function canAddItemType(player, itemId, byId, inventorySlotLimit, slotProps) {
    const current = Number((byId || {})[itemId]) || 0;
    if (current > 0) return true;
    return getOccupiedInventorySlots(player, slotProps) < Number(inventorySlotLimit || 0);
  }

  global.InventoryDomain = {
    getInventoryItemCountById,
    getAvailableInventoryItemIds,
    getOccupiedInventorySlots,
    canAddItemType
  };
})(window);

