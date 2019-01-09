const SetupStandardBanner = require('../components/setup-standard');

window.addEventListener('load', () => {
  const standardBanner = new SetupStandardBanner();
  standardBanner.init();
});