(function (global) {
  "use strict";

  function normalizeName(name) {
    return String(name || "").trim();
  }

  function normalizeNameKey(name) {
    return normalizeName(name).toLocaleLowerCase();
  }

  function buildPlayer(id, name, avatar) {
    const maxHp = Math.max(1, Number(global.GAME_CONFIG?.PLAYER_MAX_HP) || 100);
    return {
      id,
      name,
      avatar: avatar || "",
      position: 1,
      hp: maxHp,
      maxHp,
      gold: 0,
      boots: 0,
      shields: 0,
      luckCharm: 0,
      smallHealPotion: 0,
      trapKit: 0,
      rerollStone: 0,
      lotteryTicket: 0,
      alchemyCrystal: 0,
      fakeCrystal: 0,
      bootsActive: false,
      tradeBlockedTurns: 0,
      cursedItemId: "",
      cursedItemTurns: 0,
      fortuneQuest: null,
      finished: false,
      finishOrder: 0
    };
  }

  function addPlayerState(input) {
    const cleanName = normalizeName(input.name);
    if (!cleanName) return { ok: false, reason: "empty" };

    const duplicate = input.players.some((player) => normalizeNameKey(player.name) === normalizeNameKey(cleanName));
    if (duplicate) return { ok: false, reason: "duplicate", cleanName };

    const player = buildPlayer(input.id, cleanName, input.avatar);
    const players = input.players.concat(player);
    const selectedPlayerId = input.selectedPlayerId || player.id;
    const turnIndex = selectedPlayerId ? Math.max(0, players.findIndex((entry) => entry.id === selectedPlayerId)) : 0;

    return { ok: true, players, selectedPlayerId, turnIndex, player };
  }

  function removePlayerState(input) {
    const removedIndex = input.players.findIndex((entry) => entry.id === input.playerId);
    if (removedIndex < 0) return { ok: false, reason: "not_found" };

    const removedPlayer = input.players[removedIndex];
    const players = input.players.slice(0, removedIndex).concat(input.players.slice(removedIndex + 1));

    if (players.length === 0) {
      return { ok: true, players, selectedPlayerId: "", turnIndex: 0, removedPlayer };
    }

    const nextIndex = Math.max(0, Math.min(removedIndex, players.length - 1));
    return {
      ok: true,
      players,
      selectedPlayerId: players[nextIndex].id,
      turnIndex: nextIndex,
      removedPlayer
    };
  }

  function selectPlayerState(input) {
    const index = input.players.findIndex((entry) => entry.id === input.playerId);
    if (index < 0) return { ok: false, reason: "not_found" };
    return { ok: true, selectedPlayerId: input.playerId, turnIndex: index };
  }

  global.PlayerActions = {
    normalizeName,
    addPlayerState,
    removePlayerState,
    selectPlayerState
  };
})(window);
