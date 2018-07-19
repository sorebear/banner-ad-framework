var mainJs = require('../main.js');
var exitLinks = require('../components/exit-links.js');

function enablerInitHandler() {
	exitLinks();

	if (Enabler.isPageLoaded()) {
		mainJs();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
	}
}

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
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
