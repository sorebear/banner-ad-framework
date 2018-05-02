var Isi = require('./components/isi.js');
var enabler = require('./components/enabler.js');
var IScroll = require('./vendor/iscroll-probe.js');

var politeInit = function() {
	var isi = new Isi(IScroll);
	// If you dont want an auto-scrolling Isi
	// Remove this init function 
	isi.init();

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
	// This function call is dynamically changed by different build processes
	enabler(politeInit);
});