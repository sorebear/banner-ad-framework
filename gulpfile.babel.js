const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const banners = require('./banners.json');

/**
 * getTasks automatically pulls all gulp tasks from directory ./app/tasks/
 */
require('./app/getTasks.js')(gulp, banners);

/**
 * Make Development Build of Process with Watch
 */
gulp.task('default', ['develop:doubleclick']);

/**
 * Build Project WITH separated Assets
 */
gulp.task('develop', () => {
	runSequence(
		[
			'clean-dist'
		],
		[
			'watchImages',
			'watchStyles',
			'watchScripts',
			'watchHtml',
			'watchTransfer',
		]
	);
});

gulp.task('develop:doubleclick', () => {
	runSequence(
		[
			'clean-dist'
		],
		[
			'clean-dist',
			'watchImages',
			'watchStyles',
			'watchScripts',
			'watchDoubleclickHtml',
			'watchTransfer',
		]
	);
});

gulp.task('build', () => {
	runSequence(
		[
			'clean-dist'
		],
		[
			'images',
			'styles-production',
			'scripts-production',
			'html-production',
			'transfer',
			'transfer-index'
		]
	);
});

gulp.task('build:doubleclick', () => {
	runSequence(
		[
			'clean-dist'
		],
		[
			'images',
			'styles-production',
			'scripts-production',
			'html-doubleclick-production',
			'transfer',
			'transfer-index'
		]
	);
});

/**
 * Clean dist folders
 */
gulp.task('clean-dist', () => {
	return del.sync('dist');
});
