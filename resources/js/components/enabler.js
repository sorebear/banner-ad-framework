module.exports = function enablerInitHandler(callback) {
  if ($('.testLink').length) {
  $('.testLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Test Link');
  });
}if ($('.secondTestLink').length) {
  $('.secondTestLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Second Test Link');
  });
}
  if (Enabler.isPageLoaded()) {
    callback()
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, callback());
  }
}