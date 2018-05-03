const fs = require('fs');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');

// File Paths to Watch
const JS_PATH = 'resources/js';

module.exports = (gulp, banners) => {
	gulp.task('scripts-develop', () => {
		return Object.keys(banners.banners).forEach(banner => {
			const { orientation } = banners.banners[banner];
			return browserify([`${JS_PATH}/pages/${banner}.js`, `${JS_PATH}/orientation/${orientation}.js`])
				.bundle()
				.pipe(source('bundle.js'))
				.pipe(gulp.dest(`dist/${banner}/js`));
		});
	});

	gulp.task('scripts-production', () => {
		return Object.keys(banners.banners).forEach(banner => {
			const { orientation } = banners.banners[banner];
			if (banners.banners[banner].static) {
				return browserify(`${JS_PATH}/main-static.js`)
				.bundle()
				.pipe(source('bundle.js'))
				.pipe(gulp.dest(`dist/${banner}/js`));
			}
			return browserify([`${JS_PATH}/main.js`, `${JS_PATH}/orientation/${orientation}.js`])
				.bundle()				
				.pipe(source('bundle.js'))
				.pipe(buffer())
				.pipe(uglify())
				.pipe(gulp.dest(`dist/${banner}/js`));
		});
	});

	gulp.task('scripts-not-for-doubleclick', () => {
		let mainJS = fs.readFileSync(`resources/js/main.js`, 'utf8');
		let mainStaticJS = fs.readFileSync(`resources/js/main-static.js`, 'utf8');
		mainJS = mainJS.replace('enabler(politeInit)', 'politeInit()');
		mainStaticJS = mainStaticJS.replace('enabler(politeInit)', 'politeInit()');
		fs.writeFileSync(`resources/js/main.js`, mainJS);
	});

	gulp.task('scripts-for-doubleclick', () => {
		let mainJS = fs.readFileSync(`resources/js/main.js`, 'utf8');
		let mainStaticJS = fs.readFileSync(`resources/js/main-static.js`, 'utf8');
		mainJS = mainJS.replace('politeInit()', 'enabler(politeInit)');
		mainStaticJS = mainStaticJS.replace('politeInit()', 'enabler(politeInit)')
		fs.writeFileSync(`resources/js/main.js`, mainJS);
	});

	// Watch JS Files For Changes
	gulp.task('watchScripts', () => {
		gulp.start('scripts-develop');
		gulp.watch([`${JS_PATH}/**/*.js`, `${JS_PATH}/*.js`], ['scripts-develop']);
	});
};
