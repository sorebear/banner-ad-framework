// Place universal JS here
var $ = require('./vendor/jquery-3.3.1.min.js');
var Isi = require('./components/isi.js');
var IScroll = require('./vendor/iscroll-probe.js');
var isiScroll;

document.addEventListener('DOMContentLoaded', function() {
	var isi = new Isi(IScroll);
	isi.init();
});
