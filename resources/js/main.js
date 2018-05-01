// Place universal JS here
var Isi = require('./components/isi.js');
var enablerInitHandler = require('./components/enabler.js');
var IScroll = require('./vendor/iscroll-probe.js');

window.addEventListener('load', function() {
	enablerInitHandler(AnimationInit());
	var isi = new Isi(IScroll);
	isi.init();
});

function AnimationInit() {
	var AnimationLoader = (function() {
		var animator = {};
		var animationSpeed = 1500;
		var screenHoldDuration = 2000;
	
		function fadeInScreen1() {
			$('.screen-1').fadeIn(animationSpeed, function() { 
				setTimeout(fadeOutScreen1, screenHoldDuration); 
			});
		}

		function fadeOutScreen1() {
			$('.screen-1').fadeOut(animationSpeed, function() {
				fadeInScreen2();
			});
		}

		function fadeInScreen2() {
			$('.screen-2').fadeIn(animationSpeed, function() {
				setTimeout(fadeOutScreen2, screenHoldDuration);
			});
		}

		function fadeOutScreen2() {
			$('.screen-2').fadeOut(animationSpeed, function() {
				fadeInScreen1();
			});
		}
	
		animator.init = function() {
			fadeInScreen1();
		}
	
		return animator;
	}());

	AnimationLoader.init();
}



