var MainExpandingJs = require('../main-expanding.js');
var exitLinks = require('../components/exit-links.js');

class ExpandingBanner {
	constructor() {
		this.mainExpandingJs = new MainExpandingJs();
		this.isExpanded = false;
		this.doubleclick = $('#main-panel').hasClass('doubleclick');
	}

	init() {
		if (this.doubleclick) {
			if (Enabler.isInitialized()) {
				this.enablerInitHandler();
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.INIT, () => {
					this.enablerInitHandler();
				});
			}
		} else {
			document.getElementById('collapsed-panel').addEventListener('mouseenter', () => {
				if (!this.isExpanded) {
					this.expandStartHandler();
				}
			});

			document.getElementById('main-panel').addEventListener('mouseleave', () => {
				if (this.isExpanded) {
					this.collapseStartHandler();
				}
			});

			this.mainExpandingJs.init();
		}
	}

	enablerInitHandler() {
		Enabler.setExpandingPixelOffsets(0, 0, 640, 250);

		document.getElementById('collapsed-panel').addEventListener('mouseenter', () => {
			if (!this.isExpanded) {
				Enabler.requestExpand();
			}
		});

		document.getElementById('main-panel').addEventListener('mouseleave', () => {
			if (this.isExpanded) {
				Enabler.requestCollapse();
			}
		});

		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, () =>
			this.expandStartHandler()
		);
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, () =>
			this.expandFinishHandler()
		);
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, () =>
			this.collapseStartHandler()
		);
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, () =>
			this.collapseFinishHandler()
		);

		exitLinks();

		if (Enabler.isPageLoaded()) {
			this.mainExpandingJs.init();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, this.mainExpandingJs.init);
		}
	}

	expandStartHandler() {
		this.mainExpandingJs.expandStartAnimation(() => {
			this.doubleclick ? Enabler.finishExpand() : this.expandFinishHandler();
		});
	}

	expandFinishHandler() {
		this.mainExpandingJs.expandFinishAnimation();
		this.isExpanded = true;
	}

	collapseStartHandler() {
		this.mainExpandingJs.collapseStartAnimation(() => {
			this.doubleclick ? Enabler.finishCollapse() : this.collapseFinishHandler();
		});
	}

	collapseFinishHandler() {
		this.mainExpandingJs.collapseFinishAnimation();
		this.isExpanded = false;
	}

	actionResizeHandler() {
		this.isExpanded ? this.collapseStartHandler() : this.expandStartHandler();
	}
}

window.addEventListener('load', function() {
	const expandingBanner = new ExpandingBanner();
	expandingBanner.init();
});
