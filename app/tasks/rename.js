const fs = require('fs');
const beautify = require('js-beautify');

const HTML_PATH = 'resources/html/pages';
const SCSS_PATH = 'resources/scss/pages';
const JS_PATH = 'resources/js/pages';
const IMG_PATH = 'resources/img/pages';

module.exports = (gulp, banners) => {
  gulp.task('rename', () => {
    const currentNameIndex = process.argv.indexOf('--old') + 1;
    const currentName = currentNameIndex ? process.argv[currentNameIndex] : null;
    const newNameIndex = process.argv.indexOf('--new') + 1;
    const newName = newNameIndex ? process.argv[newNameIndex] : null;

    const checkThenRename = (currentPath, newPath) => {
      if (fs.existsSync(currentPath)) {
        fs.rename(currentPath, newPath);
      }
    }
    
    if (!currentName || !newName) {
      console.log('ERROR: Please input a valid existing name and a new name. THE COMMAND FORMAT SHOULD READ: "gulp rename --old <current-name> --new <newName>"');
      return;
    } else if (!banners.banners[currentName]) {
      console.log(`ERROR: There is no banner named ${currentName}. Please try selecting a valid banner.`);
      return;
    } else {
      checkThenRename(`${HTML_PATH}/${currentName}.html`, `${HTML_PATH}/${newName}.html`);
      checkThenRename(`${SCSS_PATH}/${currentName}.scss`, `${SCSS_PATH}/${newName}.scss`);
      checkThenRename(`${JS_PATH}/${currentName}.js`, `${JS_PATH}/${newName}.js`);
      checkThenRename(`${IMG_PATH}/${currentName}`, `${IMG_PATH}/${newName}`);
      const bannerJson = JSON.stringify(banners).replace(currentName, newName);
      fs.writeFileSync('banners.json', beautify(bannerJson, { indent_size: 2 }), 'utf8');
    }
    
    console.log(`RENAME COMPLETE: ${currentName} was renamed to ${newName}`);
  });
}