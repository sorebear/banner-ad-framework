module.exports = function() {
  if (document.getElementsByClassName('testLink').length) {
  document.querySelectorAll('.testLink').forEach(exitLink => {
    exitLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('Test Link');
    });
  });
}if (document.getElementsByClassName('testBrokenLink').length) {
  document.querySelectorAll('.testBrokenLink').forEach(exitLink => {
    exitLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('Test Broken Link');
    });
  });
}
}