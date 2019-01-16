const SetupMultiExpandingDirection = require('../setup/setup-multi-direction-expanding');

window.addEventListener('load', () => {
  const setPixelOffsets = () => Enabler.setExpandingPixelOffsets(
    0,
    225,
    728,
    315
  );
  const expandingBanner = new SetupMultiExpandingDirection(setPixelOffsets);
  expandingBanner.init();
});