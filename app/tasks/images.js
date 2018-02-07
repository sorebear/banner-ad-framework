const flatten = require('gulp-flatten');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');

// File Paths to Watch
const IMG_PATH = 'resources/img';
const IMG_EXTENSION = '*.{png,svg,gif}';

module.exports = (gulp, banners) => {
	// Images
	gulp.task('images-shared', () => {
		console.log('Starting Images Task');
		return gulp
			.src(`${IMG_PATH}/**/${IMG_EXTENSION}`)
			.pipe(
				imagemin([
					imagemin.gifsicle(),
					imagemin.optipng(),
					imagemin.svgo(),
					imageminPngquant()
				])
			)
			.pipe(flatten())
			.pipe(gulp.dest('dist/shared-assets/img'));
	});

	// Images
	gulp.task('images-separated', () => {
		console.log('Starting Images Task');
		return Object.keys(banners).forEach(banner => {
			const { orientation } = banners[banner];
			return gulp
				.src([
					`${IMG_PATH}/shared/${IMG_EXTENSION}`,
					`${IMG_PATH}/pages/${banner}/${IMG_EXTENSION}`,
					`${IMG_PATH}/${orientation}/${IMG_EXTENSION}`
				])
				.pipe(
					imagemin([
						imagemin.gifsicle(),
						imagemin.optipng(),
						imagemin.svgo(),
						imageminPngquant()
					])
				)
				.pipe(gulp.dest(`dist/separated-assets/${banner}/img`));
		});
	});

	// Watch Sass Files For Changes
	gulp.task('watchImages', () => {
		gulp.start('images-shared');
		gulp.watch(
			[`${IMG_PATH}/${IMG_EXTENSION}`, `${IMG_PATH}/**/${IMG_EXTENSION}`],
			['images-shared']
		);
	});
};
