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
    this.expandedPanel = document.getElementById('expanded-panel');
    this.politeLoadImg = document.getElementById('polite-load-img');
    this.studio = document.getElementById('main-panel').classList.contains('studio');
    this.localExpandDirectionNum = 3;
    this.expandDirectionArr = ['tl', 'tr', 'bl', 'br'];
    this.politeLoad = this.politeLoad.bind(this);
    this.enablerInitHandler = this.enablerInitHandler.bind(this);
    this.setExpandingPixelOffsets = setExpandingPixelOffsets;
  }

  init() {
    if (this.studio) {
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
    this.initExpandDirection();
    setTimeout(() => document.getElementById('main-panel').classList.remove('remove-animations-on-load', 1));
    this.addDomEventListeners();
    if (this.politeLoadImg) { this.politeLoadImg.hide(); }
    this.mainMultiExpandingDirectionJs.init();
  }

  initExpandDirection() {
    const initialValue = !this.studio || Enabler.getExpandDirection() ? this.localExpandDirectionNum : 
      Enabler.getExpandDirection()['a'] === 0 ? 3 : Enabler.getExpandDirection()['a'] - 1;
    this.expandedPanel.classList.add(`direction-${this.expandDirectionArr[initialValue]}`);
  }
  
  addDomEventListeners() {
    const domExpandHandler = document.getElementById(domExpandHandlerId);
    if (domExpandHandler) {
      domExpandHandler.addEventListener(eventListenerType, () => {
        if (!this.isExpanded && !this.inTransition) {
          this.inTransition = true;
          this.studio ? Enabler.requestExpand() : this.expandStartHandler();
        }
      });
    }

    const domCollapseHandler = document.getElementById(domCollapseHandlerId);
    if (domCollapseHandler) {
      domCollapseHandler.addEventListener(eventListenerType, () => {
        if (this.isExpanded && !this.inTransition) {
          this.inTransition = true;
          this.studio ? Enabler.requestCollapse() : this.collapseStartHandler();
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
    this.expandedPanel.classList.remove(`direction-${this.expandDirectionArr[this.localExpandDirectionNum]}`);
    this.localExpandDirectionNum = this.studio && Enabler.getExpandDirection() ? Enabler.getExpandDirection()['a'] : 
      this.localExpandDirectionNum === 3 ? 0 : this.localExpandDirectionNum + 1;
    this.expandedPanel.classList.add(`direction-${this.expandDirectionArr[this.localExpandDirectionNum]}`);
    this.mainMultiExpandingDirectionJs.expandStartAnimation(() => {
      this.studio ? Enabler.finishExpand() : this.expandFinishHandler();
    });
  }

  expandFinishHandler() {
    this.isExpanded = true;
    this.inTransition = false;
    this.mainMultiExpandingDirectionJs.expandFinishAnimation();
  }

  collapseStartHandler() {
    this.mainMultiExpandingDirectionJs.collapseStartAnimation(() => {
      this.studio ? Enabler.finishCollapse() : this.collapseFinishHandler();
    });
  }

  collapseFinishHandler() {
    this.isExpanded = false;
    this.inTransition = false;
    this.mainMultiExpandingDirectionJs.collapseFinishAnimation();
  }
};