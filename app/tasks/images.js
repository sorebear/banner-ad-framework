const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');

// File Paths to Watch
const IMG_PATH = 'resources/img';
const IMG_EXTENSION = '*.{png,svg,gif,jpg,jpeg}';

module.exports = (gulp, banners) => {
  gulp.task('images-production', () => {
    const streams = Object.keys(banners.banners).map(banner => {
      const { orientation } = banners.banners[banner];
      return gulp
        .src([
          `${IMG_PATH}/shared/${IMG_EXTENSION}`,
          `${IMG_PATH}/pages/${banner}/${IMG_EXTENSION}`,
          `${IMG_PATH}/${orientation}/${IMG_EXTENSION}`
        ])
        .pipe(imagemin())
        .pipe(gulp.dest(`dist/unzipped/${banner}/img`));
    });
    
    return merge(streams);
  });

  // Watch Image Files For Changes
  gulp.task('images-watch', ['images-production'], () => {
    gulp.watch(
      [`${IMG_PATH}/${IMG_EXTENSION}`, `${IMG_PATH}/**/${IMG_EXTENSION}`],
      ['images-production']
    );
  });
};
