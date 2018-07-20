module.exports = function() {
  if ($('.testLink').length) {
  $('.testLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Test Link');
  });
}if ($('.testBrokenLink').length) {
  $('.testBrokenLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Test Broken Link');
  });
}
}