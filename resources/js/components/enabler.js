module.exports = function enablerr(callback) {
  function enablerInitHandler(callback) {
    if ($('.testLink').length) {
      $('.testLink').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        Enabler.exit('Test Link');
      });
    }
    if ($('.secondTestLink').length) {
      $('.secondTestLink').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        Enabler.exit('Second Test Link');
      });
    }
    if (Enabler.isPageLoaded()) {
      callback()
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, callback);
    }
  }

  if (Enabler.isInitialized()) {
		enablerInitHandler(callback);
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, function() { 
			enablerInitHandler(callback); 
		});
	}
}