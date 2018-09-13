const http = require('http');

module.exports = (gulp, banners) => {
  return Object.keys(banners.links).forEach(link => {
    const { href, displayName } = banners.links[link];
    const request = http.request(href);
  
    request.on('error', () => {
      return console.error(`ERROR: ${displayName} with path ${href} in banners.json is broken`);
    });

    request.end();
  });
};
