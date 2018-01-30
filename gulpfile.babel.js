const gulp = require('gulp');
const del = require('del');
const banners = require('./banners.json');
const project = require('./project.json');

/**
 * getTasks automatically pulls all gulp tasks from directory ./app/tasks/
 */
require('./app/getTasks.js')(gulp, banners);

/**
 * Build Project WITH Shared Assets (This is default)
 */
gulp.task('default', ['build:shared']);
gulp.task('build:shared', [
	'clean-dist-shared',
	'watchHtml',
	'watchStyles',
	'watchScripts',
	'watchImages'
]);

/**
 * Build Project WITH Seperated Assets
 */
gulp.task('build:seperated', [
	'clean-dist-seperated',
	'images-seperated',
	'styles-seperated',
	'scripts-seperated',
	'html-seperated'
]);

/**
 * Clean dist folders
 */
gulp.task('clean-dist-shared', () => {
	return del.sync('dist/shared-assets');
});
gulp.task('clean-dist-seperated', () => {
	return del.sync('dist/seperated-assets');
});
