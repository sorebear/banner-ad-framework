const MainExpandingJs = require('../main-expanding.js');
const exitLinks = require('../components/exit-links.js');

const domExpandHandlerId = 'expand-handler';
const domCollapseHandlerId = 'collapse-handler';
const eventListenerType = 'click';

module.exports = class ExpandingBanner {
  constructor(setExpandingPixelOffsets) {
    this.mainExpandingJs = new MainExpandingJs();
    this.isExpanded = false;
    this.inTransition = false;
    this.politeLoadImg = document.getElementById('polite-load-img');
    this.doubleclick = document.getElementById('main-panel').classList.contains('doubleclick');
    this.setExpandingPixelOffsets = setExpandingPixelOffsets;
    this.enablerInitHandler = this.enablerInitHandler.bind(this);
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
    if (this.politeLoadImg) { this.politeLoadImg.style.display = 'none'; }
    this.mainExpandingJs.init();
  }

  addDomEventListeners() {
    const domExpandHandler = document.getElementById(domExpandHandlerId);
    if (domExpandHandler) {
      domExpandHandler.addEventListener(eventListenerType, () => {
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
    this.mainExpandingJs.expandStartAnimation(() => {
      this.doubleclick ? Enabler.finishExpand() : this.expandFinishHandler();
    });
  }

  expandFinishHandler() {
    this.isExpanded = true;
    this.inTransition = false;
    this.mainExpandingJs.expandFinishAnimation();
  }

  collapseStartHandler() {
    this.mainExpandingJs.collapseStartAnimation(() => {
      this.doubleclick ? Enabler.finishCollapse() : this.collapseFinishHandler();
    });
  }

  collapseFinishHandler() {
    this.isExpanded = false;
    this.inTransition = false;
    this.mainExpandingJs.collapseFinishAnimation();
  }
};