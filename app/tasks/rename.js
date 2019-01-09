const fs = require('fs');
const prompt = require('gulp-prompt');
const beautify = require('js-beautify');
const notify = require('gulp-notify');

const HTML_PATH = 'src/html/pages';
const SCSS_PATH = 'src/scss/pages';
const JS_PATH = 'src/js/pages';
const IMG_PATH = 'src/img/pages';

module.exports = (gulp, banners) => {
  gulp.task('rename', () => {
    const checkThenRename = (currentPath, newPath) => {
      if (fs.existsSync(currentPath)) {
        fs.rename(currentPath, newPath);
      }
    };

    const renameBanners = (currentBannerName, newBannerName) => {
      checkThenRename(`${HTML_PATH}/${currentBannerName}.html`, `${HTML_PATH}/${newBannerName}.html`);
      checkThenRename(`${SCSS_PATH}/${currentBannerName}.scss`, `${SCSS_PATH}/${newBannerName}.scss`);
      checkThenRename(`${JS_PATH}/${currentBannerName}.js`, `${JS_PATH}/${newBannerName}.js`);
      checkThenRename(`${IMG_PATH}/${currentBannerName}`, `${IMG_PATH}/${newBannerName}`);
      const bannerJson = JSON.stringify(banners).replace(currentBannerName, newBannerName);
      fs.writeFileSync('banners.json', beautify(bannerJson, { indent_size: 2 }), 'utf8');
      return gulp.src('./gulpfile.babel.js').pipe(notify(`RENAME COMPLETE:\n"${currentBannerName}" was renamed to "${newBannerName}"`));
    };

    const currentNameIndex = process.argv.indexOf('--old') + 1;
    const currentName = currentNameIndex ? process.argv[currentNameIndex] : null;
    const newNameIndex = process.argv.indexOf('--new') + 1;
    const newName = newNameIndex ? process.argv[newNameIndex] : null;

    const bannerArr = Object.keys(banners.banners);
    const bannerString = `CHOOSE BANNER TO RENAME:\n${bannerArr.map((banner, index) => `[${index + 1}] ${banner}\n`).join('')}`;

    if (!currentName || !newName) {
      gulp.src('./gulpfile.babel.js')
        .pipe(prompt.prompt({
          type: 'input',
          name: 'currentBannerIndex',
          message: bannerString,
          choices: bannerArr.map((banner, index) => index + 1 + ''),
        }, currentBanner => {
          const currentName = bannerArr[parseInt(currentBanner.currentBannerIndex) - 1];
          return gulp.src('./gulpfile.babel.js')
            .pipe(prompt.prompt({
              type: 'input',
              name: 'newName',
              message: `BANNER SELECTED: "${currentName}"\nCHOOSE A NEW NAME: `
            }, newBanner => renameBanners(currentName, newBanner.newName)));
        })); 
    } else if (!banners.banners[currentName]) {
      return gulp.src('./gulpfile.babel.js').pipe(notify(`ERROR: There is no banner named ${currentName}. Please try selecting a valid banner.`));
    } else {
      checkThenRename(`${HTML_PATH}/${currentName}.html`, `${HTML_PATH}/${newName}.html`);
      checkThenRename(`${SCSS_PATH}/${currentName}.scss`, `${SCSS_PATH}/${newName}.scss`);
      checkThenRename(`${JS_PATH}/${currentName}.js`, `${JS_PATH}/${newName}.js`);
      checkThenRename(`${IMG_PATH}/${currentName}`, `${IMG_PATH}/${newName}`);
      const bannerJson = JSON.stringify(banners).replace(currentName, newName);
      fs.writeFileSync('banners.json', beautify(bannerJson, { indent_size: 2 }), 'utf8');
      return gulp.src('./gulpfile.babel.js').pipe(notify({
        message: `RENAME COMPLETE:\n"${currentName}" was renamed to "${newName}"`,
        wait: true
      }));
    }
  });
};
