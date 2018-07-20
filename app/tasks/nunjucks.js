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
						path: [`${HTML_PATH}/components`, `${HTML_PATH}/macros/aLinks`]
					})
				)
				.pipe(htmlmin({collapseWhitespace: production}))
				.pipe(gulp.dest(`dist/${banner}`));
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
						path: [`${HTML_PATH}/components`, `${HTML_PATH}/macros/dcLinks`]
					})
				)
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest(`dist/${banner}`));
		});
	}

	gulp.task('html-develop', () => {
		htmlTask(false);
	});

	gulp.task('html-production', () => {
		htmlTask(true);
	});

	gulp.task('html-doubleclick-develop', () => {
		htmlDoubleclickTask(false);
	});

	gulp.task('html-doubleclick-production', () => {
		htmlDoubleclickTask(true);
	});

	gulp.task('transfer-index', () => {
		return gulp.src(`${HTML_PATH}/index.html`).pipe(gulp.dest('dist'));
	});

	// Watch Files For Changes
	gulp.task('watchHtml', () => {
		gulp.start(['html-develop', 'transfer-index']);
		gulp.watch([
			`${HTML_PATH}/**/*.html`,
			`${HTML_PATH}/*.html`,
		],
		['html-develop']);
	});

	gulp.task('watchDoubleclickHtml', () => {
		gulp.start(['html-doubleclick-develop', 'transfer-index']);
		gulp.watch([
			`${HTML_PATH}/**/*.html`,
			`${HTML_PATH}/*.html`,
		],
		['html-doubleclick-develop']);
	});
};
