var exitLinks = require('../components/exit-links.js')

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
		const enablerInitHandler = () => {
			
      exitLinks();

			if (Enabler.isPageLoaded()) {
				// Do Something When Page Loads
        
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, () => {
          // Do Something When Page Loads

        });
			}
		}

		if (Enabler.isInitialized()) {
			enablerInitHandler();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.INIT, () => {
				enablerInitHandler();
			});
		}
	} 
});
