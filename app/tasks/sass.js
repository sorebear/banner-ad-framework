const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');

// File Paths to Watch
const SCSS_PATH = 'resources/scss';

module.exports = (gulp, banners) => {
	gulp.task('styles-develop', () => {
		return Object.keys(banners.banners).forEach(banner => {
			return gulp
				.src(`${SCSS_PATH}/pages/${banner}.scss`)
				.pipe(
					plumber(err => {
						console.log('STYLES TASK ERROR: ', err);
					})
				)
				.pipe(sourcemaps.init())
				.pipe(sass())
				.pipe(sourcemaps.write())
				.pipe(concat('main.css'))
				.pipe(gulp.dest(`dist/${banner}/css`));
		});
	});

	gulp.task('styles-production', () => {
		return Object.keys(banners.banners).forEach(banner => {
			return gulp
				.src(`${SCSS_PATH}/pages/${banner}.scss`)
				.pipe(
					sass({
						outputStyle: 'compressed'
					})
				)
				.pipe(autoPrefixer())
				.pipe(concat('main.css'))
				.pipe(gulp.dest(`dist/${banner}/css`));
		});
	});

	// Watch Sass Files For Changes
	gulp.task('styles-watch', () => {
		gulp.start('styles-develop');
		gulp.watch([`${SCSS_PATH}/**/*.scss`, `${SCSS_PATH}/*.scss`], ['styles-develop']);
	});
};
