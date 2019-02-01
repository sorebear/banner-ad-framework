/**
 * Email staging
 *
 * Deploy banners and zips to oc for review and handoff.
 *
 * Structure of upload is:
 *
 * [sbx hostDir]/[project.product]/[project.name]/date-time/
 *
 *  ├── index.html
 *  ├── zips
 *  │   └── [all zips]
 *  ├── singlezip
 *  │   └── [one single zip]
 *  └── unzipped
 *      └── [unzipped banners]
 *
 */

const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
// const replace = require('../helpers/replace.js');
const deployPather = require('../helpers/deploy-path.js');

module.exports = (gulp, project) =>
{
  const src = './dist/';
  const deployPath = deployPather(project)();
  let creds;

  // Message to be relayed after completing upload
  const completeMessage = () =>
  {
    const loc = `${creds.loc}/${deployPath.join('/')}`;

    gutil.log(
      gutil.colors.cyan('Upload complete! View email(s) at'),
      gutil.colors.blue.bold(`${loc}`)
    );
  };

  // Create a connection to server and overwrite
  // default settings with provided ones
  const connect = (creds) =>
  {
    let prefs;
    const settings = {
      host:     creds.HOST,
      user:     creds.USER,
      password: creds.PASSWORD,
      parallel: 1,
      log:      gutil.log,
      secure:   true,
      secureOptions: { rejectUnauthorized: false }
    };

    // overwrite default settings with any provided in sbx
    if (creds.hasOwnProperty('settings'))
    {
      const keys = Object.keys(creds.settings);
      prefs = creds.settings;

      keys.map((key) =>
      {
        gutil.log(gutil.colors.cyan(`custom setting for ${key} set to ${prefs[key]}`));
        settings[key] = prefs[key];
      });

    }
    
    // return FTP connect
    return ftp.create(settings);
  };

  // Deploy to provided server, log URL to access
  gulp.task('deploy', () =>
  {
    creds = require('../helpers/creds.js');
    const conn = connect(creds);

    const dest  = `${creds.dir}/${deployPath.join('/')}`;

    gutil.log('files uploading from: ' + src);
    gutil.log('files uploading to: ' + dest);

    // Upload deploy directory
    setTimeout(() =>
    {
      gulp.src(src + '**') 
      // Upload changed files
        .pipe(conn.dest(dest))
      // Output done message w/ URL
        .on('end', completeMessage);
    },300);
  });

};
