module.exports = (gulp, banners) => {
  gulp.task('transfer-production', () => {
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
        .pipe(gulp.dest(`dist/unzipped/${banner}/`));
    });
  });

  // Watch Files For Changes
  gulp.task('transfer-watch', () => {
    gulp.start('transfer-production');
    gulp.watch(['resources/**/*'], ['transfer-production']);
  });
};
