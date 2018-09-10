const http = require('http');
const fs = require('fs');

module.exports = (gulp, banners) => {
	// console.log('BANNERS DOT LINKS', banners.links);
	// return Object.keys(banners.links).forEach(link => {
	// 	const { href, displayName } = banners.links[link];
	// 	const request = http.request(href);
	
	// 	request.on('error', () => {
	// 		return console.error(`ERROR: ${displayName} with path ${href} in banners.json is broken`);
	// 	});

	// 	return;
	// });
};
