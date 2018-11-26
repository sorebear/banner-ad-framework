/**
* 
* SETUP FOR A NEW PROJECT
*
* Scaffold builds sass, html, and images for new projects.
*
* For new projects:
*
* First fill out './banners.json' with all the different banners for your
* project
* Afterwards run `gulp scaffold:clean` to delete example banners. Then run
* `gulp scaffold` to create sass and html pages from './banners.json'.
* You can also run `gulp re-scaffold` to both clean and create in one command
*
* The preloaded sizes are based on DoubleClicks 'Top-performing ad sizes'
* Other supported ad sizes include: 125x125, 180x150, 200x200, 200x446, 220x90, 234x60, 240x133, 250x250
* 300x31, 300x50, 300x100, 300x600, 300x1050, 320x50, 320x100, 468x60, 960x90, 970x90, 970x250
* The support page for this information can be found here: https://support.google.com/adxbuyer/answer/3011898?hl=en
*
* The HTML file that are given to banners upon scaffolding can be customized
* by editng html/templates/layout.html
*/

const del = require('del');
const fs = require('fs');
const beautify = require('js-beautify');

const RESOURCES_PATH = 'resources';
const TEMPLATE_PATH = 'app/templates';
const HTML_PATH = 'resources/html/';
const JS_PATH = 'resources/js/';
const SCSS_PATH = 'resources/scss/';
const IMG_PATH = 'resources/img/';

