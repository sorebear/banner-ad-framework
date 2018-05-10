var MainExpandingJs = require('../main-expanding.js');

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
    function enablerInitHandler() {
      var mainExpandingJs = new MainExpandingJs;
      var isExpanded = false;
    
      function expandStartHandler() {
        mainExpandingJs.expandStartAnimation(function() { Enabler.finishExpand() });
      }
    
      function expandFinishHandler() {
        mainExpandingJs.expandFinishAnimation();
        isExpanded = true;
      }
    
      function collapseStartHandler() {
        mainExpandingJs.collapseStartAnimation(function() { Enabler.finishCollapse() });
      }
    
      function collapseFinishHandler() {
        mainExpandingJs.collapseFinishAnimation()
        isExpanded = false;
      }
  
      document.getElementById('collapsed-panel').addEventListener('click', function() {
        if (!isExpanded) {
          Enabler.requestExpand();
        }
      });

      document.getElementById('main-panel').addEventListener('<%collapseEventListener%>', function() {
        if (isExpanded) {
          Enabler.requestCollapse();
        }
      });

      Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
      Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
      Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
      Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);

      if ($('.testLink').length) {
  $('.testLink').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('Test Link');
  });
}

			if (Enabler.isPageLoaded()) {
				mainExpandingJs.init();
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainExpandingJs.init);
			}
    }

    if (Enabler.isInitialized()) {
      Enabler.setExpandingPixelOffsets(
        180,
        250,
        500,
        500
      );
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
        Enabler.setExpandingPixelOffsets(
          180,
          250,
          500,
          500
        );
        enablerInitHandler();
      });
    }
  } else {
    var mainExpandingJs = new MainExpandingJs;
    var isExpanded = false;

    function expandStartHandler() {
      mainExpandingJs.expandStartAnimation(function() { expandFinishHandler() });
    }
  
    function expandFinishHandler() {
      mainExpandingJs.expandFinishAnimation();
      isExpanded = true;
    }
  
    function collapseStartHandler() {
      mainExpandingJs.collapseStartAnimation(function() { collapseFinishHandler() });
    }
  
    function collapseFinishHandler() {
      mainExpandingJs.collapseFinishAnimation()
      isExpanded = false;
    }

    function actionResizeHandler() {
      isExpanded ? collapseStartHandler() : expandStartHandler();
    }

    document.getElementById('collapsed-panel').addEventListener('click', function() {
      if (!isExpanded) {
        expandStartHandler();
      }
    });

    document.getElementById('main-panel').addEventListener('<%collapseEventListener%>', function() {
      if (isExpanded) {
        collapseStartHandler();
      }
    });

		mainExpandingJs.init();
  }
});