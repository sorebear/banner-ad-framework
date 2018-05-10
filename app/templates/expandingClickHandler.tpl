document.getElementById('collapsed-panel').addEventListener('click', function() {
  if (!isExpanded) {
    Enabler.requestExpand();
  }
});

document.getElementById('main-panel').addEventListener('click', function() {
  if (isExpanded) {
    Enabler.requestCollapse();
  }
});