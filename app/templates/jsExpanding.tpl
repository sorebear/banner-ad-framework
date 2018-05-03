var mainJs = require('../main.js');

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
    function enablerInitHandler() {
      <%exitLinks%>
      if (Enabler.isPageLoaded()) {
        mainJs();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
      }
    }

    if (Enabler.isPageLoaded()) {
      Enabler.setExpandingPixelOffsets(
        <%leftOffset%>,
        <%topOffset%>,
        <%expandedWidth%>,
        <%expandedHeight%>
      );
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