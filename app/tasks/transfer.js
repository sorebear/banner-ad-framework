const merge = require('merge-stream');

module.exports = (gulp, banners) => {
  gulp.task('transfer-production', () => {
    const streams = Object.keys(banners.banners).map(banner => {
      return gulp
        .src([
          'src/**/*',
          '!src/html',
          '!src/html/**/*',
          '!src/img',
          '!src/img/**/*',
          '!src/js',
          '!src/js/**/*',
          '!src/scss',
          '!src/scss/**/*',
        ])
        .pipe(gulp.dest(`dist/unzipped/${banner}/`));
    });

    return merge(streams);
  });

  // Watch Files For Changes
  gulp.task('transfer-watch', ['transfer-production'], () => {
    gulp.watch(['src/**/*'], ['transfer-production']);
  });
};
