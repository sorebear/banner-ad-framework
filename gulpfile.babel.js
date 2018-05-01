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
gulp.task('build', [
	'clean-dist',
	'watchImages',
	'watchStyles',
	'watchScripts',
	'watchHtml',
	'watchTransfer',
]);

gulp.task('build:doubleclick', [
	'clean-dist',
	'watchImages',
	'watchStyles',
	'watchScripts',
	'watchDoubleclickHtml',
	'watchTransfer',
]);

gulp.task('deploy', () => {
	runSequence(
		'clean-dist',
		[
			'images',
			'styles',
			'scripts',
			'html',
			'transfer'
		]);
});

// gulp.task('deploy', ['zip']);

/**
 * Clean dist folders
 */
gulp.task('clean-dist', () => {
	return del.sync('dist');
});
