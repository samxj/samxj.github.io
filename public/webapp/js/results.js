(function () {
  'use strict';

  var STORAGE_KEY = 'milestoneAnalyzer.rawText';
  var raw = null;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }

  if (!raw || !raw.trim()) {
    document.getElementById('empty-state').style.display = 'block';
    return;
  }

  var milestones = MilestoneParser.parseMilestones(raw);
  var overridesMap = MilestoneOverrides.load();
  milestones = MilestoneOverrides.apply(milestones, overridesMap);
  var stats = MilestoneStats.computeStats(milestones);
  var WD = MilestoneStats.WEEKDAY_NAMES;
  var MO = MilestoneStats.MONTH_NAMES;

  document.getElementById('page-content').style.display = 'block';

  // Re-render with fresh CSS variables if the OS theme flips mid-session.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    location.reload();
  });

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  var COLOR = {
    series: cssVar('--series-1'),
    seriesWash: cssVar('--series-1-wash'),
    accent: cssVar('--accent-orange'),
    grid: cssVar('--gridline'),
    baseline: cssVar('--baseline'),
    textMuted: cssVar('--text-muted'),
    textSecondary: cssVar('--text-secondary'),
    surface: cssVar('--surface-1')
  };

  function fmtDate(d) {
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  }
  function fmtDateShort(d) {
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function fmtTime(d) {
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
  function fmtHour(h) {
    var period = h < 12 ? 'am' : 'pm';
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + period;
  }
  function round1(n) { return Math.round(n * 10) / 10; }
  function pct(part, whole) { return whole ? Math.round((part / whole) * 100) : 0; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- Summary pills ----------
  var summaryBar = document.getElementById('summary-bar');
  function pill(label, value) {
    var d = document.createElement('div');
    d.className = 'summary-pill';
    d.innerHTML = '<b>' + esc(value) + '</b> ' + esc(label);
    return d;
  }
  summaryBar.appendChild(pill('total lines', stats.total));
  summaryBar.appendChild(pill('dated', stats.datedCount));
  summaryBar.appendChild(pill('undated', stats.undatedCount));
  summaryBar.appendChild(pill('with a time', stats.timedCount));
  if (stats.firstYear) summaryBar.appendChild(pill('span', stats.firstYear + '–' + stats.lastYear));
  var inferredCount = milestones.filter(function (m) { return m.inferredYear; }).length;
  if (inferredCount) summaryBar.appendChild(pill('year inferred from context', inferredCount));

  // ---------- Stat tiles ----------
  var grid = document.getElementById('stat-grid');
  function tile(label, value, sub, accent) {
    var d = document.createElement('div');
    d.className = 'stat-tile' + (accent ? ' accent' : '');
    d.innerHTML =
      '<p class="label">' + esc(label) + '</p>' +
      '<div class="value">' + value + '</div>' +
      (sub ? '<p class="sub">' + sub + '</p>' : '');
    grid.appendChild(d);
  }

  if (stats.busiestDay) {
    tile('Busiest single day', stats.busiestDay.count + ' milestones', esc(fmtDateShort(stats.busiestDay.items[0].date)), true);
  }
  if (stats.longest) {
    tile('Longest milestone', stats.longest.raw.length + ' chars', esc(stats.longest.raw.slice(0, 90)) + (stats.longest.raw.length > 90 ? '…' : ''));
  }
  tile('Peak time of day', fmtHour(stats.peakHour.hour) + '–' + fmtHour((stats.peakHour.hour + 1) % 24), stats.peakHour.count + ' timed milestones in that hour', true);
  tile('Busiest day of week', stats.peakDow.day, stats.peakDow.count + ' milestones (' + pct(stats.peakDow.count, stats.datedCount) + '%)');
  tile('Busiest month', stats.peakMoy.month, stats.peakMoy.count + ' milestones across all years');
  if (stats.longestStreak.length > 1) {
    tile('Longest daily streak', stats.longestStreak.length + ' days', esc(fmtDateShort(stats.longestStreak.start)) + ' → ' + esc(fmtDateShort(stats.longestStreak.end)));
  }
  if (stats.avgGapDays !== null) {
    tile('Average gap between milestones', round1(stats.avgGapDays) + ' days', null);
  }
  if (stats.longestGap) {
    tile('Longest gap', Math.round(stats.longestGap.days) + ' days', esc(fmtDateShort(stats.longestGap.from.date)) + ' → ' + esc(fmtDateShort(stats.longestGap.to.date)));
  }
  tile('Weekend vs weekday', pct(stats.weekend, stats.datedCount) + '% weekend', stats.weekend + ' on Sat/Sun, ' + stats.weekday + ' on weekdays');
  if (stats.timedCount) {
    tile('Morning vs evening', pct(stats.am, stats.timedCount) + '% before noon', stats.am + ' AM, ' + stats.pm + ' PM');
  }
  tile('Midnight – 6am', stats.midnightTo6am, pct(stats.midnightTo6am, stats.timedCount) + '% of timed milestones', true);
  tile('2am – 4am', stats.twoTo4am, pct(stats.twoTo4am, stats.timedCount) + '% of timed milestones', true);
  tile('24–28 Jul 2025', stats.july2025Range, 'milestones in that window', true);
  tile('23–27 Jul 2024', stats.july2024Range, 'milestones in that window', true);
  tile('Average length', round1(stats.avgWords) + ' words', round1(stats.avgChars) + ' characters on average');

  // ---------- Custom range tool ----------
  var rangeStart = document.getElementById('range-start');
  var rangeEnd = document.getElementById('range-end');
  var rangeResult = document.getElementById('range-result');

  function toInputDate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  rangeStart.value = toInputDate(new Date(2025, 6, 24));
  rangeEnd.value = toInputDate(new Date(2025, 6, 28));

  function updateRange() {
    if (!rangeStart.value || !rangeEnd.value) return;
    var s = new Date(rangeStart.value + 'T00:00:00');
    var e = new Date(rangeEnd.value + 'T00:00:00');
    if (s > e) { rangeResult.textContent = 'Start date is after end date.'; return; }
    var result = MilestoneStats.countInDateRange(stats.dated, s, e);
    rangeResult.innerHTML = '<b>' + result.count + '</b> milestone' + (result.count === 1 ? '' : 's') + ' between ' + esc(fmtDateShort(s)) + ' and ' + esc(fmtDateShort(e));
  }
  rangeStart.addEventListener('change', updateRange);
  rangeEnd.addEventListener('change', updateRange);
  updateRange();

  // ---------- Chart helpers ----------
  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  Chart.defaults.color = COLOR.textSecondary;

  function barColors(values) {
    var max = Math.max.apply(null, values);
    return values.map(function (v) { return v === max && v > 0 ? COLOR.accent : COLOR.series; });
  }

  function makeBarChart(canvasId, labels, values, opts) {
    opts = opts || {};
    var ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: opts.highlightMax === false ? COLOR.series : barColors(values),
          borderRadius: 4,
          borderSkipped: 'bottom',
          maxBarThickness: 24
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            border: { color: COLOR.baseline },
            ticks: { autoSkip: opts.autoSkip !== false, maxRotation: 0 }
          },
          y: {
            beginAtZero: true,
            grid: { color: COLOR.grid },
            border: { display: false },
            ticks: { precision: 0 }
          }
        }
      }
    });
  }

  function renderTable(containerId, headers, rows) {
    var html = '<table><thead><tr>' + headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>';
    rows.forEach(function (r) {
      html += '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById(containerId).innerHTML = html;
  }

  // ---------- Year chart ----------
  var yearLabels = stats.yearCounts.map(function (y) { return String(y.year); });
  var yearValues = stats.yearCounts.map(function (y) { return y.count; });
  makeBarChart('chart-year', yearLabels, yearValues);
  renderTable('table-year', ['Year', 'Milestones'], stats.yearCounts.map(function (y) { return [y.year, y.count]; }));

  // ---------- Month of year chart ----------
  var moyLabels = MO.map(function (m) { return m.slice(0, 3); });
  makeBarChart('chart-month', moyLabels, stats.moyHistogram);
  renderTable('table-month', ['Month', 'Milestones'], MO.map(function (m, i) { return [m, stats.moyHistogram[i]]; }));

  // ---------- Hour of day chart ----------
  var hourLabels = stats.hourHistogram.map(function (_, h) { return fmtHour(h); });
  makeBarChart('chart-hour', hourLabels, stats.hourHistogram, { autoSkip: true });
  renderTable('table-hour', ['Hour', 'Milestones'], stats.hourHistogram.map(function (c, h) { return [fmtHour(h) + '–' + fmtHour((h + 1) % 24), c]; }));
  document.getElementById('timed-count-note').textContent = stats.timedCount + ' of ' + stats.datedCount + ' dated milestones';

  // ---------- Day of week chart ----------
  var dowOrder = [1, 2, 3, 4, 5, 6, 0]; // Monday-first
  var dowLabels = dowOrder.map(function (i) { return WD[i].slice(0, 3); });
  var dowValues = dowOrder.map(function (i) { return stats.dowHistogram[i]; });
  makeBarChart('chart-dow', dowLabels, dowValues);
  renderTable('table-dow', ['Day', 'Milestones'], dowOrder.map(function (i) { return [WD[i], stats.dowHistogram[i]]; }));

  // ---------- Busiest days list ----------
  var busiestList = document.getElementById('busiest-day-list');
  function itemLabel(m) {
    var tag = m.manual ? ' <span class="manual-tag">(added)</span>'
      : m.inferredYear ? ' <span class="inferred-tag">(year inferred)</span>' : '';
    return esc(m.raw.slice(0, 50)) + tag;
  }
  stats.topDays.forEach(function (day) {
    var li = document.createElement('li');
    li.innerHTML = '<span class="when">' + esc(fmtDateShort(day.items[0].date)) + '</span><b>' + day.count + '</b> milestones — ' +
      day.items.slice(0, 3).map(itemLabel).join('; ') + (day.items.length > 3 ? '…' : '');
    busiestList.appendChild(li);
  });

  // ---------- Undated list ----------
  document.getElementById('undated-count').textContent = stats.undatedCount;
  var undatedList = document.getElementById('undated-list');
  stats.undated.forEach(function (m) {
    var li = document.createElement('li');
    li.textContent = m.raw;
    if (m.reviewed) {
      li.className = 'reviewed';
      li.innerHTML = esc(m.raw) + ' <span class="reviewed-tag">— confirmed no date</span>';
    }
    undatedList.appendChild(li);
  });

  // ---------- Undated fixer wizard ----------
  var fixableList = stats.undated.filter(function (m) { return !m.reviewed; });
  var fixBtn = document.getElementById('fix-undated-btn');
  var fixerNote = document.getElementById('fixer-note');

  if (fixableList.length === 0) {
    fixBtn.disabled = true;
    fixBtn.textContent = stats.undatedCount ? 'All undated lines reviewed' : 'Nothing to fix';
    fixerNote.textContent = stats.undatedCount ? 'Every undated line has either a date now or a confirmed "no date."' : '';
  } else {
    fixerNote.textContent = fixableList.length + ' of ' + stats.undatedCount + ' can be given a date.';
  }

  var overlay = document.getElementById('wizard-overlay');
  var progressEl = document.getElementById('wizard-progress');
  var rawEl = document.getElementById('wizard-raw');
  var dateInput = document.getElementById('wizard-date');
  var timeInput = document.getElementById('wizard-time');
  var saveBtn = document.getElementById('wizard-save');
  var noDateBtn = document.getElementById('wizard-nodate');
  var skipBtn = document.getElementById('wizard-skip');
  var closeBtn = document.getElementById('wizard-close');

  var wizardIdx = 0;
  var pendingOverrides = {};

  function showCurrent() {
    if (wizardIdx >= fixableList.length) { closeWizard(); return; }
    var m = fixableList[wizardIdx];
    progressEl.textContent = (wizardIdx + 1) + ' of ' + fixableList.length;
    rawEl.textContent = m.raw;
    dateInput.value = '';
    timeInput.value = '';
    dateInput.focus();
  }

  function advance() { wizardIdx++; showCurrent(); }

  function openWizard() {
    wizardIdx = 0;
    pendingOverrides = {};
    overlay.style.display = 'flex';
    showCurrent();
    document.addEventListener('keydown', onKeydown);
  }

  function closeWizard() {
    overlay.style.display = 'none';
    document.removeEventListener('keydown', onKeydown);
    if (Object.keys(pendingOverrides).length) {
      var merged = MilestoneOverrides.load();
      for (var k in pendingOverrides) merged[k] = pendingOverrides[k];
      MilestoneOverrides.save(merged);
      location.reload();
    }
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeWizard();
    else if (e.key === 'Enter' && (e.target === dateInput || e.target === timeInput)) saveBtn.click();
  }

  fixBtn.addEventListener('click', function () { if (!fixBtn.disabled) openWizard(); });
  closeBtn.addEventListener('click', closeWizard);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeWizard(); });

  saveBtn.addEventListener('click', function () {
    if (!dateInput.value) { dateInput.focus(); return; }
    var m = fixableList[wizardIdx];
    var iso = dateInput.value + 'T' + (timeInput.value || '00:00') + ':00';
    pendingOverrides[m.raw] = { iso: iso, hasTime: !!timeInput.value };
    advance();
  });
  noDateBtn.addEventListener('click', function () {
    var m = fixableList[wizardIdx];
    pendingOverrides[m.raw] = { noDate: true };
    advance();
  });
  skipBtn.addEventListener('click', advance);
})();
