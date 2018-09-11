const Isi = require('./components/isi.js');
const IScroll = require('./vendor/iscroll-probe.js');
import * as helperFunctions from './util/helper-functions';

module.exports = class MainJs {
	constructor() {
		this.isi = new Isi(IScroll);
		this.animator =  this.animationLoader();
		this.init = this.init.bind(this);
	}

	animationLoader() {
		const animator = {};
		const animationSpeed = 2000;

		function fadeInScreen1() {
			const screen1 = document.querySelector('.screen-1');
			helperFunctions.fadeIn(screen1, animationSpeed, () => {
				helperFunctions.fadeOut(screen1, animationSpeed);
			});
				// Do something after screen 1 fades in
			
		}

		animator.init = function() {
			fadeInScreen1();
		}

		return animator;
	}

	init() {
		this.isi.init();
		this.animator.init();

		helperFunctions.isiScroll(.5, this.isi);
	}
}