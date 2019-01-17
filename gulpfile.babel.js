const gulp = require('gulp');
const del = require('del');
const banners = require('./banners.json');
const prompt = require('gulp-prompt');
const log = require('fancy-log');
const runSequence = require('run-sequence');

/**
 * getTasks automatically pulls all gulp tasks from directory ./app/tasks/
 */
require('./app/getTasks.js')(gulp, banners);

gulp.task('default', ['develop']);

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
        return runSequence('develop:campaign');
      case '2':
        return runSequence('develop:studio');
      default:
        return log.error('ERROR: Please select a valid development type.');
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
        console.log('RUN 1');
        return runSequence('build:campaign');
      case '2':
        console.log('RUN 1');
        return runSequence('build:studio');
      default:
        return log.error('ERROR: Please select a valid build type.');
      }
    }));
});

gulp.task('develop:campaign', ['clean-dist-develop'], () => runSequence('develop:campaign-step-2'));
gulp.task('develop:campaign-step-2',
  ['images-watch', 'styles-watch', 'scripts-watch', 'html-campaign-watch', 'transfer-watch'],
  () => runSequence(['create-index', 'size-checker-watch', 'link-checker-watch', 'rename-clicktags' ])
);

gulp.task('develop:studio', ['clean-dist-develop'], () => runSequence('develop:studio-step-2'));
gulp.task('develop:doubleclick', ['clean-dist-develop'], () => runSequence('develop:studio-step-2'));
gulp.task('develop:studio-step-2',
  ['images-watch', 'styles-watch', 'scripts-watch', 'html-studio-watch', 'transfer-watch'],
  () => runSequence(['create-index', 'size-checker-watch', 'link-checker-watch' ])
);

gulp.task('build:campaign', ['clean-dist'], () => runSequence('build:campaign-step-2'));
gulp.task('build:campaign-step-2',
  ['images-production', 'styles-production', 'scripts-production', 'html-campaign-production', 'transfer-production'],
  () => runSequence([ 'build:campaign-step-3' ]));
gulp.task('build:campaign-step-3',
  ['create-index', 'size-checker', 'link-checker', 'rename-clicktags'],
  () => runSequence([ 'zip' ])
);

gulp.task('build:studio', ['clean-dist'], () => runSequence('build:studio-step-2'));
gulp.task('build:doubleclick', ['clean-dist'], () => runSequence('build:studio-step-2'));
gulp.task('build:studio-step-2',
  ['images-production', 'styles-production', 'scripts-production', 'html-studio-production', 'transfer-production'],
  () => runSequence([ 'create-index', 'size-checker', 'link-checker', 'zip' ])
);

/**
 * Clean dist folders
 */
gulp.task('clean-dist-develop', ['watch-links'], () => del.sync('dist'));
gulp.task('clean-dist', ['update-links'], () => del.sync('dist'));
