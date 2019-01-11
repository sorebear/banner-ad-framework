const fs = require('fs');

module.exports = (gulp, _) => {
  gulp.task('rename-clicktags', () => {
    const banners = JSON.parse(fs.readFileSync('banners.json'));
    return Object.keys(banners.banners).forEach(banner => {
      let html = fs.readFileSync(`dist/unzipped/${banner}/${banner}.html`, 'utf8');

      Object.keys(banners.links).sort().forEach((link, index) => {
        const num = index === 0 ? '' : index + 1;
        html = html.replace(
          new RegExp(`var ${link} = "${banners.links[link].href}"`),
          `var clickTag${num} = "${banners.links[link].href}"`
        );
        html = html.replace(new RegExp(`(window.${link})`, 'g'), `(window.clickTag${num})`);
      });

      fs.writeFileSync(`dist/unzipped/${banner}/${banner}.html`, html);
    });
  });
};