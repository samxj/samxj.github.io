/*
 * Manual date/time overrides for milestones the parser couldn't date.
 * Persisted in localStorage, keyed by the milestone's raw trimmed line text
 * (not its position) so overrides survive re-pasting the same list with
 * lines added, removed, or reordered elsewhere.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MilestoneOverrides = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var STORAGE_KEY = 'milestoneAnalyzer.overrides';

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }

  // Returns a new milestone array with overrides applied:
  //  - { iso, hasTime } entries become dated (and flagged .manual)
  //  - { noDate: true } entries stay undated but flagged .reviewed,
  //    so the fixer wizard won't ask about them again.
  function apply(milestones, overridesMap) {
    return milestones.map(function (m) {
      var o = overridesMap[m.raw];
      if (!o) return m;
      if (o.noDate) {
        var reviewed = {}; for (var k in m) reviewed[k] = m[k];
        reviewed.reviewed = true;
        reviewed.date = null;
        reviewed.hasTime = false;
        return reviewed;
      }
      if (o.iso) {
        var dated = {}; for (var k2 in m) dated[k2] = m[k2];
        dated.date = new Date(o.iso);
        dated.hasTime = !!o.hasTime;
        dated.manual = true;
        return dated;
      }
      return m;
    });
  }

  return { load: load, save: save, apply: apply };
});
