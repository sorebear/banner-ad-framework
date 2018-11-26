
const fs = require('fs');
const packageJson = require('../../package.json');

const TEMPLATE_PATH = 'app/templates';
const DIST_PATH = 'dist';

module.exports = (gulp, banners) => {
  const checkThenMakeDir = path => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  };

  gulp.task('create-index', () => {
    let indexLinks = '';
    for (let bannerTitle in banners.banners) {
      let link = fs.readFileSync(`${TEMPLATE_PATH}/indexLink.tpl`, 'utf8');
      link = link.replace(/<%banner%>/g, bannerTitle);
      indexLinks += link;
    }
    let indexPage = fs.readFileSync(`${TEMPLATE_PATH}/index.tpl`, 'utf8');
    indexPage = indexPage.replace(/<%title%>/g, packageJson.name);
    indexPage = indexPage.replace(/<%links%>/g, indexLinks);
    checkThenMakeDir(DIST_PATH);
    fs.writeFileSync(`${DIST_PATH}/index.html`, indexPage);
    return;
  });
};
