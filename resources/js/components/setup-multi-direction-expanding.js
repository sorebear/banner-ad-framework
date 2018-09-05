const MainMultiDirectionExpanding = require('../main-multi-direction-expanding.js');
const exitLinks = require('./exit-links.js');

/*
domExpandHandler is the DOM element listening for an event to trigger banner expansion
domCollapseHandles is the DOM element listening for an event to trigger banner collapse
eventListenerType is the EVENT the expand and collapse handlers are listening for 
*/
const domExpandHandlerId = 'expand-handler';
const domCollapseHandlerId = 'collapse-handler';
const eventListenerType = 'click';


module.exports = class SetupMultiDirectionExpandingBanner {
	constructor(setExpandingPixelOffsets) {
		this.mainMultiExpandingDirectionJs = new MainMultiDirectionExpanding();
		this.isExpanded = false;
		this.inTransition = false;
		this.$politeLoadImg = $('#polite-load-img');
		this.doubleclick = $('#main-panel').hasClass('doubleclick');
		this.localExpandDirection = 0;
		this.politeLoad = this.politeLoad.bind(this);
		this.enablerInitHandler = this.enablerInitHandler.bind(this);
		this.setExpandingPixelOffsets = setExpandingPixelOffsets;
	}

	init() {
		if (this.doubleclick) {
			if (Enabler.isInitialized()) {
				this.enablerInitHandler();
			} else {
				Enabler.addEventListener(studio.events.StudioEvent.INIT, this.enablerInitHandler);
			}
		} else {
			this.politeLoad();
		}
	}

	politeLoad() {
		this.addDomEventListeners();
		if (this.$politeLoadImg.length) { this.$politeLoadImg.hide(); }
		this.mainMultiExpandingDirectionJs.init();
	}
  
	addDomEventListeners() {
		const domExpandHandler = document.getElementById(domExpandHandlerId);
		if (domExpandHandler) {
			domExpandHandler.addEventListener(eventListenerType, () => {
				console.log(`I've been clicked`);
				if (!this.isExpanded && !this.inTransition) {
					this.inTransition = true;
					this.doubleclick ? Enabler.requestExpand() : this.expandStartHandler();
				}
			});
		}

		const domCollapseHandler = document.getElementById(domCollapseHandlerId);
		if (domCollapseHandler) {
			domCollapseHandler.addEventListener(eventListenerType, () => {
				if (this.isExpanded && !this.inTransition) {
					this.inTransition = true;
					this.doubleclick ? Enabler.requestCollapse() : this.collapseStartHandler();
				}
			});
		}
	}

	enablerInitHandler() {
		Enabler.setIsMultiDirectional(true);
		this.setExpandingPixelOffsets();
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, () => this.expandStartHandler());
		Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH, () => this.expandFinishHandler());
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, () => this.collapseStartHandler());
		Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH, () => this.collapseFinishHandler());
		exitLinks();

		if (Enabler.isPageLoaded()) {
			this.politeLoad();
		} else {
			Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, this.politeLoad);
		}
	}

	expandStartHandler() {
		const expandDirectionObj = this.doubleclick ? Enabler.getExpandDirection() : { a: this.localExpandDirection };
		this.localExpandDirection = this.localExpandDirection === 3 ? 0 : this.localExpandDirection + 1;
		this.mainMultiExpandingDirectionJs.expandStartAnimation(() => {
			this.doubleclick ? Enabler.finishExpand() : this.expandFinishHandler();
		}, expandDirectionObj);
	}

	expandFinishHandler() {
		this.isExpanded = true;
		this.inTransition = false;
		this.mainMultiExpandingDirectionJs.expandFinishAnimation();
	}

	collapseStartHandler() {
		this.mainMultiExpandingDirectionJs.collapseStartAnimation(() => {
			this.doubleclick ? Enabler.finishCollapse() : this.collapseFinishHandler();
		});
	}

	collapseFinishHandler() {
		this.isExpanded = false;
		this.inTransition = false;
		this.mainMultiExpandingDirectionJs.collapseFinishAnimation();
	}
};