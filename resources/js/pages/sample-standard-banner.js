var mainJs = require('../main.js');

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
    function enablerInitHandler() {

      if ($('.testLink').length) {
  $('.testLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Test Link');
  });
}

      if (Enabler.isPageLoaded()) {
        mainJs();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
      }
    }

    if (Enabler.isInitialized()) {
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
        enablerInitHandler();
      });
    }
  } else {
    mainJs();
  }
});