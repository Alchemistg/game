(function initInfraStorage(global) {
  "use strict";

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
      shp: player.smallHealPotion,
      t: player.trapKit,
      r: player.rerollStone,
      up: player.unstablePortal,
      lt: player.lotteryTicket,
      a: player.alchemyCrystal,
      fc: player.fakeCrystal,
      fch: player.fateChalice,
      cin: player.cleansingIncense,
      ba: player.bootsActive ? 1 : 0,
      tb: Number(player.tradeBlockedTurns) || 0,
      ci: player.cursedItemId || "",
      ct: Number(player.cursedItemTurns) || 0,
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
      smallHealPotion: Number(raw.shp) || 0,
      trapKit: Number(raw.t) || 0,
      rerollStone: Number(raw.r) || 0,
      unstablePortal: Number(raw.up) || 0,
      lotteryTicket: Number(raw.lt) || 0,
      alchemyCrystal: Number(raw.a) || 0,
      fakeCrystal: Number(raw.fc) || 0,
      fateChalice: Number(raw.fch) || 0,
      cleansingIncense: Number(raw.cin) || 0,
      bootsActive: Boolean(raw.ba),
      tradeBlockedTurns: Math.max(0, Number(raw.tb) || 0),
      cursedItemId: String(raw.ci || ""),
      cursedItemTurns: Math.max(0, Number(raw.ct) || 0),
      fortuneQuest: raw.fq && typeof raw.fq === "object" ? { ...raw.fq } : null,
      finished: Boolean(raw.fi),
      finishOrder: Number(raw.fo) || 0
    };
  }

  function packCell(cell) {
    return [cell.number, Array.isArray(cell.types) ? cell.types : []];
  }

  function unpackCell(raw, index, deps) {
    const normalizeCellTypes = deps?.normalizeCellTypes;
    if (Array.isArray(raw)) {
      return { number: Number(raw[0]) || index + 1, types: normalizeCellTypes(raw[1], Number(raw[0]) || index + 1) };
    }
    const number = index + 1;
    const rawTypes = Array.isArray(raw?.types)
      ? raw.types
      : (typeof raw?.type === "string" && raw.type !== "normal" ? [raw.type] : []);
    return { number, types: normalizeCellTypes(rawTypes, number) };
  }

  function packSnapshot(snapshot, deps) {
    const normalizeLogEntry = deps?.normalizeLogEntry;
    const stateVersion = Number(deps?.stateVersion || 1);
    return {
      v: snapshot.v || stateVersion,
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

  function unpackSnapshot(parsed, deps) {
    const normalizeLogEntry = deps?.normalizeLogEntry;
    const normalizeCellTypes = deps?.normalizeCellTypes;
    if (!parsed || typeof parsed !== "object") return null;
    if (Array.isArray(parsed.players)) return parsed;
    if (!Array.isArray(parsed.p)) return null;
    return {
      v: Number(parsed.v) || 1,
      players: parsed.p.map(unpackPlayer).filter(Boolean),
      cells: Array.isArray(parsed.c) ? parsed.c.map((cell, index) => unpackCell(cell, index, { normalizeCellTypes })) : [],
      selectedPlayerId: typeof parsed.sp === "string" ? parsed.sp : "",
      selectedCell: Number(parsed.sc) || 1,
      turnIndex: Number(parsed.ti) || 0,
      logEntries: Array.isArray(parsed.le) ? parsed.le.map((entry) => normalizeLogEntry(entry)).filter(Boolean) : [],
      gameEnded: Boolean(parsed.ge)
    };
  }

  function isValidLoadedPlayer(player) {
    if (!player || typeof player !== "object") return false;
    if (typeof player.id !== "string" || typeof player.name !== "string") return false;
    if (!Number.isFinite(player.position) || !Number.isFinite(player.gold)) return false;
    if ("hp" in player && !Number.isFinite(Number(player.hp))) return false;
    if ("maxHp" in player && !Number.isFinite(Number(player.maxHp))) return false;
    return true;
  }

  global.InfraStorage = global.InfraStorage || {
    version: 2,
    packPlayer,
    unpackPlayer,
    packCell,
    unpackCell,
    packSnapshot,
    unpackSnapshot,
    isValidLoadedPlayer
  };
})(window);
