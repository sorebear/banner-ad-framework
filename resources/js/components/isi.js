module.exports = function(IScroll) {
	this.scrollSpeedMultiplier = -40;
	this.isiScroll = new IScroll('#isi-container', {
		mouseWheel: true,
		scrollbars: true,
		probeType: 3
	});
	this.isi = document.getElementById('isi');
	this.init = function() {
		this.isiScroll.scrollBy(
			0,
			this.isiScroll.maxScrollY,
			this.isiScroll.maxScrollY * this.scrollSpeedMultiplier,
			IScroll.utils.ease.quadratic
		);
		this.isi.addEventListener('mouseleave', this.resumeScroll.bind(this));
		this.isi.addEventListener('mouseenter', this.pauseScroll.bind(this));
	};

	this.pauseScroll = function() {
		this.isiScroll.scrollTo(
			0,
			this.isiScroll.y - 1,
			this.scrollSpeedMultiplier * -1,
			IScroll.utils.ease.quadratic
		);
	};

	this.resumeScroll = function() {
		this.isiScroll.scrollBy(
			0,
			this.isiScroll.maxScrollY - this.isiScroll.y,
			(this.isiScroll.maxScrollY - this.isiScroll.y) * this.scrollSpeedMultiplier,
			IScroll.utils.ease.quadratic
		);
	};
};
