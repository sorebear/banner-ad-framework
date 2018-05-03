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
				// Do Something When Page Loads
        
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, function() {
          // Do Something When Page Loads

        });
			}
		}

		if (Enabler.isInitialized()) {
			enablerInitHandler();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
				enablerInitHandler();
			});
		}
	} 
});
