var Isi = require('./components/isi.js');
var IScroll = require('./vendor/iscroll-probe.js');

module.exports = class MainJs {
	constructor() {
		this.isi = new Isi(IScroll);
		this.animator =  this.animationLoader();
		this.init = this.init.bind(this);
	}

	animationLoader() {
		const animator = {};
		const animationSpeed = 1500;

		function fadeInScreen1() {
			$('.screen-1').fadeIn(animationSpeed, () => {
				// Do something after screen 1 fades in

			});
		}

		animator.init = function() {
			fadeInScreen1();
		}

		return animator;
	}

	init() {
		this.isi.init();
		this.animator.init();
	}
}