module.exports = (gulp, banners) => {
		gulp.task('transfer', () => {
			return Object.keys(banners.banners).forEach(banner => {
				return gulp
				.src([
					'resources/**/*',
					'!resources/html',
							'!resources/html/**/*',
							'!resources/img',
							'!resources/img/**/*',
							'!resources/js',
							'!resources/js/**/*',
							'!resources/scss',
							'!resources/scss/**/*',
				])
				.pipe(gulp.dest(`dist/${banner}/`));
			});
		});

	// Watch Files For Changes
	gulp.task('watchTransfer', () => {
		gulp.start('transfer');
		gulp.watch([`resources/**/*`], ['transfer']);
	});
};
