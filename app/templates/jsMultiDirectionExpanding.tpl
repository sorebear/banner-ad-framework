const SetupMultiExpandingDirection = require('../setup/setup-multi-direction-expanding');

window.addEventListener('load', () => {
  const setPixelOffsets = () => Enabler.setExpandingPixelOffsets(
    <%leftOffset%>,
    <%topOffset%>,
    <%expandedWidth%>,
    <%expandedHeight%>
  );
  const expandingBanner = new SetupMultiExpandingDirection(setPixelOffsets);
  expandingBanner.init();
});