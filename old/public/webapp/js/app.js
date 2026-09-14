(function () {
  'use strict';

  var textarea = document.getElementById('milestone-input');
  var lineCount = document.getElementById('line-count');
  var analyzeBtn = document.getElementById('analyze-btn');
  var fileInput = document.getElementById('file-input');
  var errorBanner = document.getElementById('error-banner');

  var STORAGE_KEY = 'milestoneAnalyzer.rawText';

  // Restore whatever was last analyzed, so "back" from the results page doesn't lose it.
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  if (saved) textarea.value = saved;

  function countNonEmptyLines(text) {
    return text.split(/\r?\n/).filter(function (l) { return l.trim().length > 0; }).length;
  }

  function updateLineCount() {
    lineCount.textContent = countNonEmptyLines(textarea.value);
  }
  updateLineCount();
  textarea.addEventListener('input', updateLineCount);

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      textarea.value = String(reader.result);
      updateLineCount();
    };
    reader.onerror = function () {
      showError('Could not read that file. Try pasting the text instead.');
    };
    reader.readAsText(file);
  });

  function showError(msg) {
    errorBanner.textContent = msg;
    errorBanner.classList.add('visible');
  }
  function clearError() {
    errorBanner.classList.remove('visible');
  }

  analyzeBtn.addEventListener('click', function () {
    clearError();
    var raw = textarea.value;
    if (!raw.trim()) {
      showError('Paste some milestones first — one event per line.');
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, raw);
    } catch (e) {
      showError('Could not save your input locally (' + e.message + '). Try a shorter list.');
      return;
    }
    window.location.href = 'results.html';
  });
})();
