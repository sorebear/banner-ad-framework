const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const banners = require('./banners.json');
const prompt = require('gulp-prompt');
const util = require('gulp-util');

/**
 * getTasks automatically pulls all gulp tasks from directory ./app/tasks/
 */
require('./app/getTasks.js')(gulp, banners);

gulp.task('default', ['develop']);

const runTasks = (devOrProduction, campaignOrStudio) => {
  runSequence(
    [
      'clean-dist'
    ],
    [
      `images-${devOrProduction}`,
      `styles-${devOrProduction}`,
      `scripts-${devOrProduction}`,
      `html-${campaignOrStudio}-${devOrProduction}`,
      `transfer-${devOrProduction}`
    ],
    [
      `zip-${devOrProduction}`
    ]
  );
};

gulp.task('develop', () => {
  gulp.src('./gulpfile.babel.js')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'developmentType',
      message: 'CHOOSE DEVELOPMENT TYPE:\n[1] DoubleClick Campaign Manager - Includes Click Tag Links\n[2] DoubleClick Studio - Includes Enabler.js and Exit Links\n',
      choices: ['1', '2'],
    }, result => {
      switch (result.developmentType) {
      case '1':
        return runTasks('watch', 'campaign');
      case '2':
        return runTasks('watch', 'studio');
      default:
        return util.log(util.colors.red('ERROR: Please select a valid development type.'));
      }
    }));
});

gulp.task('build', () => {
  gulp.src('./gulpfile.babel.js')
    .pipe(prompt.prompt({
      type: 'input',
      name: 'buildType',
      message: 'CHOOSE BUILD TYPE:\n[1] DoubleClick Campaign Manager - Includes Click Tag Links\n[2] DoubleClick Studio - Includes Enabler.js and Exit Links\n',
      choices: ['1', '2'],
    }, result => {
      switch (result.buildType) {
      case '1':
        return runTasks('production', 'campaign');
      case '2':
        return runTasks('production', 'studio');
      default:
        return util.log(util.colors.red('ERROR: Please select a valid build type.'));
      }
    }));
});

gulp.task('develop:campaign', () => runTasks('watch', 'campaign'));
gulp.task('develop:studio', () => runTasks('watch', 'studio'));
gulp.task('develop:doubleclick', () => runTasks('watch', 'studio'));


gulp.task('build:campaign', () => runTasks('production', 'campaign'));
gulp.task('build:studio', () => runTasks('production', 'studio'));
gulp.task('build:doubleclick', () => runTasks('production', 'studio'));

/**
 * Clean dist folders
 */
gulp.task('clean-dist', () => del.sync('dist'));
