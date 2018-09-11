
const Isi = require('./components/isi.js');
const Iscroll = require('./vendor/iscroll-probe.js');
import * as helperFunctions from './util/helper-functions';

module.exports = class Expanding {
	constructor() {
		this.isi = new Isi(Iscroll);
		this.init = this.init.bind(this);
		this.expandStartAnimation = this.expandStartAnimation.bind(this);
		this.expandFinishAnimation = this.expandFinishAnimation.bind(this);
		this.collapseStartAnimation = this.collapseStartAnimation.bind(this);
		this.collapseFinishAnimation = this.collapseFinishAnimation.bind(this);
	}
	
	init() {
		this.isi.init();
	}

	expandStartAnimation(callback) {
		// Do stuff, then call callback after it is complete
		helperFunctions.expandPanel(document.querySelector('#collapsed-panel-content-wrapper'), 2000, () => {
			if (callback) {
				this.isi.refresh();
				callback();
			}
		})
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