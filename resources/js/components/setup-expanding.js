var MainExpandingJs = require('../main-expanding.js');
var exitLinks = require('../components/exit-links.js');

module.exports = class ExpandingBanner {
	constructor(setExpandingPixelOffsets) {
		this.mainExpandingJs = new MainExpandingJs();
		this.isExpanded = false;
    this.doubleclick = document.getElementById('main-panel').classList.contains('doubleclick');
    this.setExpandingPixelOffsets = setExpandingPixelOffsets;
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
			document.getElementById('expand-handler').addEventListener('click', () => {
				if (!this.isExpanded) { this.expandStartHandler(); }
			});
	
			document.getElementById('main-panel').addEventListener('click', () => {
				if (this.isExpanded) { this.collapseStartHandler(); }
			});
	
			this.mainExpandingJs.init();
		}
	}

	enablerInitHandler() {
    this.setExpandingPixelOffsets();

		document.getElementById('collapsed-panel').addEventListener('click', () => {
			if (!this.isExpanded) { Enabler.requestExpand(); }
		});

		document.getElementById('main-panel').addEventListener('click', () => {
			if (this.isExpanded) { Enabler.requestCollapse(); }
		});

		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, () => this.expandStartHandler());
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, () => this.expandFinishHandler());
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, () => this.collapseStartHandler());
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, () => this.collapseFinishHandler());

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
}