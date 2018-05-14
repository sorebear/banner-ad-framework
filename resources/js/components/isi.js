module.exports = function(IScroll, id) {
	this.id = id ? id : 'isi';
	this.isi = document.getElementById(this.id);
	this.isiContainer = document.getElementById(`${this.id}-container`);
	this.isiScroll = new IScroll(`#${this.id}-container`, {
		mouseWheel: true,
		scrollbars: true,
		probeType: 3
	});
	
	this.initialized = false;
	this.mouseOverIsi = false;
	this.scrollSpeedMultiplier = -100;

	this.init = function() {
		if (!this.initialized) {
			this.initialized = true;
			this.startScrollFromBeginning();
		}
	};

	this.handleMouseEnter = function() {
		this.mouseOverIsi = true;
		if (this.initialized) {
			this.pauseScroll();
		}
	}

	this.handleMouseLeave = function() {
		this.mouseOverIsi = false;
		if (this.initialized) {
			this.resumeScroll();
		}
	}

	this.startScrollFromBeginning = function() {
		if (!this.mouseOverIsi) {
			this.isiScroll.scrollTo(
				0,
				this.isiScroll.maxScrollY,
				this.isiScroll.maxScrollY * this.scrollSpeedMultiplier,
				IScroll.utils.ease.quadratic
			);
		}
	}

	this.pauseScroll = function() {
		this.isiScroll.scrollTo(
			0,
			this.isiScroll.y,
			-1,
			IScroll.utils.ease.quadratic
		);
	};

	this.resumeScroll = function() {
		if (!this.mouseOverIsi) {
			var self = this;
			setTimeout(function() {
				if (!self.mouseOverIsi) {
					self.isiScroll.scrollBy(
						0,
						self.isiScroll.maxScrollY - self.isiScroll.y,
						(self.isiScroll.maxScrollY - self.isiScroll.y) * self.scrollSpeedMultiplier,
						IScroll.utils.ease.quadratic
					);
				}
			}, 75);
		}
	};

	// Set event listeners
	this.isiContainer.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
	this.isiContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
};
