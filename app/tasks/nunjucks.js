/**
 * NUNJUCKS HTML TEMPLATING
 *
 * Nunjucks templating for key message HTML as well as AJAX'ed html files.
 * All html is compiled from the src/html directory.
 *
 * An HTML file for each banner is generated from the directory
 * src/html/pages. A template for each file will be found
 * in that folder, named [banner-name].html. If it's a file is missing run
 * `gulp scaffold` to generate it from the banners.json.
 *
 * To learn about nunjucks rendering refer to their documentation:
 * https://mozilla.github.io/nunjucks/templating.html
 *
 * The style should be familar to those who've used jinja2.
 */

const nunjucksRender = require('gulp-nunjucks-render');
const beautify = require('js-beautify');
const htmlmin = require('gulp-htmlmin');
const merge = require('merge-stream');

const HTML_PATH = './src/html';

module.exports = (gulp, banners) => {  
  function htmlCampaignTask(production) {

    const streams = Object.keys(banners.banners).map(banner => {
      const { orientation } = banners.banners[banner];
      const dataObject = {
        studio: '',
        orientationStyle: `css/${orientation}.css`
      };
      Object.keys(banners.links).forEach(link => {
        dataObject[link] = banners.links[link].href;
      });
      return gulp
        .src(`${HTML_PATH}/pages/${banner}.html`)
        .pipe(
          nunjucksRender({
            data: dataObject,
            path: [`${HTML_PATH}/layouts`, `${HTML_PATH}/components`, `${HTML_PATH}/macros/clickTags`]
          })
        )
        .pipe(htmlmin({collapseWhitespace: production}))
        .pipe(gulp.dest(`dist/unzipped/${banner}`));
    });

    return merge(streams);
  }

  function htmlStudioTask() {
    const streams = Object.keys(banners.banners).map(banner => {
      const { orientation } = banners.banners[banner];
      const dataObject = {
        studio: 'studio',
        orientationStyle: `css/${orientation}.css`
      };
      Object.keys(banners.links).forEach(link => {
        dataObject[link] = link;
      });
      return gulp
        .src(`${HTML_PATH}/pages/${banner}.html`)
        .pipe(
          nunjucksRender({
            data: dataObject,
            path: [`${HTML_PATH}/layouts`, `${HTML_PATH}/components`, `${HTML_PATH}/macros/exitLinks`]
          })
        )
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(`dist/unzipped/${banner}`));
    });

    return merge(streams);
  }

  gulp.task('html-campaign-develop', () => {
    return htmlCampaignTask(false);
  });

  gulp.task('html-campaign-production', () => {
    return htmlCampaignTask(true);
  });

  gulp.task('html-studio-develop', () => {
    return htmlStudioTask(false);
  });

  gulp.task('html-studio-production', () => {
    return htmlStudioTask(true);
  });

  // Watch Files For Changes
  gulp.task('html-campaign-watch', ['html-campaign-develop'], () => {
    gulp.watch([
      `${HTML_PATH}/**/*.html`,
      `${HTML_PATH}/*.html`,
    ],
    ['html-campaign-develop']);
  });

  gulp.task('html-studio-watch', ['html-studio-develop'], () => {
    gulp.watch([
      `${HTML_PATH}/**/*.html`,
      `${HTML_PATH}/*.html`,
    ],
    ['html-studio-develop']);
  });
};
