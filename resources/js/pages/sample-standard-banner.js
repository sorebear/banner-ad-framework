var mainJs = require('../main.js');
var exitLinks = require('../components/exit-links.js');

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
    const enablerInitHandler = () => {

      exitLinks();

      if (Enabler.isPageLoaded()) {
        mainJs();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
      }
    }

    if (Enabler.isInitialized()) {
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, () => {
        enablerInitHandler();
      });
    }
  } else {
    mainJs();
  }
});