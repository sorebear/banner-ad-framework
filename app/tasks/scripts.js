const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');

// File Paths to Watch
const JS_PATH = 'resources/js';

module.exports = (gulp, banners) => {
  gulp.task('scripts-develop', () => {
    return Object.keys(banners.banners).forEach(banner => {
      return browserify(`${JS_PATH}/pages/${banner}.js`)
        .transform('babelify', { presets: ['es2015'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(`dist/unzipped/${banner}/js`));
    });
  });

  gulp.task('scripts-production', () => {
    return Object.keys(banners.banners).forEach(banner => {
      return browserify(`${JS_PATH}/pages/${banner}.js`)
        .transform('babelify', { presets: ['es2015'] })
        .bundle()				
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(`dist/unzipped/${banner}/js`));
    });
  });

  // Watch JS Files For Changes
  gulp.task('scripts-watch', () => {
    gulp.start('scripts-develop');
    gulp.watch([`${JS_PATH}/**/*.js`, `${JS_PATH}/*.js`], ['scripts-develop']);
  });
};
