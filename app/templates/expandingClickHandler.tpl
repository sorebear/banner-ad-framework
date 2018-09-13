document.getElementById('expand-handler').addEventListener('click', function() {
  if (!isExpanded) {
    Enabler.requestExpand();
  }
});

document.getElementById('request-handler').addEventListener('click', function() {
  if (isExpanded) {
    Enabler.requestCollapse();
  }
});