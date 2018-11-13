const http = require('http');
const notifier = require('node-notifier');

module.exports = (gulp, banners) => {
  gulp.task('check-links', () => {
    Object.keys(banners.links).map(link => {
      const { href, displayName } = banners.links[link];
      const request = http.request(href);
    
      request.on('error', () => {
        notifier.notify({
          title: 'Broken Link Found',
          message: `"${displayName}" with path "${href}" is broken. Update "banners.json" to fix.`,
          icon: './bolognese-banners.jpg'
        });
      });
  
      request.end();
    });

    return;
  });
};
