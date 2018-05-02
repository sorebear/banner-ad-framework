var enabler = require('./components/enabler.js');

var politeInit = function() {
  return;
}

window.addEventListener('load', function() {
	// This function call is dynamically changed by different build processes
	enabler(politeInit);
});