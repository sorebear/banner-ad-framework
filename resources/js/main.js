// Place universal JS here
var $ = require('./vendor/jquery-3.3.1.min.js');

/**
 * The scrollSpeedMultiplyer variable is multiplied by the isi's total height minus it's current offset height
 * This ensures the scrollspeed is consistent across different sizes and animation starting positions.
 */
var scrollSpeedMultiplyer = 20;

document.addEventListener('DOMContentLoaded', function() {
	var isi = new IsiComponent();
	isi.init();
});

function IsiComponent() {
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
	this.scrollbarWidth = this.isiContainer.offsetWidth - this.isi.offsetWidth;

	this.isiAnimation = null;

	this.init = function() {
		this.setStyles();
		this.startAutoScroll();
		this.isiContainer.addEventListener('scroll', this.scrollThumb.bind(this));
		this.customScrollbar.addEventListener('wheel', this.customWheelScroll.bind(this));
		this.isiContainer.addEventListener('mouseenter', this.pauseAutoScroll.bind(this));
		this.customScrollbar.addEventListener('mouseenter', this.pauseAutoScroll.bind(this));
		this.isiContainer.addEventListener('mouseleave', this.startAutoScroll.bind(this));
		this.customScrollbar.addEventListener('mouseleave', this.startAutoScroll.bind(this));
	};

	this.setStyles = function() {
		this.isi.style.height = this.isiHeight;
		this.customScrollbar.style.width = this.scrollbarWidth + 'px';
		this.customScrollbarTrack.style.height = this.wrapperHeight - this.thumbHeight - 2 + 'px';
	};

	this.customWheelScroll = function(e) {
		this.isiContainer.scrollTop += e.deltaY;
	};

	this.scrollThumb = function() {
		this.thumb.style.top = this.isiContainer.scrollTop / this.scrollableHeight * 100 + '%';
	};

	this.startAutoScroll = function() {
		this.isiAnimation = $('#isi-container').animate(
			{
				scrollTop: this.scrollableHeight
			},
			(this.scrollableHeight - this.isiContainer.scrollTop) * scrollSpeedMultiplyer,
			'linear'
		);
	};

	this.pauseAutoScroll = function() {
		this.isiAnimation.stop();
	};
}
