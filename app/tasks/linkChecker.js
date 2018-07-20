const http = require('http');
const fs = require('fs');

module.exports = (gulp, banners) => {
	for (const link in banners.links) {
		const { href, displayName } = banners.links[link];
		const request = http.request(href);

		request.on('error', () => {
			console.error(`ERROR: ${displayName} with path ${href} in banners.json is broken`);
		});
	}
};
