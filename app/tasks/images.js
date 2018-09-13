const imagemin = require('gulp-imagemin');
const stream = require('event-stream');

// File Paths to Watch
const IMG_PATH = 'resources/img';
const IMG_EXTENSION = '*.{png,svg,gif,jpg,jpeg}';

module.exports = (gulp, banners) => {
  gulp.task('images-production', () => {
    const bannerArr = [];
    Object.keys(banners.banners).forEach((banner, index) => {
      const { orientation } = banners.banners[banner];
      const bannerImages = gulp
        .src([
          `${IMG_PATH}/shared/${IMG_EXTENSION}`,
          `${IMG_PATH}/pages/${banner}/${IMG_EXTENSION}`,
          `${IMG_PATH}/${orientation}/${IMG_EXTENSION}`
        ])
        .pipe(imagemin())
        .pipe(gulp.dest(`dist/unzipped/${banner}/img`));
      bannerArr.push(bannerImages);
    });
    return stream.concat([ ...bannerArr ]);
  });

  // Watch Image Files For Changes
  gulp.task('images-watch', () => {
    gulp.start('images-production');
    gulp.watch(
      [`${IMG_PATH}/${IMG_EXTENSION}`, `${IMG_PATH}/**/${IMG_EXTENSION}`],
      ['images-production']
    );
  });
};
