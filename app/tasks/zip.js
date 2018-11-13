const zip = require('gulp-zip');
const merge = require('merge-stream');
const packageJson = require('../../package.json');

module.exports = (gulp, banners) => {
  gulp.task('zip-production', () => {
    const zipped = Object.keys(banners.banners).map(banner => {
      return gulp
        .src(`dist/unzipped/${banner}/**/*`)
        .pipe(zip(`${banner}.zip`))
        .pipe(gulp.dest('dist/zipped'));
    });

    const singleZip = gulp
      .src('dist/unzipped/**/*')
      .pipe(zip(`${packageJson.name}.zip`))
      .pipe(gulp.dest('dist/single-zip'));
    
    const streams = [ ...zipped, singleZip ];
    return merge(streams);
  });

  gulp.task('zip-watch', () => {});
  gulp.task('zip', [ 'zip-production' ]);
};