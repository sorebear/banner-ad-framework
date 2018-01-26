const uglify = require('gulp-uglify');
const autoPrefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const concat = require('gulp-concat');

// File Paths to Watch
const DIST_PATH = 'dist/shared-assets';
const JS_PATH = 'resources/js/';
const SCSS_PATH = 'resources/scss/';
const IMG_PATH = 'resources/img/';
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
			SCSS_PATH + 'main.scss',
			SCSS_PATH + 'vertical.scss',
			SCSS_PATH + 'horizontal.scss'
		];
		Object.keys(banners).forEach(item => {
			fs.readFile(SCSS_PATH + 'pages/' + item + '.scss', 'utf-8', (err, data) => {
				if (err) throw err;
				if (data) {
					return gulp
						.src(SCSS_PATH + 'pages/' + item + '.scss')
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
						.pipe(gulp.dest(DIST_PATH + '/css'));
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
			.pipe(gulp.dest(DIST_PATH + '/css'));
		// .pipe(liveReload());
	});

	// Scripts
	gulp.task('scripts-shared', () => {
		console.log('Starting Scripts Task');
		return Object.keys(banners).forEach(item => {
			return gulp
				.src([JS_PATH + 'main.js', JS_PATH + 'vertical.js', JS_PATH + 'horizontal.js'])
				.pipe(
					plumber(err => {
						console.log('Scripts Task Error: ', err);
						this.emit('end');
					})
				)
				.pipe(
					babel({
						presets: ['es2015']
					})
				)
				.pipe(sourcemaps.init())
				.pipe(uglify())
				.pipe(sourcemaps.write())
				.pipe(gulp.dest(DIST_PATH + '/js'));
			// .pipe(liveReload());
		});
	});

	// Images
	gulp.task('images-shared', () => {
		console.log('Starting Images Task');
		return Object.keys(banners).forEach(item => {
			return gulp
				.src([
					IMG_PATH + 'shared/' + IMG_EXTENSION,
					IMG_PATH + 'pages/' + item + '/' + IMG_EXTENSION,
					banners[item]['height'] > banners[item]['width']
						? IMG_PATH + 'vertical/' + IMG_EXTENSION
						: IMG_PATH + 'horizontal/' + IMG_EXTENSION
				])
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
	});

	gulp.task('clean-dist-shared', () => {
		return del.sync([DIST_PATH]);
	});
};
