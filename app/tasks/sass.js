const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const merge = require('merge-stream');
const notifier = require('node-notifier');

// File Paths to Watch
const SCSS_PATH = 'resources/scss';

module.exports = (gulp, banners) => {
  gulp.task('styles-develop', () => {
    const streams = Object.keys(banners.banners).map(banner => {
      return gulp
        .src(`${SCSS_PATH}/pages/${banner}.scss`)
        .pipe(
          plumber(err => {
            notifier.notify({
              title: 'SCSS Compilation Error',
              message: `Check line ${err.line} in ${err.file}`,
              icon: './bolognese-banners.jpg'
            });
            console.log(`SCSS Compilation Error: Check link ${err.line} in ${err.file}`);
          })
        )
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(`dist/unzipped/${banner}/css`));
    });

    return merge(streams);
  });

  gulp.task('styles-production', () => {
    const streams = Object.keys(banners.banners).map(banner => {
      return gulp
        .src(`${SCSS_PATH}/pages/${banner}.scss`)
        .pipe(
          sass({
            outputStyle: 'compressed'
          })
        )
        .pipe(autoPrefixer())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(`dist/unzipped/${banner}/css`));
    });

    return merge(streams);
  });

  // Watch Sass Files For Changes
  gulp.task('styles-watch', ['styles-develop'], () => {
    gulp.watch([`${SCSS_PATH}/**/*.scss`, `${SCSS_PATH}/*.scss`], ['styles-develop']);
  });
};
