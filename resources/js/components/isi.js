module.exports = function(IScroll) {
	this.isiScroll = new IScroll('#isi-container', {
		mouseWheel: true,
		scrollbars: true
	});

	this.isi = document.getElementById('isi');
	this.init = function() {
		this.isiScroll.scrollBy(
			0,
			this.isiScroll.maxScrollY,
			this.isiScroll.maxScrollY * -10,
			IScroll.utils.ease.quadratic
		);
		this.isi.addEventListener('mouseleave', this.resumeScroll.bind(this));
		this.isi.addEventListener('mouseenter', this.pauseScroll.bind(this));
	};

	this.pauseScroll = function() {
		
	};

	this.resumeScroll = function() {
		this.isiScroll.scrollBy(
			0,
			this.isiScroll.maxScrollY - this.isiScroll.y,
			(this.isiScroll.maxScrollY - this.isiScroll.y) * -10,
			IScroll.utils.ease.quadratic
		);
	};
};
