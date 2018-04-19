// Place universal JS here
var Isi = require('./components/isi.js');
var IScroll = require('./vendor/iscroll-probe.js');

document.addEventListener('DOMContentLoaded', function() {
	var isi = new Isi(IScroll);
	isi.init();
});
