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
  
      function actionResizeHandler() {
        isExpanded ? Enabler.requestCollapse() : Enabler.requestExpand();
      }

      document.getElementById('expand-button').addEventListener('click', actionResizeHandler, false);
      Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandStartHandler);
      Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, expandFinishHandler);
      Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseStartHandler);
      Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, collapseFinishHandler);

      <%exitLinks%>

			if (Enabler.isPageLoaded()) {
				mainExpandingJs.init();
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainExpandingJs.init);
			}
    }

    if (Enabler.isInitialized()) {
      Enabler.setExpandingPixelOffsets(
        <%leftOffset%>,
        <%topOffset%>,
        <%expandedWidth%>,
        <%expandedHeight%>
      );
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
        Enabler.setExpandingPixelOffsets(
          <%leftOffset%>,
          <%topOffset%>,
          <%expandedWidth%>,
          <%expandedHeight%>
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

    document.getElementById('expand-button').addEventListener('click', actionResizeHandler, false);
		mainExpandingJs.init();
  }
});