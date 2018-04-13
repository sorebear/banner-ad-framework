const gulp = require('gulp');
const del = require('del');
const banners = require('./banners.json');

/**
 * getTasks automatically pulls all gulp tasks from directory ./app/tasks/
 */
require('./app/getTasks.js')(gulp, banners);

/**
 * Build Project WITH Shared Assets (This is default)
 */
gulp.task('default', ['build:separated']);

gulp.task('build:shared', [
	'clean-dist-shared',
	'watchHtml',
	'watchStyles',
	'watchScripts',
	'watchImages',
	'watchTransfer',
]);

/**
 * Build Project WITH separated Assets
 */
gulp.task('build:separated', [
	'clean-dist-separated',
	'watchSeparatedImages',
	'watchSeparatedStyles',
	'watchSeparatedScripts',
	'watchSeparatedHtml',
	'watchSeparatedTransfer',
]);

/**
 * Clean dist folders
 */
gulp.task('clean-dist-shared', () => {
	return del.sync('dist/shared-assets');
});
gulp.task('clean-dist-separated', () => {
	return del.sync('dist/separated-assets');
});
