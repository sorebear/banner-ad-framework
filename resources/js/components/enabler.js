module.exports = function enabler(callback) {
  function enablerInitHandler(callback) {
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
    Enabler.exit('Test Link 2');
  });
}
    if (Enabler.isPageLoaded()) {
      callback()
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, callback);
    }
  }

  if (Enabler.isPageLoaded()) {
    enablerInitHandler(callback);
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
      enablerInitHandler(callback);
    });
  }
}