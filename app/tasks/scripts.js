const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const browserify = require('browserify');

// File Paths to Watch
const JS_PATH = 'resources/js';

module.exports = (gulp, banners) => {
	
	// Scripts Shared
	gulp.task('scripts-shared', () => {
		console.log('Starting Scripts Task');
		const jsFiles = ['main.js', 'vertical.js', 'horizontal.js'];
		jsFiles.forEach(file => {
			browserify(`${JS_PATH}/${file}`)
				.bundle()
				.pipe(source(file))
				.pipe(gulp.dest('dist/shared-assets/js'));
		});
   });
   
   // Scripts Seperated
	gulp.task('scripts-seperated', () => {
		console.log('Starting Scripts Task');
		return Object.keys(banners).forEach(banner => {
			const { orientation } = banners[banner];
			return browserify([
				`${JS_PATH}/main.js`,
				`${JS_PATH}/${orientation}.js`,
				`${JS_PATH}/vendor/jquery-3.3.1.min.js`
			])
				.bundle()
				.pipe(source('main.js'))
				.pipe(gulp.dest(`dist/seperated-assets/${banner}/js`));
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
};