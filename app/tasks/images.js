const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');

// File Paths to Watch
const IMG_PATH = 'resources/img';
const IMG_EXTENSION = '*.{png,svg,gif,jpg,jpeg}';

module.exports = (gulp, banners) => {
	gulp.task('images', () => {
		return Object.keys(banners.banners).forEach(banner => {
			const { orientation } = banners.banners[banner];
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
				.pipe(gulp.dest(`dist/${banner}/img`));
		});
	});

	// Watch Image Files For Changes
	gulp.task('watchImages', () => {
		gulp.start('images');
		gulp.watch(
			[`${IMG_PATH}/${IMG_EXTENSION}`, `${IMG_PATH}/**/${IMG_EXTENSION}`],
			['images']
		);
	});
};
