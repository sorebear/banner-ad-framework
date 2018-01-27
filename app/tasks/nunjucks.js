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

const gutil = require('gulp-util');
const nunjucksRender = require('gulp-nunjucks-render');
const debug = require('gulp-debug');
const fs = require('fs');

module.exports = (gulp, banners) => {
	const HTML_PAGES_PATH = './resources/html/pages';
	const HTML_COMP_PATH = './resources/html/components';
	const DIST_SHARED_PATH = 'dist/shared-assets';
	const DIST_SEPERATED_PATH = 'dist/seperated-assets';

	gulp.task('html-seperated', () => {

		return Object.keys(banners).forEach(banner => {
			return gulp
				.src(`${HTML_PAGES_PATH}/${banner}.html`)
				.pipe(
					nunjucksRender({
						path: HTML_COMP_PATH
					})
				)
				.pipe(gulp.dest(`${DIST_SEPERATED_PATH}/${banner}`));
		});
	});

	gulp.task('html-shared', () => {

		return Object.keys(banners).forEach(banner => {
			const orientation =
				banners[banner]['height'] > banners[banner]['width'] ? 'vertical' : 'horizontal';
			const pageStyle = fs.existsSync(`${DIST_SHARED_PATH}/css/${banner}.css`)
				? `css/${banner}.css`
				: null;
			return gulp
				.src(`${HTML_PAGES_PATH}/${banner}.html`)
				.pipe(
					nunjucksRender({
						data: {
							pageStyle: pageStyle,
							orientationStyle: `css/${orientation}.css`,
							orientationScript: `js/${orientation}.js`
						},
						path: HTML_COMP_PATH,
					})
				)
				.pipe(gulp.dest(DIST_SHARED_PATH));
		});
	});

	//   gulp.task('watchHtml', () =>
	//     {
	//       gulp.start('html');

	//       gulp.watch([htmlLoc + '/**/*.html'], ['html']);
	//     }
	//   );
};
