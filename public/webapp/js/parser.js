/*
 * Milestone parsing engine.
 *
 * Ports the intent of the Python script's fuzzy date extraction, but is
 * deliberately more forgiving: dateutil's fuzzy=True parser (used in
 * gui_miles_chatgpt.py) throws away any line that has "too much" extra text
 * around the date and ends up discarding roughly a third of real entries.
 * This version tokenizes each line and looks for a weekday-independent
 * month + day + year combination near a recognised month name, plus an
 * optional clock time anywhere in the line, so messy real-world journal
 * lines still resolve to a date.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.MilestoneParser = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MONTHS = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11
  };

  var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var MONTH_NAMES = Object.keys(MONTHS).sort(function (a, b) { return b.length - a.length; }).join('|');
  var MONTH_PREFIX_RE = new RegExp('^(' + MONTH_NAMES + ')(\\d{1,4})$', 'i');

  function cleanToken(tok) {
    return tok.replace(/^[^\w]+|[^\w]+$/g, '');
  }

  // Finds the first clock time in the line. Handles am/pm (with or without
  // dots/spaces, e.g. "8:06 a.m.", "19:14 P.M", "10:52:34pm") and falls back
  // to a bare 24-hour reading (e.g. "18:58").
  function extractTime(line) {
    var m = line.match(/\b(\d{1,2}):([0-5]\d)(?::([0-5]\d))?\s*([apAP])\.?\s*[mM]\.?/);
    if (m) {
      var h = parseInt(m[1], 10);
      var mins = parseInt(m[2], 10);
      var secs = m[3] ? parseInt(m[3], 10) : 0;
      var isPM = m[4].toLowerCase() === 'p';
      if (h === 12) h = isPM ? 12 : 0;
      else if (isPM) h += 12;
      if (h <= 23) return { hour: h, minute: mins, second: secs };
    }
    m = line.match(/\b([01]?\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?\b/);
    if (m) {
      return { hour: parseInt(m[1], 10), minute: parseInt(m[2], 10), second: m[3] ? parseInt(m[3], 10) : 0 };
    }
    // dot-separated 12-hour form, e.g. "1.40pm"
    m = line.match(/\b(\d{1,2})\.([0-5]\d)\s*([apAP])\.?\s*[mM]\.?/);
    if (m) {
      var h2 = parseInt(m[1], 10);
      var isPM2 = m[3].toLowerCase() === 'p';
      if (h2 === 12) h2 = isPM2 ? 12 : 0;
      else if (isPM2) h2 += 12;
      if (h2 <= 23) return { hour: h2, minute: parseInt(m[2], 10), second: 0 };
    }
    return null;
  }

  // Finds a {year, month, day} near the first usable month-name token.
  // Also handles month names glued directly to a trailing number with no
  // separating space (e.g. "Oct2024", "Sept1"). If a month+day is found but
  // no year appears anywhere in the line, returns {year: null, month, day}
  // instead of discarding the match — the caller can fill the year in from
  // context (see parseMilestones' year inheritance).
  function extractDate(line) {
    var rawTokens = line.split(/\s+/);
    var tokens = rawTokens.map(cleanToken);
    var yearlessCandidate = null;

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i].toLowerCase();
      var month, embeddedDay = null, embeddedYear = null;

      if (t in MONTHS) {
        month = MONTHS[t];
      } else {
        var pm = t.match(MONTH_PREFIX_RE);
        if (!pm) continue;
        month = MONTHS[pm[1]];
        var embedded = parseInt(pm[2], 10);
        if (pm[2].length === 4 && embedded >= 1900 && embedded <= 2099) embeddedYear = embedded;
        else if (pm[2].length <= 2 && embedded >= 1 && embedded <= 31) embeddedDay = embedded;
        else continue;
      }

      var day = embeddedDay !== null ? embeddedDay
        : findNearbyNumber(tokens, i, 3, /^(\d{1,2})(st|nd|rd|th)?$/i, 1, 31);
      if (day === null) continue;

      var year = embeddedYear;
      if (year === null) year = findNearbyNumber(tokens, i, 4, /^(\d{4})$/, 1900, 2099);
      if (year === null) year = findAnyYear(tokens);
      if (year === null) {
        // last resort: a bare 2-digit year token close to the month (e.g. "May 23")
        var y2 = findNearbyNumber(tokens, i, 2, /^(\d{2})$/, 0, 99, day);
        if (y2 !== null) year = y2 <= 79 ? 2000 + y2 : 1900 + y2;
      }

      if (year !== null) return { year: year, month: month, day: day };
      if (yearlessCandidate === null) yearlessCandidate = { year: null, month: month, day: day };
    }

    return extractSlashDate(line) || yearlessCandidate;
  }

  function findNearbyNumber(tokens, centerIdx, radius, regex, min, max, excludeVal) {
    var order = [];
    for (var d = 1; d <= radius; d++) {
      if (centerIdx - d >= 0) order.push(centerIdx - d);
      if (centerIdx + d < tokens.length) order.push(centerIdx + d);
    }
    order.sort(function (a, b) { return Math.abs(a - centerIdx) - Math.abs(b - centerIdx); });

    for (var k = 0; k < order.length; k++) {
      var cand = tokens[order[k]];
      var mm = cand.match(regex);
      if (mm) {
        var val = parseInt(mm[1], 10);
        if (val >= min && val <= max && val !== excludeVal) return val;
      }
    }
    return null;
  }

  // Fallback for numeric dates with no month name, e.g. "1/1/2024" or
  // "31/12/2023". Assumes day/month/year ordering (UK convention).
  function extractSlashDate(line) {
    var m = line.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/);
    if (!m) return null;
    var a = parseInt(m[1], 10);
    var b = parseInt(m[2], 10);
    var year = parseInt(m[3], 10);
    if (m[3].length === 2) year = year <= 79 ? 2000 + year : 1900 + year;

    var day = a, month = b;
    if (month > 12 && day <= 12) { day = b; month = a; } // swap if only that order is valid
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;

    return { year: year, month: month - 1, day: day };
  }

  function findAnyYear(tokens) {
    for (var i = 0; i < tokens.length; i++) {
      var mm = tokens[i].match(/^(\d{4})$/);
      if (mm) {
        var val = parseInt(mm[1], 10);
        if (val >= 1900 && val <= 2099) return val;
      }
    }
    return null;
  }

  // "New Year" / "New Year's Day" mentioned alongside a bare 4-digit year,
  // with no month name in the line, is treated as Jan 1 of that year.
  function extractNewYear(line) {
    if (!/new\s+year'?s?(\s+day)?/i.test(line)) return null;
    var tokens = line.split(/\s+/).map(cleanToken);
    var year = findAnyYear(tokens);
    if (year === null) return null;
    return { year: year, month: 0, day: 1 };
  }

  // Builds a validated Date, rejecting combinations JS would silently roll
  // over (e.g. Feb 30 -> Mar 2, or Feb 29 in a non-leap year).
  function makeValidDate(year, month, day, timePart) {
    var dt = new Date(
      year, month, day,
      timePart ? timePart.hour : 0,
      timePart ? timePart.minute : 0,
      timePart ? timePart.second : 0
    );
    if (dt.getMonth() !== month || dt.getFullYear() !== year || dt.getDate() !== day) return null;
    return dt;
  }

  function extractDateTime(line) {
    var datePart = extractDate(line) || extractNewYear(line);
    if (!datePart) return null;

    var timePart = extractTime(line);

    if (datePart.year === null) {
      return { yearless: true, month: datePart.month, day: datePart.day, timePart: timePart };
    }

    var dt = makeValidDate(datePart.year, datePart.month, datePart.day, timePart);
    if (!dt) return null;

    return { date: dt, hasTime: !!timePart };
  }

  // Parses every non-empty line, then fills in the year for any "4 May"
  // style entry that had no year of its own: it inherits the year of the
  // closest preceding line that resolved to a full date, skipping over any
  // lines in between that have no date at all.
  function parseMilestones(rawText) {
    var lines = rawText.split(/\r?\n/);
    var milestones = [];
    var lastKnownYear = null;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var parsed = extractDateTime(line);

      if (!parsed) {
        milestones.push({ raw: line, date: null, hasTime: false });
      } else if (parsed.yearless) {
        var inherited = lastKnownYear !== null
          ? makeValidDate(lastKnownYear, parsed.month, parsed.day, parsed.timePart)
          : null;
        milestones.push({
          raw: line,
          date: inherited,
          hasTime: inherited ? !!parsed.timePart : false,
          inferredYear: !!inherited
        });
      } else {
        milestones.push({ raw: line, date: parsed.date, hasTime: parsed.hasTime });
        lastKnownYear = parsed.date.getFullYear();
      }
    }
    return milestones;
  }

  return {
    parseMilestones: parseMilestones,
    extractDateTime: extractDateTime,
    extractDate: extractDate,
    extractTime: extractTime,
    WEEKDAYS: WEEKDAYS
  };
});
