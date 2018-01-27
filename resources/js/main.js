// Place universal JS here
var scrollSpeed = 20;
var iScroll = require('./vendor/iscroll');
var isiScroll = null;
var isi = null;
var banner = null;
var isiHeight = null;
var bannerHeight = null;
var scrollbarWidth = null;

document.addEventListener("DOMContentLoaded", function() {
	// isiScroll = new iScroll('#isi-container', {
	// 	mouseWheel: true,
	// 	scrollbars: true
	// });
	debugger;
	isiContainer = document.getElementById('isi-container');
	isi = document.getElementById('isi');
	banner = document.getElementById('banner-wrapper');
	customScrollbar = document.getElementById('custom-scrollbar');

	isiHeight = isi.scrollHeight;
	bannerHeight = banner.scrollHeight;
	isi.style.height = isiHeight;

	scrollWidth = isiContainer.offsetWidth - isi.offsetWidth;
	customScrollbar.style.width = scrollWidth + "px";

	// isiScroll.scrollTo(0, isiHeight * -1 + bannerHeight, isiHeight * scrollSpeed, iScroll.utils.ease.quadratic);
	addListeners();
});

function addListeners() {
	isi.addEventListener("mouseenter", function() { 
		
	 });
	isi.addEventListener("mouseleave", function() {console.log("Mouse is out") });
}