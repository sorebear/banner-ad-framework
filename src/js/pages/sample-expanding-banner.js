const SetupExpanding = require('../components/setup-expanding');

window.addEventListener('load', () => {
  const setPixelOffsets = () => Enabler.setExpandingPixelOffsets(
    320,
    0,
    640,
    250
  );
  const expandingBanner = new SetupExpanding(setPixelOffsets);
  expandingBanner.init();
});