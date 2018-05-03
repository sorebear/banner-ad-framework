var mainJs = require('../main.js');
var Expanding = require('../components/expanding.js');

window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
		function enablerInitHandler() {
      var expanding = new Expanding;
      var isExpanded = false;
    
      function expandStartHandler() {
        console.log('I\'ve Started Expanding');
        expanding.expandStartAnimation(function() { Enabler.finishExpand() });
      }
    
      function expandFinishHandler() {
        console.log('I\'ve Finished Expanding');
        expanding.expandFinishAnimation();
        isExpanded = true;
      }
    
      function collapseStartHandler() {
        console.log('I\'ve Started Collapsing');
        expanding.collapseStartAnimation(function() { Enabler.finishCollapse() });
      }
    
      function collapseFinishHandler() {
        console.log('I\'ve Finished Collapsing');
        expanding.collapseFinishAnimation()
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
      
			if ($('.testLink').length) {
				$('.testLink').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					Enabler.exit('Test Link');
				});
			}
			if ($('.secondTestLink').length) {
				$('.secondTestLink').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();
					Enabler.exit('Test Link 2');
				});
			}
			if (Enabler.isPageLoaded()) {
				mainJs();
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
			}
		}

		if (Enabler.isPageLoaded()) {
			Enabler.setExpandingPixelOffsets(180, 0, 500, 250);
			enablerInitHandler();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
				enablerInitHandler();
			});
		}
	} else {
    var expanding = new Expanding;
    var isExpanded = false;

    function expandStartHandler() {
      console.log('I\'ve Started Expanding');
      expanding.expandStartAnimation(function() { expandFinishHandler() });
    }
  
    function expandFinishHandler() {
      console.log('I\'ve Finished Expanding');
      expanding.expandFinishAnimation();
      isExpanded = true;
    }
  
    function collapseStartHandler() {
      console.log('I\'ve Started Collapsing');
      expanding.collapseStartAnimation(function() { collapseFinishHandler() });
    }
  
    function collapseFinishHandler() {
      console.log('I\'ve Finished Collapsing');
      expanding.collapseFinishAnimation()
      isExpanded = false;
    }

    function actionResizeHandler() {
      isExpanded ? collapseStartHandler() : expandStartHandler();
    }

    document.getElementById('expand-button').addEventListener('click', actionResizeHandler, false);
		mainJs();
	}
});
