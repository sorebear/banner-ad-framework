import SetupMultiExpandingDirection from '../components/setup-multi-direction-expanding';

window.addEventListener('load', () => {
	const setPixelOffsets = () => Enabler.setExpandingPixelOffsets(
    440,
    0,
    1040,
    600
  );
	const expandingBanner = new SetupMultiExpandingDirection(setPixelOffsets);
	expandingBanner.init();
});