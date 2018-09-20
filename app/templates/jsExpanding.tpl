const SetupExpanding = require('../components/setup-expanding');

window.addEventListener('load', () => {
  const setPixelOffsets = () => Enabler.setExpandingPixelOffsets(
    <%leftOffset%>,
    <%topOffset%>,
    <%expandedWidth%>,
    <%expandedHeight%>
  );
  const expandingBanner = new SetupExpanding(setPixelOffsets);
  expandingBanner.init();
});