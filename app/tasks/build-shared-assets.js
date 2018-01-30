const uglify = require('uglify-es');
const composer = require('gulp-uglify/composer');
const gStreamify = require('gulp-streamify');
const autoPrefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const concat = require('gulp-concat');
const source = require('vinyl-source-stream');
const browserify = require('browserify');

// File Paths to Watch
const DIST_PATH = 'dist/shared-assets';
const JS_PATH = 'resources/js';
const SCSS_PATH = 'resources/scss';
const IMG_PATH = 'resources/img';
const IMG_EXTENSION = '*.{png,jpeg,jpg,svg,gif}';

//Image Compression
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

module.exports = (gulp, banners) => {
	// Sass Styles
	gulp.task('styles-shared', () => {
		console.log('Starting Styles Task');
		let source = [
			`${SCSS_PATH}/vertical.scss`,
			`${SCSS_PATH}/horizontal.scss`
		];
		Object.keys(banners).forEach(banner => {
			fs.readFile(`${SCSS_PATH}/pages/${banner}.scss`, 'utf-8', (err, data) => {
				if (err) throw err;
				if (data) {
					return gulp
						.src(`${SCSS_PATH}/pages/${banner}.scss`)
						.pipe(
							plumber(err => {
								console.log('Styles Task Error: ', err);
								this.emit('end');
							})
						)
						.pipe(sourcemaps.init())
						.pipe(autoPrefixer())
						.pipe(
							sass({
								outputStyle: 'compressed'
							})
						)
						.pipe(sourcemaps.write())
						.pipe(gulp.dest(`${DIST_PATH}/css`));
				}
			});
		});
		return gulp
			.src(source)
			.pipe(
				plumber(err => {
					console.log('Styles Task Error: ', err);
					this.emit('end');
				})
			)
			.pipe(sourcemaps.init())
			.pipe(autoPrefixer())
			.pipe(
				sass({
					outputStyle: 'compressed'
				})
			)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(`${DIST_PATH}/css`));
		// .pipe(liveReload());
	});

	// Scripts
	gulp.task('scripts-shared', () => {
		console.log('Starting Scripts Task');
		const jsFiles = ['main.js', 'vertical.js', 'horizontal.js'];
		jsFiles.forEach(file => {
			browserify(`${JS_PATH}/${file}`)
				.bundle()
				.pipe(source(file))
				.pipe(gulp.dest(`${DIST_PATH}/js`))
		});
		// // .pipe(liveReload());
	});

	// Images
	gulp.task('images-shared', () => {
		console.log('Starting Images Task');
		return gulp
			.src(`${IMG_PATH}/**/${IMG_EXTENSION}`)
			.pipe(
				imagemin([
					imagemin.gifsicle(),
					imagemin.jpegtran(),
					imagemin.optipng(),
					imagemin.svgo(),
					imageminPngquant(),
					imageminJpegRecompress()
				])
			)
			.pipe(gulp.dest(`${DIST_PATH}/img`));
	});

	gulp.task('clean-dist-shared', () => {
		return del.sync([DIST_PATH]);
	});
};
