const gulp = require("gulp");
const uglify = require("gulp-uglify");
const autoPrefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const del = require("del");
const concat = require("gulp-concat");
const banners = require('./banners.json');
const project = require('./project.json');

// File Paths to Watch
const DIST_PATH = "dist";
const HTML_PATH = "resources/html/";
const JS_PATH = "resources/js/";
const SCSS_PATH = "resources/scss/";
const IMG_PATH = "resources/img/";
const IMG_EXTENSION = "*.{png,jpeg,jpg,svg,gif}";

//Image Compression
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminJpegRecompress = require("imagemin-jpeg-recompress");

/**
 * Render Nunjucks 
 */
require('./app/tasks/nunjucks.js')(gulp, banners);

/**
 * Generate Scaffold
 */
require('./app/tasks/scaffold.js')(gulp, banners);

/**
 * Build With Seperate Assets
 */
require('./app/tasks/build-seperated-assets.js')(gulp, banners);

/**
 * Build With Shared Assets
 */
require('./app/tasks/build-shared-assets.js')(gulp, banners);

gulp.task("default", ["build:shared"]);

// Build Project with Shared Assets (This is default)
gulp.task("build:shared",
	["clean-dist-shared", "styles-shared", "scripts-shared"],
	() => {
		gulp.start('html-shared');
	}
);

// Build Project with Seperated Assets
gulp.task("build:seperated",
	["clean-dist-seperated", "styles-seperated", "scripts-seperated", "html-seperated"],
	() => {
		console.log("Starting Build Task with Seperated Assets")
	}
);

// Build Project WITH Pictures and Shared Assets
gulp.task("build:shared-pictures",
	["clean-dist-shared", "styles-shared", "scripts-shared", "images-shared"],
	() => {
		gulp.start('html-shared');
	}
);

// Build Project WITH Pictures and Seperated Assets
gulp.task("build:seperated-pictures",
	["clean-dist-seperated", "images-seperated", "styles-seperated", "scripts-seperated", "html-seperated"],
	() => {
		console.log("Starting Build Task with Seperated Assets")
	}
);

// Watch Files For Changes
gulp.task("watch", ["default"], () => {
	console.log("Starting Watch Task");
	require("./server.js");
	liveReload.listen();
	gulp.watch(SCRIPTS_PATH, ["scripts"]);
	gulp.watch(SCSS_PATH, ["styles"]);
});