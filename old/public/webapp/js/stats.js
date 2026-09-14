/*
 * Turns a list of parsed milestones ({raw, date, hasTime}) into the set of
 * statistics the results page renders. Pure functions, no DOM access, so
 * this can be unit-tested from Node as well as run in the browser.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MilestoneStats = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DAY_MS = 24 * 60 * 60 * 1000;
  var WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function dateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function dayOnly(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // Inclusive of both endpoints, compared by calendar day (time ignored).
  function countInDateRange(dated, start, end) {
    var s = dayOnly(start).getTime();
    var e = dayOnly(end).getTime();
    var items = dated.filter(function (m) {
      var t = dayOnly(m.date).getTime();
      return t >= s && t <= e;
    });
    return { count: items.length, items: items };
  }

  function computeStats(milestones) {
    var dated = milestones.filter(function (m) { return m.date; });
    var undated = milestones.filter(function (m) { return !m.date; });
    var timed = dated.filter(function (m) { return m.hasTime; });

    dated = dated.slice().sort(function (a, b) { return a.date - b.date; });

    // --- busiest days ---
    var byDay = {};
    dated.forEach(function (m) {
      var k = dateKey(m.date);
      (byDay[k] = byDay[k] || []).push(m);
    });
    var topDays = Object.keys(byDay).map(function (k) {
      return { date: k, count: byDay[k].length, items: byDay[k] };
    }).sort(function (a, b) { return b.count - a.count || a.date.localeCompare(b.date); }).slice(0, 5);

    // --- text length ---
    var byLength = milestones.slice().sort(function (a, b) { return b.raw.length - a.raw.length; });
    var longest = byLength[0] || null;
    var shortest = byLength[byLength.length - 1] || null;
    var totalChars = milestones.reduce(function (s, m) { return s + m.raw.length; }, 0);
    var totalWords = milestones.reduce(function (s, m) { return s + (m.raw.trim() ? m.raw.trim().split(/\s+/).length : 0); }, 0);

    // --- hour histogram ---
    var hourHistogram = new Array(24).fill(0);
    timed.forEach(function (m) { hourHistogram[m.date.getHours()]++; });
    var peakHourIdx = hourHistogram.indexOf(Math.max.apply(null, hourHistogram));

    // --- day of week / month of year ---
    var dowHistogram = new Array(7).fill(0);
    var moyHistogram = new Array(12).fill(0);
    dated.forEach(function (m) {
      dowHistogram[m.date.getDay()]++;
      moyHistogram[m.date.getMonth()]++;
    });
    var peakDow = dowHistogram.indexOf(Math.max.apply(null, dowHistogram));
    var peakMoy = moyHistogram.indexOf(Math.max.apply(null, moyHistogram));

    // --- per-year counts ---
    var byYear = {};
    dated.forEach(function (m) {
      var y = m.date.getFullYear();
      byYear[y] = (byYear[y] || 0) + 1;
    });
    var years = Object.keys(byYear).map(Number).sort(function (a, b) { return a - b; });
    var yearCounts = years.map(function (y) { return { year: y, count: byYear[y] }; });

    // --- gaps between consecutive dated milestones ---
    var gaps = [];
    for (var i = 1; i < dated.length; i++) {
      var days = (dayOnly(dated[i].date) - dayOnly(dated[i - 1].date)) / DAY_MS;
      gaps.push({ days: days, from: dated[i - 1], to: dated[i] });
    }
    var avgGapDays = gaps.length ? gaps.reduce(function (s, g) { return s + g.days; }, 0) / gaps.length : null;
    var longestGap = gaps.length ? gaps.reduce(function (a, b) { return b.days > a.days ? b : a; }) : null;

    // --- longest streak of consecutive calendar days with >=1 milestone ---
    var uniqueDayTimes = Object.keys(byDay).map(function (k) {
      var parts = k.split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2]).getTime();
    }).sort(function (a, b) { return a - b; });
    var longestStreak = uniqueDayTimes.length ? 1 : 0;
    var curStreak = uniqueDayTimes.length ? 1 : 0;
    var streakEnd = uniqueDayTimes[0];
    var bestStreakEnd = uniqueDayTimes[0];
    for (var j = 1; j < uniqueDayTimes.length; j++) {
      if (uniqueDayTimes[j] - uniqueDayTimes[j - 1] === DAY_MS) {
        curStreak++;
      } else {
        curStreak = 1;
      }
      if (curStreak > longestStreak) {
        longestStreak = curStreak;
        bestStreakEnd = uniqueDayTimes[j];
      }
    }
    var longestStreakEndDate = uniqueDayTimes.length ? new Date(bestStreakEnd) : null;
    var longestStreakStartDate = longestStreakEndDate ? new Date(bestStreakEnd - (longestStreak - 1) * DAY_MS) : null;

    // --- weekend vs weekday, am vs pm ---
    var weekend = dated.filter(function (m) { var d = m.date.getDay(); return d === 0 || d === 6; }).length;
    var weekday = dated.length - weekend;
    var am = timed.filter(function (m) { return m.date.getHours() < 12; }).length;
    var pm = timed.length - am;

    // --- specific requested ranges ---
    var midnightTo6am = timed.filter(function (m) { return m.date.getHours() < 6; }).length;
    var twoTo4am = timed.filter(function (m) { return m.date.getHours() >= 2 && m.date.getHours() < 4; }).length;
    var july2025 = countInDateRange(dated, new Date(2025, 6, 24), new Date(2025, 6, 28)).count;
    var july2024 = countInDateRange(dated, new Date(2024, 6, 23), new Date(2024, 6, 27)).count;

    return {
      total: milestones.length,
      datedCount: dated.length,
      undatedCount: undated.length,
      timedCount: timed.length,
      undated: undated,
      dated: dated,

      topDays: topDays,
      busiestDay: topDays[0] || null,

      longest: longest,
      shortest: shortest,
      avgChars: milestones.length ? totalChars / milestones.length : 0,
      avgWords: milestones.length ? totalWords / milestones.length : 0,

      hourHistogram: hourHistogram,
      peakHour: { hour: peakHourIdx, count: hourHistogram[peakHourIdx] },
      midnightTo6am: midnightTo6am,
      twoTo4am: twoTo4am,

      dowHistogram: dowHistogram,
      peakDow: { day: WEEKDAY_NAMES[peakDow], count: dowHistogram[peakDow] },

      moyHistogram: moyHistogram,
      peakMoy: { month: MONTH_NAMES[peakMoy], count: moyHistogram[peakMoy] },

      yearCounts: yearCounts,
      firstYear: years[0] || null,
      lastYear: years[years.length - 1] || null,

      avgGapDays: avgGapDays,
      longestGap: longestGap,
      longestStreak: { length: longestStreak, start: longestStreakStartDate, end: longestStreakEndDate },

      weekend: weekend,
      weekday: weekday,
      am: am,
      pm: pm,

      july2025Range: july2025,
      july2024Range: july2024
    };
  }

  return {
    computeStats: computeStats,
    countInDateRange: countInDateRange,
    WEEKDAY_NAMES: WEEKDAY_NAMES,
    MONTH_NAMES: MONTH_NAMES
  };
});
