(function (global) {
  "use strict";

  function pulseClass(element, className, durationMs) {
    if (!element) return;
    const duration = Math.max(0, Number(durationMs) || 0);
    element.classList.add(className);
    setTimeout(() => element.classList.remove(className), duration);
  }

  function popGoldAtElement(element, delta, options) {
    if (!element || !delta) return;
    const opts = options || {};
    const glowDuration = Math.max(0, Number(opts.glowDurationMs) || 650);
    const popDuration = Math.max(0, Number(opts.popDurationMs) || 800);

    pulseClass(element, "gold-glow", glowDuration);
    const rect = element.getBoundingClientRect();
    const pop = document.createElement("div");
    pop.className = `gold-pop${delta < 0 ? " spent" : ""}`;
    pop.textContent = `${delta > 0 ? "+" : ""}${delta}💰`;
    pop.style.left = `${rect.left + rect.width / 2}px`;
    pop.style.top = `${rect.top}px`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), popDuration);
  }

  function pressButton(element, durationMs) {
    if (!element) return;
    const dur = Math.max(80, Number(durationMs) || 180);
    element.classList.add('btn-press');
    setTimeout(() => element.classList.remove('btn-press'), dur);
  }

  function shakeElement(element, durationMs) {
    if (!element) return;
    const dur = Math.max(120, Number(durationMs) || 350);
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), dur);
  }

  function popTextAtElement(element, text, options) {
    if (!element || !text) return;
    const opts = options || {};
    const dur = Math.max(300, Number(opts.durationMs) || 700);
    const rect = element.getBoundingClientRect();
    const pop = document.createElement('div');
    pop.className = 'gold-pop';
    pop.textContent = text;
    pop.style.left = `${rect.left + rect.width / 2}px`;
    pop.style.top = `${rect.top}px`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), dur);
  }

  global.UIEffects = {
    pulseClass,
    popGoldAtElement
  };
  global.UIEffects.pressButton = pressButton;
  global.UIEffects.shakeElement = shakeElement;
  global.UIEffects.popTextAtElement = popTextAtElement;
})(window);
