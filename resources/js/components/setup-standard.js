var MainJs = require('../main.js');
var exitLinks = require('../components/exit-links.js');

module.exports = class SetupStandardBanner {
  constructor() {
    this.mainJs = new MainJs();
    this.enablerInitHandler = this.enablerInitHandler.bind(this);
  }

  enablerInitHandler() {
    exitLinks();

    if (Enabler.isPageLoaded()) {
      this.mainJs.init();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, this.mainJs.init);
    }
  }

  init() {
    if ($('#main-panel').hasClass('doubleclick')) {
      if (Enabler.isInitialized()) {
        this.enablerInitHandler();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, this.enablerInitHandler);
      }
    } else {
      this.mainJs.init();
    }
  }
}