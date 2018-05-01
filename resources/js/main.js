var Isi = require('./components/isi.js');
var enabler = require('./components/enabler.js');
var IScroll = require('./vendor/iscroll-probe.js');

var politeInit = function() {
	var animationLoader = (function() {
		var animator = {};
		var animationSpeed = 1500;
	
		function fadeInScreen1() {
			$('.screen-1').fadeIn(animationSpeed, function() { 
				// Do something after screen-1 fades in
			});
		}
	
		animator.init = function() {
			fadeInScreen1();
		}
	
		return animator;
	}());

	animationLoader.init();
}

window.addEventListener('load', function() {
	politeInit();
	
	var isi = new Isi(IScroll);
	// isi.init();
});