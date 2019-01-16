var MainJs = require('../main.js');
var exitLinks = require('../components/exit-links.js');

module.exports = class SetupStandardBanner {
  constructor() {
    this.mainJs = new MainJs();
    this.enablerInitHandler = this.enablerInitHandler.bind(this);
    this.politeLoad = this.politeLoad.bind(this);
  }

  enablerInitHandler() {
    exitLinks();

    if (Enabler.isPageLoaded()) {
      this.politeLoad();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, this.politeLoad);
    }
  }

  init() {
    if (document.getElementById('main-panel').classList.contains('studio')) {
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
    if (this.politeLoadImg) { 
      this.politeLoadImg.style.display = 'none'; 
    }
    this.mainJs.init();
  }
};
