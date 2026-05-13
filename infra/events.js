(function initInfraEvents(global) {
  "use strict";

  function emitGameEvent(name, detail = {}) {
    document.dispatchEvent(new CustomEvent(`game:${name}`, { detail }));
  }

  function waitForEvent(name, predicate = null, options = {}) {
    const cancelEvent = options.cancelEvent || "tutorial:cancel";
    return new Promise((resolve) => {
      const cleanup = () => {
        document.removeEventListener(name, onEvent);
        if (cancelEvent) document.removeEventListener(cancelEvent, onCancel);
      };
      const onEvent = (event) => {
        if (predicate && !predicate(event.detail || {})) return;
        cleanup();
        resolve(event.detail || {});
      };
      const onCancel = () => {
        cleanup();
        resolve({ cancelled: true });
      };
      document.addEventListener(name, onEvent);
      if (cancelEvent) document.addEventListener(cancelEvent, onCancel);
    });
  }

  global.InfraEvents = global.InfraEvents || {
    version: 2,
    emitGameEvent,
    waitForEvent
  };
})(window);
