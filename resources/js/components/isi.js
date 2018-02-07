module.exports = function($) {
	/**
	 * The scrollSpeedMultiplyer variable is multiplied by the isi's total height minus it's current offset height
	 * This ensures the scrollspeed is consistent across different sizes and animation starting positions.
	 */
	this.scrollSpeedMultiplyer = 20;
   this.isiContainerWrapper = document.getElementById('isi-container-wrapper');
	this.isiContainer = document.getElementById('isi-container');
	this.isi = document.getElementById('isi');
	this.customScrollbar = document.getElementById('custom-scrollbar');
	this.customScrollbarTrack = document.getElementById('custom-scrollbar-track');
	this.thumb = document.getElementById('thumb');
	this.thumbHeight = this.thumb.offsetHeight;

	this.wrapperHeight = this.isiContainer.offsetHeight;
	this.isiHeight = this.isi.scrollHeight;
	this.scrollableHeight = this.isiHeight - this.wrapperHeight;

	this.isiAnimation = null;

	this.init = function() {
		console.log("Hello!");
		this.setStyles();
		this.autoScroll();
		this.isiContainer.addEventListener('scroll', this.scrollThumb.bind(this));
		this.isiContainer.addEventListener('wheel', this.customWheelScroll.bind(this));
		this.customScrollbar.addEventListener('wheel', this.customWheelScroll.bind(this));
		this.isiContainer.addEventListener('mouseenter', this.pauseAutoScroll.bind(this));
		this.customScrollbar.addEventListener('mouseenter', this.pauseAutoScroll.bind(this));
		this.isiContainer.addEventListener('mouseleave', this.resumeAutoScroll.bind(this));
		this.customScrollbar.addEventListener('mouseleave', this.resumeAutoScroll.bind(this));
		this.thumb.addEventListener('mousedown', this.dragThumb.bind(this));
		document.addEventListener('mouseup', this.releaseThumb.bind(this));
	};

	this.setStyles = function() {
		this.isi.style.height = this.isiHeight;
		this.customScrollbarTrack.style.height = this.wrapperHeight - this.thumbHeight - 2 + 'px';
	};

	this.customWheelScroll = function(e) {
		this.isiContainer.scrollTop += e.deltaY;
	};

	this.scrollThumb = function() {
		this.thumb.style.top = this.isiContainer.scrollTop / this.scrollableHeight * 100 + '%';
	};

	this.dragThumb = function() {
		this.pauseAutoScroll();
	}

	this.releaseThumb = function(e) {
		console.log("You let go!");
		this.resumeAutoScroll(e);
	}

	this.resumeAutoScroll = function(e) {
		console.log(e.buttons);
		if (e.buttons === 0) {
			this.autoScroll();
		}
	}

	this.autoScroll = function() {
		this.isiAnimation = $('#isi-container').animate(
			{
				scrollTop: this.scrollableHeight
			},
			(this.scrollableHeight - this.isiContainer.scrollTop) * this.scrollSpeedMultiplyer,
			'linear'
		);
	}

	this.pauseAutoScroll = function() {
		this.isiAnimation.stop();
	};
}