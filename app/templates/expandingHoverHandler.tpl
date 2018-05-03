document.getElementById('collapsed-panel').addEventListener('mouseenter', function() {
  if (!isExpanded) {
    Enabler.requestExpand();
  }
});

document.getElementById('main-panel').addEventListener('mouseleave', function() {
  if (isExpanded) {
    Enabler.requestCollapse();
  }
});