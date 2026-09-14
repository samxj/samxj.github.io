(function () {
  'use strict';

  var overlay = document.getElementById('jumpscare-overlay');
  if (!overlay) return;

  var MIN_DELAY = 7000;
  var MAX_DELAY = 30000;
  var VISIBLE_MS = 3000;

  function randomDelay() {
    return MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  }

  function scheduleNext() {
    setTimeout(showEmoji, randomDelay());
  }

  function showEmoji() {
    overlay.classList.add('visible');
    setTimeout(function () {
      overlay.classList.remove('visible');
      scheduleNext();
    }, VISIBLE_MS);
  }

  scheduleNext();
})();
