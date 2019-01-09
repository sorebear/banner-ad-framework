const SetupStaticBanner = require('../components/setup-static');

window.addEventListener('load', () => {
  const staticBanner = new SetupStaticBanner();
  staticBanner.init();
});