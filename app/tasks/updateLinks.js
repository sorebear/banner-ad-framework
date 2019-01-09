const beautify = require('js-beautify');
const fs = require('fs');

const JS_PATH = 'src/js';
const HTML_PATH = 'src/html';
const TEMPLATE_PATH = 'app/templates';

module.exports = (gulp, banners) => {
  gulp.task('update-links', () => {
    scaffoldExitLinksJS(banners);
    scaffoldClickTags(banners);
  });

  function scaffoldExitLinksJS(banners) {
    let tpl = fs.readFileSync(`${TEMPLATE_PATH}/exitLinks.tpl`, 'utf8');
    let exitLinks = '';
    for (const link in banners.links) {
      let exitLink = fs.readFileSync(`${TEMPLATE_PATH}/exitLink.tpl`, 'utf8');
      exitLink = exitLink.replace(/<%exit%>/g, link);
      exitLink = exitLink.replace(/<%exitHref%>/g, banners.links[link].href);
      exitLink = exitLink.replace(/<%exitFormatted%>/g, banners.links[link].displayName);
      exitLinks += exitLink;
    }
    tpl = tpl.replace(/<%exitLinks%>/g, exitLinks);
    tpl = beautify(tpl, { indent_size: 2 });
    fs.writeFileSync(`${JS_PATH}/components/exit-links.js`, tpl);
  }

  const scaffoldClickTags = banners => {
    let tpl = fs.readFileSync(`${TEMPLATE_PATH}/clickTags.tpl`, 'utf8');
    let clickTags = '';
    for (const link in banners.links) {
      clickTags = clickTags + `var ${link} = "${banners.links[link].href}"; `;
    }
    tpl = tpl.replace(/<%clickTags%>/g, clickTags);
    fs.writeFileSync(`${HTML_PATH}/macros/clickTags/links.html`, tpl);
  };
};
