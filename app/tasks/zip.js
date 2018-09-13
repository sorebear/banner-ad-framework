const zip = require('gulp-zip');
const packageJson = require('../../package.json');

module.exports = (gulp, banners) => {
  gulp.task('zip-production', () => {
    Object.keys(banners.banners).forEach(banner => {
      return gulp
        .src(`dist/unzipped/${banner}/**/*`)
        .pipe(zip(`${banner}.zip`))
        .pipe(gulp.dest('dist/zipped'));
    });

    return gulp
      .src('dist/unzipped')
      .pipe(zip(`${packageJson.name}.zip`))
      .pipe(gulp.dest('dist/single-zip'));
  });

  gulp.task('zip-watch', () => {});
  gulp.task('zip', [ 'zip-production' ]);
};