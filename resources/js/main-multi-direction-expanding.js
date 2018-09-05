
var Isi = require('./components/isi.js');
var Iscroll = require('./vendor/iscroll-probe.js');

module.exports = class Expanding {
	init() {
		const isi = new Isi(Iscroll);
		isi.init();
	}

	expandStartAnimation(callback) {
		// Do stuff, then call callback after it is complete

		if (callback) {
			callback();
		}
	}

	expandFinishAnimation() {
		// Do stuff when the expansion starts
	}

	collapseStartAnimation(callback) {
		// Do stuff, then call callback after it is complete

		if (callback) {
			callback();
		}
	}

	collapseFinishAnimation() {
		// Do stuff when the collapse finishes
	}
}