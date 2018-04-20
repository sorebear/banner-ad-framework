const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');

// File Paths to Watch
const JS_PATH = 'resources/js';

module.exports = (gulp, banners) => {
	
	// Scripts Shared
	gulp.task('scripts-shared', () => {
		const jsFiles = ['main.js', 'vertical.js', 'horizontal.js'];
		jsFiles.forEach(file => {
			browserify(`${JS_PATH}/${file}`)
				.bundle()
				.pipe(source(file))
				.pipe(gulp.dest('dist/shared-assets/js'));
		});
   });
   
   // Scripts separated
	gulp.task('scripts-separated', () => {
		return Object.keys(banners).forEach(banner => {
			const { orientation } = banners[banner];
			return browserify([
				`${JS_PATH}/main.js`,
				`${JS_PATH}/${orientation}.js`,
			])
				.bundle()
				.pipe(source('bundle.js'))
				.pipe(buffer())
				.pipe(uglify())
				.pipe(gulp.dest(`dist/separated-assets/${banner}/js`));
		});
   });
   
   // Watch JS Files For Changes
	gulp.task('watchScripts', () => {
		gulp.start('scripts-shared');
		gulp.watch([
			`${JS_PATH}/**/*.js`,
			`${JS_PATH}/*.js`,
      ],
      ['scripts-shared']);
	});

	// Watch JS Files For Changes
	gulp.task('watchSeparatedScripts', () => {
	gulp.start('scripts-separated');
	gulp.watch([
		`${JS_PATH}/**/*.js`,
		`${JS_PATH}/*.js`,
		],
		['scripts-separated']);
	});
};