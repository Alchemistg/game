(function initTutorialBridge(global) {
  "use strict";

  function setupTutorial(deps) {
    if (!global.TutorialManager) return null;
    const manager = new global.TutorialManager({
      api: {
        queueNextTutorialMode: deps.queueNextTutorialMode,
        openContextForSelectedPlayer: deps.openContextForSelectedPlayer,
        focusSelectedPlayerCell: deps.focusSelectedPlayerCell,
        closeContext: deps.closeContext,
        closeInventory: deps.closeInventory,
        closeTrade: deps.closeTrade,
        prepareTutorialTradeScenario: deps.prepareTutorialTradeScenario,
        prepareTutorialSystemsScenario: deps.prepareTutorialSystemsScenario,
        prepareTutorialCurseRemovalScenario: deps.prepareTutorialCurseRemovalScenario,
        prepareTutorialOracleRemovalScenario: deps.prepareTutorialOracleRemovalScenario,
        setTutorialRollPlan: deps.setTutorialRollPlan,
        prepareTutorialRollTarget: deps.prepareTutorialRollTarget
      }
    });
    return manager;
  }

  global.TutorialBridge = global.TutorialBridge || {
    version: 2,
    setupTutorial
  };
})(window);
