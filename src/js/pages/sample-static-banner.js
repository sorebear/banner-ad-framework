const SetupStaticBanner = require('../setup/setup-static');

window.addEventListener('load', () => {
  const staticBanner = new SetupStaticBanner();
  staticBanner.init();
});