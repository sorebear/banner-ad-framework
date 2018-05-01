const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const banners = require('./banners.json');

/**
 * getTasks automatically pulls all gulp tasks from directory ./app/tasks/
 */
require('./app/getTasks.js')(gulp, banners);

/**
 * Build Project WITH Shared Assets (This is default)
 */
gulp.task('default', ['build']);

/**
 * Build Project WITH separated Assets
 */
gulp.task('develop', () => {
	runSequence(
		[
			'clean-dist',
			'scripts-not-for-doubleclick'
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
			'clean-dist',
			'scripts-for-doubleclick'
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
			'clean-dist',
			'scripts-not-for-doubleclick'
		],
		[
			'images',
			'styles-production',
			'scripts-production',
			'html',
			'transfer',
			'transfer-index'
		]
	);
});

gulp.task('build:doubleclick', () => {
	runSequence(
		[
			'clean-dist',
			'scripts-for-doubleclick'
		],
		[
			'images',
			'styles-production',
			'scripts-production',
			'html-doubleclick',
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
