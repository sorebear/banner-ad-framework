const merge = require('merge-stream');

module.exports = (gulp, banners) => {
  gulp.task('transfer-production', () => {
    const streams = Object.keys(banners.banners).map(banner => {
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

    return merge(streams);
  });

  // Watch Files For Changes
  gulp.task('transfer-watch', ['transfer-production'], () => {
    gulp.watch(['resources/**/*'], ['transfer-production']);
  });
};
