(function (global) {
  "use strict";

  const popPool = [];

  function scheduleClassRemoval(element, className, durationMs) {
    window.setTimeout(() => element.classList.remove(className), durationMs);
  }

  function pulseClass(element, className, durationMs) {
    if (!element) return;
    const duration = Math.max(0, Number(durationMs) || 0);
    element.classList.add(className);
    scheduleClassRemoval(element, className, duration);
  }

  function acquirePop() {
    const pop = popPool.pop() || document.createElement("div");
    pop.className = "gold-pop";
    pop.textContent = "";
    pop.style.left = "";
    pop.style.top = "";
    pop.style.transform = "";
    return pop;
  }

  function releasePop(pop) {
    if (!pop) return;
    pop.remove();
    if (popPool.length < 8) {
      popPool.push(pop);
    }
  }

  function showFloatingPop(element, text, className, durationMs) {
    if (!element || !text) return;
    const dur = Math.max(300, Number(durationMs) || 700);
    const rect = element.getBoundingClientRect();
    const pop = acquirePop();
    pop.className = className;
    pop.textContent = text;
    pop.style.left = `${rect.left + rect.width / 2}px`;
    pop.style.top = `${rect.top}px`;
    document.body.appendChild(pop);
    window.requestAnimationFrame(() => {
      pop.style.transform = "translate3d(0, 0, 0)";
    });
    window.setTimeout(() => releasePop(pop), dur);
  }

  function popGoldAtElement(element, delta, options) {
    if (!element || !delta) return;
    const opts = options || {};
    const glowDuration = Math.max(0, Number(opts.glowDurationMs) || 650);
    const popDuration = Math.max(0, Number(opts.popDurationMs) || 800);

    pulseClass(element, "gold-glow", glowDuration);
    showFloatingPop(
      element,
      `${delta > 0 ? "+" : ""}${delta}\uD83D\uDCB0`,
      `gold-pop${delta < 0 ? " spent" : ""}`,
      popDuration
    );
  }

  function pressButton(element, durationMs) {
    if (!element) return;
    const dur = Math.max(80, Number(durationMs) || 180);
    element.classList.add("btn-press");
    scheduleClassRemoval(element, "btn-press", dur);
  }

  function shakeElement(element, durationMs) {
    if (!element) return;
    const dur = Math.max(120, Number(durationMs) || 350);
    element.classList.add("shake");
    scheduleClassRemoval(element, "shake", dur);
  }

  function popTextAtElement(element, text, options) {
    if (!element || !text) return;
    const opts = options || {};
    showFloatingPop(element, text, "gold-pop", opts.durationMs);
  }

  global.UIEffects = {
    pulseClass,
    popGoldAtElement
  };
  global.UIEffects.pressButton = pressButton;
  global.UIEffects.shakeElement = shakeElement;
  global.UIEffects.popTextAtElement = popTextAtElement;
})(window);
