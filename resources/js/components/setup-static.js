var exitLinks = require('../components/exit-links.js');

module.exports = class SetupStandardBanner {
  constructor() {
    this.enablerInitHandler = this.enablerInitHandler.bind(this);
  }

  enablerInitHandler() {
    exitLinks();
  }

  init() {
    if ($('#main-panel').hasClass('doubleclick')) {
      if (Enabler.isInitialized()) {
        this.enablerInitHandler();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, this.enablerInitHandler);
      }
    }
  }
}