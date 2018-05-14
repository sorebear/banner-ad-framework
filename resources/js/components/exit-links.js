module.exports = function() {
  if ($('.testLink').length) {
  $('.testLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Test Link');
  });
}if ($('.gitHub').length) {
  $('.gitHub').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('GitHub');
  });
}
}