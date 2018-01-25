const gulp = require("gulp");
const uglify = require("gulp-uglify");
const autoPrefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const del = require("del");
const fs = require('fs');
const concat = require("gulp-concat");
const banners = require('./banners.json');
const project = require('./project.json');

// File Paths to Watch
const DIST_PATH = "dist";
const RESOURCES_PATH = "resources";
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
 * getTasks automatically pulls all gulp tasks form directory ./app/tasks/
 */
require('./app/tasks/nunjucks.js')(gulp, banners);


const checkThenMakeDir = path => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

const checkThenWriteFile = (path, content) => {
	if (!fs.existsSync(path)) {
		fs.writeFileSync(path, content);
	}
}

gulp.task("scaffold", () => {
	checkThenMakeDir(RESOURCES_PATH);
	const subFolders = ['html', 'scss', 'js', 'img'];
	for (let i = 0; i < subFolders.length; i++) {
		checkThenMakeDir(RESOURCES_PATH + "/" + subFolders[i]);
		checkThenMakeDir(RESOURCES_PATH + "/" + subFolders[i] + "/pages");
	}
	for (let item in banners) {
		scaffoldHTML(item);
		scaffoldJS(item);
		scaffoldSCSS(item);
		scaffoldIMG(item);
	}
})

// Scaffold SCSS
const scaffoldSCSS = item => {
	checkThenWriteFile(SCSS_PATH + "/pages/" + item + ".scss", "//Place exclusive styles for " + item + " here.");
}

// Scaffold JS
const scaffoldJS = item => {
	checkThenWriteFile(JS_PATH + "/pages/" + item + ".js", "//Place exclusive scripts for " + item + " here.");
}

// Scaffold HTML
const scaffoldHTML = item => {
	checkThenWriteFile(
		HTML_PATH + "/pages/" + item + ".html", 
		`{% set banner = "${item}" %}\n\n{% extends "layout.html" %}\n{% block bodyClass %}{% endblock %}\n\n{% block content %}\n  <!--enter content for ${item} here-->\n{% endblock %}`
	);
}

// Scaffold IMG
const scaffoldIMG = item => {
	checkThenMakeDir(IMG_PATH + "/pages/" + item);
}

// Re-Scaffold Task
gulp.task(
	"re-scaffold",
	["clean-scaffold", "scaffold"],
	() => {
		console.log("Rebuilding Resources");
	}
);

// Sass Styles
gulp.task("styles", () => {
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
gulp.task("scripts", () => {
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
gulp.task("images", () => {
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

gulp.task("clean-dist", () => {
	return del.sync([DIST_PATH]);
});

gulp.task("clean-scaffold", () => {
	return del.sync([RESOURCES_PATH + "/html/pages", RESOURCES_PATH + "/js/pages", RESOURCES_PATH + "/scss/pages"])
})

// Default Task
gulp.task("default",
	["clean-dist", "images", "styles", "scripts"],
	() => {
		console.log("Starting Default Task");
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