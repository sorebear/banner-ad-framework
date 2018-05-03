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
			return browserify([`${JS_PATH}/pages/${banner}.js`, `${JS_PATH}/orientation/${orientation}.js`])
				.bundle()				
				.pipe(source('bundle.js'))
				.pipe(buffer())
				.pipe(uglify())
				.pipe(gulp.dest(`dist/${banner}/js`));
		});
	});

	// Watch JS Files For Changes
	gulp.task('watchScripts', () => {
		gulp.start('scripts-develop');
		gulp.watch([`${JS_PATH}/**/*.js`, `${JS_PATH}/*.js`], ['scripts-develop']);
	});
};
