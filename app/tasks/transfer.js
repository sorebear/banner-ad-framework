module.exports = (gulp, banners) => {
	// Images
	gulp.task('transfer-shared', () => {
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
			.pipe(gulp.dest('dist/shared-assets'));
	});

		// Scripts separated
		gulp.task('transfer-separated', () => {
			return Object.keys(banners).forEach(banner => {
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
				.pipe(gulp.dest(`dist/separated-assets/${banner}/`));
			});
		});

	// Watch Files For Changes
	gulp.task('watchTransfer', () => {
		gulp.start('transfer-shared');
		gulp.watch([`resources/**/*`], ['transfer-shared']);
	});

	gulp.task('watchSeparatedTransfer', () => {
		gulp.start('transfer-separated');
		gulp.watch([`resources/**/*`], ['transfer-separated']);
	});
};