module.exports = (gulp, banners) => {
  gulp.task('scaffold', () => {
    checkThenMakeDir(RESOURCES_PATH);
    const subFolders = ['html', 'scss', 'js', 'img'];
    subFolders.forEach(subFolder => {
      checkThenMakeDir(`${RESOURCES_PATH}/${subFolder}`);
      checkThenMakeDir(`${RESOURCES_PATH}/${subFolder}/pages`);
    });
    for (let bannerTitle in banners.banners) {
      const banner = banners.banners[bannerTitle];
      const isExpanding = banner.expanded;
      const isMultiDir = !isExpanding ? null :
        banner.expanded.expandDirection.includes('up') && banner.expanded.expandDirection.includes('down') ||
        banner.expanded.expandDirection.includes('left') && banner.expanded.expandDirection.includes('right') ?
          true : false;
      const dims = {
        static: banner.static,
        orientation: banner.orientation,
        collapsedWidth: banner.width,
        collapsedHeight: banner.height,
        expanding: isExpanding,
        multiDir: isMultiDir,
        expandEventHandler: isExpanding ? banner.expanded.expandEventHandler : null,
        totalWidth: !isExpanding ? banner.width :
          !isMultiDir ? banner.expanded.width :
            banner.expanded.width + banner.expanded.width - banner.width,
        totalHeight: !isExpanding ? banner.height :
          !isMultiDir ? banner.expanded.height :
            banner.expanded.height + banner.expanded.height - banner.height,
        expandedWidth: isExpanding ? banner.expanded.width : null,
        expandedHeight: isExpanding ? banner.expanded.height : null,
        expandDirection: isExpanding ? banner.expanded.expandDirection : null,
        expandMultiDirection: isMultiDir,
        topOffset: isMultiDir ? banner.expanded.height - banner.height :
          !isExpanding || !banner.expanded.expandDirection.includes('up') ? 0 :
            banner.expanded.height - banner.height,
        leftOffset: isMultiDir ? banner.expanded.width - banner.width :
          !isExpanding || !banner.expanded.expandDirection.includes('left') ? 0 :
            banner.expanded.width - banner.width,
      };
      scaffoldHTML(bannerTitle, dims);
      scaffoldSCSS(bannerTitle, dims);
      scaffoldJS(bannerTitle, dims);
      scaffoldIMG(bannerTitle, dims);
    }
    scaffoldExitLinksJS(banners);
    scaffoldClickTags(banners);
  });

  const scaffoldHTML = (banner, dims) => {
    let tpl = dims.expanding ? 
      fs.readFileSync(`${TEMPLATE_PATH}/htmlExpanding.tpl`, 'utf8') :
      dims.static ?
        fs.readFileSync(`${TEMPLATE_PATH}/htmlStatic.tpl`, 'utf8') :
        fs.readFileSync(`${TEMPLATE_PATH}/htmlStandard.tpl`, 'utf8');
    tpl = tpl.replace(/<%fileName%>/g, banner);
    tpl = tpl.replace(/<%width%>/g, dims.collapsedWidth);
    tpl = tpl.replace(/<%height%>/g, dims.collapsedHeight);
    checkThenWriteFile(`${HTML_PATH}/pages/${banner}.html`, tpl);
  };

  const scaffoldSCSS = (banner, dims) => {
    let tpl = dims.static ? 
      fs.readFileSync(`${TEMPLATE_PATH}/scssStatic.tpl`, 'utf8') :
      !dims.expanding ? 
        fs.readFileSync(`${TEMPLATE_PATH}/scss.tpl`, 'utf8') :
        dims.expandMultiDirection ?
          fs.readFileSync(`${TEMPLATE_PATH}/scssMultiDirectionExpanding.tpl`, 'utf8') :
          fs.readFileSync(`${TEMPLATE_PATH}/scssExpanding.tpl`, 'utf8');
    tpl = tpl.replace(/<%orientation%>/g, dims.orientation);
    tpl = tpl.replace(/<%flex%>/g, dims.orientation === 'horizontal' ? 'display: flex;' : '');
    tpl = tpl.replace(/<%flexDirection%>/g, dims.orientation === 'horizontal' ? 'flex-direction: row;' : '');
    tpl = tpl.replace(/<%banner-title%>/g, banner);
    tpl = tpl.replace(/<%collapsedWidth%>/g, dims.collapsedWidth);
    tpl = tpl.replace(/<%collapsedHeight%>/g, dims.collapsedHeight);
    if (dims.expanding) {
      tpl = tpl.replace(/<%expandedWidth%>/g, dims.expandedWidth);
      tpl = tpl.replace(/<%expandedHeight%>/g, dims.expandedHeight);
      tpl = tpl.replace(/<%totalWidth%>/g, dims.totalWidth);
      tpl = tpl.replace(/<%totalHeight%>/g, dims.totalHeight);
      tpl = tpl.replace(/<%topPosition%>/g, dims.multiDir ? `top: ${dims.topOffset}px` :
        !dims.expanding || !dims.expandDirection.includes('up') ? `top: ${dims.topOffset}px` :
          'bottom: 0px');
      tpl = tpl.replace(/<%leftPosition%>/g, dims.multiDir ? `left: ${dims.leftOffset}px` :
        !dims.expanding || !dims.expandDirection.includes('left') ? `left: ${dims.topOffset}px` :
          'right: 0px');
    }
    checkThenWriteFile(`${SCSS_PATH}/pages/${banner}.scss`, tpl);
  };

  const scaffoldJS = (banner, dims) => {
    let tpl = dims.static ?
      fs.readFileSync(`${TEMPLATE_PATH}/jsStatic.tpl`, 'utf8') :
      !dims.expanding ?
        fs.readFileSync(`${TEMPLATE_PATH}/js.tpl`, 'utf8') :
        dims.expandMultiDirection ?
          fs.readFileSync(`${TEMPLATE_PATH}/jsMultiDirectionExpanding.tpl`, 'utf8') :
          fs.readFileSync(`${TEMPLATE_PATH}/jsExpanding.tpl`, 'utf8');
    tpl = tpl.replace(/<%leftOffset%>/g, dims.leftOffset);
    tpl = tpl.replace(/<%topOffset%>/g, dims.topOffset);
    tpl = tpl.replace(/<%expandedWidth%>/g, dims.expandedWidth);
    tpl = tpl.replace(/<%expandedHeight%>/g, dims.expandedHeight);
    tpl = dims.expandEventHandler === 'click' ?
      tpl.replace(/<%expandEventListener%>/g, 'click')
        .replace(/<%collapseEventListener%>/g, 'click') : 
      dims.expandEventHandler === 'hover' ?
        tpl.replace(/<%expandEventListener%>/g, 'mouseenter')
          .replace(/<%collapseEventListener%>/g, 'mouseleave') : tpl;
    checkThenWriteFile(`${JS_PATH}/pages/${banner}.js`, tpl);
  };

  const scaffoldExitLinksJS = banners => {
    let tpl = fs.readFileSync(`${TEMPLATE_PATH}/exitLinks.tpl`, 'utf8');
    let exitLinks = '';
    for (const link in banners.links) {
      let exitLink = fs.readFileSync(`${TEMPLATE_PATH}/exitLink.tpl`, 'utf8');
      exitLink = exitLink.replace(/<%exit%>/g, link);
      exitLink = exitLink.replace(/<%exitFormatted%>/g, banners.links[link].displayName);
      exitLinks += exitLink;
    }
    tpl = tpl.replace(/<%exitLinks%>/g, exitLinks);
    tpl = beautify(tpl, { indent_size: 2 });
    fs.writeFileSync(`${JS_PATH}/components/exit-links.js`, tpl);
  };
  
  const scaffoldClickTags = banners => {
    let tpl = fs.readFileSync(`${TEMPLATE_PATH}/clickTags.tpl`, 'utf8');
    let clickTags = '';
    for (const link in banners.links) {
      clickTags = clickTags + `var ${link} = "${banners.links[link].href}"; `;
    }
    tpl = tpl.replace(/<%clickTags%>/g, clickTags);
    fs.writeFileSync(`${HTML_PATH}/macros/clickTags/links.html`, tpl);
  };

  const scaffoldIMG = banner => {
    checkThenMakeDir(`${IMG_PATH}/pages/${banner}`);
  };

  // Helper Functions
  const checkThenMakeDir = path => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  };

  const checkThenWriteFile = (path, content) => {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, content);
    }
  };

  // Clean Scaffold
  gulp.task('scaffold:clean', () => {
    return del.sync([
      `${RESOURCES_PATH}/html/pages`,
      `${RESOURCES_PATH}/scss/pages`,
      `${RESOURCES_PATH}/js/pages`,
      `${RESOURCES_PATH}/img/pages`
    ]);
  });

  // Re-Scaffold Task
  gulp.task('rescaffold', ['scaffold:clean', 'scaffold']);
  gulp.task('re-scaffold', ['scaffold:clean', 'scaffold']);
  gulp.task('rescaffold', ['scaffold:clean', 'scaffold']);
};
