import SetupMultiExpandingDirection from '../components/setup-multi-direction-expanding';

window.addEventListener('load', () => {
	const setPixelOffsets = () => Enabler.setExpandingPixelOffsets(
    440,
    200,
    600,
    800
  );
	const expandingBanner = new SetupMultiExpandingDirection(setPixelOffsets);
	expandingBanner.init();
});