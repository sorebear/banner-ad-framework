const uglify = require("gulp-uglify");
const autoPrefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const del = require("del");
const concat = require("gulp-concat");

// File Paths to Watch
const DIST_PATH = "dist/seperated-assets";
const JS_PATH = "resources/js/";
const SCSS_PATH = "resources/scss/";
const IMG_PATH = "resources/img/";
const IMG_EXTENSION = "*.{png,jpeg,jpg,svg,gif}";

//Image Compression
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");

module.exports = (gulp, banners) =>
{
  // Sass Styles
   gulp.task("styles-seperated", () => {
      console.log("Starting Styles Task");
      return Object.keys(banners).forEach(item => {
         return gulp
         .src([
            SCSS_PATH + "main.scss", 
            SCSS_PATH + "pages/" + item + ".scss", 
            banners[item]['height'] > banners[item]['width'] ? SCSS_PATH + "vertical.scss" : SCSS_PATH + "horizontal.scss"
         ])
         .pipe(
            plumber(err => {
               console.log("Styles Task Error: ", err);
               this.emit("end");
            })
         )
         .pipe(sourcemaps.init())
         .pipe(autoPrefixer())
         .pipe(
            sass({
               outputStyle: "compressed"
            })
         )
         .pipe(concat('main.css'))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(DIST_PATH + "/" + item + "/css"));
         // .pipe(liveReload());
      });
   });

   // Scripts
   gulp.task("scripts-seperated", () => {
      console.log("Starting Scripts Task");
      return Object.keys(banners).forEach(item => {
         return gulp
         .src([
            JS_PATH + "main.js",
            JS_PATH + "pages/" + item + ".js",
            banners[item]['height'] > banners[item]['width'] ? JS_PATH + "vertical.js" : JS_PATH + "horizontal.js"
         ])
         .pipe(
            plumber(err => {
               console.log("Scripts Task Error: ", err);
               this.emit("end");
            })
         )
         .pipe(
            babel({
               presets: ["es2015"]
            })
         )
         .pipe(sourcemaps.init())
         .pipe(uglify())
         .pipe(concat("main.min.js"))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(DIST_PATH + "/" + item + "/js"));
         // .pipe(liveReload());
      });
   });

   // Images
   gulp.task("images-seperated", () => {
      console.log("Starting Images Task");
      return Object.keys(banners).forEach(item => {
         return gulp
         .src([
            IMG_PATH + "shared/" + IMG_EXTENSION,
            IMG_PATH + "pages/" + item + "/" + IMG_EXTENSION,
            banners[item]['height'] > banners[item]['width'] ? IMG_PATH + "vertical/" + IMG_EXTENSION : IMG_PATH + "horizontal/" + IMG_EXTENSION
         ])
         .pipe(
            imagemin([
               imagemin.gifsicle(),
               imagemin.jpegtran(),
               imagemin.optipng(),
               imagemin.svgo(),
               imageminPngquant(),
               imageminJpegRecompress()
            ])
         )
         .pipe(gulp.dest(`${DIST_PATH}/${item}/img`));
      });
   });

   gulp.task("clean-dist-seperated", () => {
      return del.sync([DIST_PATH]);
   }); 
};