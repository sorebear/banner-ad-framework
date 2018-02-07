// Place universal JS here
var $ = require('./vendor/jquery-3.3.1.min.js');
var IsiComponent = require('./components/isi.js');

document.addEventListener('DOMContentLoaded', function() {
	var isi = new IsiComponent($);
	isi.init();
});
