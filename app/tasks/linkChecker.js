const fs = require('fs');
const http = require('http');
const https = require('https');
const notifier = require('node-notifier');

module.exports = (gulp, _) => {
  gulp.task('link-checker', () => {
    const banners = JSON.parse(fs.readFileSync('banners.json'));

    if (banners.settings['allow-broken-links']) {
      return;
    }

    Object.keys(banners.links).map(link => {
      const { href, displayName } = banners.links[link];
      const request = href.includes('https') ? https.request(href) : http.request(href);
    
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

  gulp.task('link-checker-watch', ['link-checker'], () => {
    gulp.watch('banners.json', ['link-checker']);
  });
};
