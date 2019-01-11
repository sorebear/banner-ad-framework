const fs = require('fs');
const notifier = require('node-notifier');

module.exports = (gulp, _) => {
  gulp.task('size-checker', () => {
    const banners = JSON.parse(fs.readFileSync('banners.json'));

    if (banners.settings['allow-oversized-banners']) {
      return;
    }

    const overSizedBanners = [];

    const isFileOrDir = (sum, input) => {
      if (fs.lstatSync(input).isDirectory()) {
        const subFiles = fs.readdirSync(input, 'utf8');
        return subFiles.reduce((subSum, subFile) => isFileOrDir(sum, `${input}/${subFile}`), sum);
      } else {
        return sum + fs.statSync(input).size;
      }
    };

    Object.keys(banners.banners).forEach(banner => {
      const path = `dist/unzipped/${banner}`;
      const files = fs.readdirSync(path, 'utf8');
      const bannerSize = files.reduce((sum, file) => isFileOrDir(sum, `${path}/${file}`), 0);
      const bannerSizeInKb = (bannerSize / 1024).toFixed(1);
      if (bannerSizeInKb > 1000) {
        overSizedBanners.push(`${banner} is ${(bannerSizeInKb / 1024).toFixed(1)} MB`);
      } else if (bannerSizeInKb > 200) {
        overSizedBanners.push(`${banner} is ${bannerSizeInKb} KB`);
      }
    });

    if (overSizedBanners.length) {
      notifier.notify({
        title: 'Banners Over 200kb Detected',
        message: overSizedBanners.join('\n'),
        icon: './bolognese-banners.jpg'
      });
    }

    return;
  });

  gulp.task('size-checker-watch', ['size-checker'], () => {
    gulp.watch(['dist/unzipped/*'], ['size-checker']);
  });
};
