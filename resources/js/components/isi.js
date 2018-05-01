module.exports = function(IScroll) {
	this.scrollSpeedMultiplier = -100;
	this.isiBottomPadding = 10;
	this.expandIsiOnHover = true;

	this.initialized = false;
	this.mouseOverIsi = false;
	this.isi = document.getElementById('isi');
	this.isiContainer = document.getElementById('isi-container');
	this.isiScroll = new IScroll('#isi-container', {
		mouseWheel: true,
		scrollbars: true,
		probeType: 3
	});

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
		if (this.expandIsiOnHover) {
			this.expandIsi();
		}
	}

	this.handleMouseLeave = function() {
		this.mouseOverIsi = false;
		if (this.expandIsiOnHover) {
			this.collapseIsi();
			return;
		}
		if (this.initialized) {
			this.resumeScroll();
		}
	}

	this.expandIsi = function() {
		this.isiContainer.style.height = '200%';
		this.isi.style.paddingBottom = this.isiContainer.offsetHeight + this.isiBottomPadding + 'px';
		var self = this;
		setTimeout(function() {
			self.isiScroll.refresh();
		}, 300);
	}

	this.collapseIsi = function() {
		this.isiContainer.style.height = '100%';
		this.isi.style.paddingBottom = this.isiBottomPadding + 'px';
		var self = this;
		setTimeout(function() {
			self.isiScroll.refresh();
			if (self.initialized) {
				self.resumeScroll();
			}
		}, 400);
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
