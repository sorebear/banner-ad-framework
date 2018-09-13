/**
 * NUNJUCKS HTML TEMPLATING
 *
 * Nunjucks templating for key message HTML as well as AJAX'ed html files.
 * All html is compiled from the resources/html directory.
 *
 * An HTML file for each banner is generated from the directory
 * resources/html/pages. A template for each file will be found
 * in that folder, named [banner-name].html. If it's a file is missing run
 * `gulp scaffold` to generate it from the banners.json.
 *
 * To learn about nunjucks rendering refer to their documentation:
 * https://mozilla.github.io/nunjucks/templating.html
 *
 * The style should be familar to those who've used jinja2.
 */

const nunjucksRender = require('gulp-nunjucks-render');
const htmlmin = require('gulp-htmlmin');

module.exports = (gulp, banners) => {
  const HTML_PATH = './resources/html';

  function htmlTask(production) {
    return Object.keys(banners.banners).forEach(banner => {
      const { orientation } = banners.banners[banner];
      const dataObject = {
        doubleclick: '',
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
  }

  function htmlDoubleclickTask() {
    return Object.keys(banners.banners).forEach(banner => {
      const { orientation } = banners.banners[banner];
      const dataObject = {
        doubleclick: 'doubleclick',
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
  }

  gulp.task('html-campaign-develop', () => {
    htmlTask(false);
  });

  gulp.task('html-campaign-production', () => {
    htmlTask(true);
  });

  gulp.task('html-studio-develop', () => {
    htmlDoubleclickTask(false);
  });

  gulp.task('html-studio-production', () => {
    htmlDoubleclickTask(true);
  });

  gulp.task('transfer-index', () => {
    return gulp.src(`${HTML_PATH}/index.html`).pipe(gulp.dest('dist/unzipped'));
  });

  // Watch Files For Changes
  gulp.task('html-campaign-watch', () => {
    gulp.start(['html-campaign-develop', 'transfer-index']);
    gulp.watch([
      `${HTML_PATH}/**/*.html`,
      `${HTML_PATH}/*.html`,
    ],
    ['html-campaign-develop']);
  });

  gulp.task('html-studio-watch', () => {
    gulp.start(['html-studio-develop', 'transfer-index']);
    gulp.watch([
      `${HTML_PATH}/**/*.html`,
      `${HTML_PATH}/*.html`,
    ],
    ['html-studio-develop']);
  });
};
