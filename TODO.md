# Game Optimization TODO

## P0: Stabilize Current Optimization Work
- [x] Remove duplicate `logCacheHits` declarations in `app.js`
- [x] Make `logFormatCache` re-initializable on language change
- [x] Route `resize` scale sync through RAF debounce
- [x] Recheck syntax after optimization edits
- [ ] Recheck basic app startup in browser after optimization edits

## P1: Keep TODO Aligned With Reality
- [x] `DocumentFragment` is already used in `renderPlayersMenu()`
- [x] `DocumentFragment` is already used in `renderShopMenuItems()`
- [x] `renderTokens()` already reuses DOM nodes via `tokenElsById`
- [x] `effectsPanelCache` already has bounded eviction
- [ ] Remove outdated follow-up notes after the next profiling pass

## P1: Add Measurement Before More Tuning
- [x] Add perf marks inside `flushQueuedRender()` for `players`
- [x] Add perf marks inside `flushQueuedRender()` for `stats`
- [x] Add perf marks inside `flushQueuedRender()` for `selectedTile`
- [x] Add perf marks inside `flushQueuedRender()` for `inventory`
- [x] Add perf marks inside `flushQueuedRender()` for `contextMenu`
- [x] Add perf marks inside `flushQueuedRender()` for `tokens`
- [x] Add perf marks inside `flushQueuedRender()` for `autosave`
- [ ] Validate `PERF_ENABLED=1` output and cache-hit logs in browser

## P2: Optimize Only the Real Hot Path
- [x] Reduce repeated per-row DOM lookup in `renderPlayersMenu()`
- [x] Optimize `renderTokens()` stack math and avatar updates
- [x] Skip CSS var writes in `syncBoardScaleVars()` when the signature is unchanged
- [x] Reduce transient DOM churn in `uiEffects.js`

## Validation
- [ ] Record a 2-minute Chrome DevTools performance session with about 10 players
- [ ] Check FPS stability during movement, inventory, and context menu usage
- [ ] Revisit Lighthouse only after runtime hotspots are fixed

## Notes
- Estimated gains should come from measurements, not assumptions.
- Token object pooling is not a priority while DOM reuse already exists.
