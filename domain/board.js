(function initBoardDomain(global) {
  "use strict";

  function normalizeCellTypes(rawTypes, number, deps) {
    const allowed = new Set(["trap", "shop", "blackMarket", "altar", "fortuneTeller", "lottery", "finish"]);
    const uniq = new Set();
    (Array.isArray(rawTypes) ? rawTypes : []).forEach((type) => {
      let nextType = type;
      if (nextType === "lottery") nextType = "fortuneTeller";
      if (allowed.has(nextType)) uniq.add(nextType);
    });
    if (Number(number) === Number(deps?.lastCell || 100)) uniq.add("finish");
    return Array.from(uniq);
  }

  function getCellTypes(cells, cellNumber, deps) {
    const index = Number(cellNumber) - 1;
    const cell = Array.isArray(cells) ? cells[index] : null;
    if (!cell) return [];
    if (Array.isArray(cell.types)) return normalizeCellTypes(cell.types, cellNumber, deps);
    if (typeof cell.type === "string" && cell.type !== "normal") return normalizeCellTypes([cell.type], cellNumber, deps);
    return [];
  }

  function hasCellType(cells, cellNumber, type, deps) {
    return getCellTypes(cells, cellNumber, deps).includes(type);
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

  function getCellBackgroundStyle(types, deps) {
    if (!types.length) return "";
    if (types.length === 1) return "";
    const palette = types.map((type) => deps?.cellTypeColors?.[type]).filter(Boolean);
    return `linear-gradient(135deg, ${palette.join(", ")})`;
  }

  global.DomainBoard = global.DomainBoard || {
    version: 2,
    normalizeCellTypes,
    getCellTypes,
    hasCellType,
    getPrimaryCellType,
    getCellBackgroundStyle
  };
})(window);
