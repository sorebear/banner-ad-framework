const zip = require('gulp-zip');

module.exports = (gulp, banners) => {
	gulp.task('zip', () => {
		return Object.keys(banners.banners).forEach(banner => {
			return gulp
				.src(`dist/${banner}/**/*`)
				.pipe(zip(`${banner}.zip`))
				.pipe(gulp.dest('dist/zips'));
		});
	});
};