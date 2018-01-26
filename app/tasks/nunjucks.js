/**
 * NUNJUCKS HTML TEMPLATING
 *
 * Nunjucks templating for key message HTML as well as AJAX'ed html files.
 * All html is compiled from the resources/html directory.
 *
 * An HTML file for each banner is generated from the directory
 * resources/html/pages. A template for each file will be found
 * in that folder, named [banner-name].html. If it's a file is missing run
 * `gulp scaffold` to generate it from the banners.json.
 *
 * To learn about nunjucks rendering refer to their documentation:
 * https://mozilla.github.io/nunjucks/templating.html
 *
 * The style should be familar to those who've used jinja2.
 */

let gutil = require('gulp-util');
let nunjucksRender = require('gulp-nunjucks-render');
let debug = require('gulp-debug');

module.exports = (gulp, banners) =>
{
   // let shared        = project.name;
   let htmlLoc       = './resources/html/';
   let htmlTpls      = htmlLoc + 'templates/';
   let htmlPartials  = htmlLoc + 'partials/';
   let htmlMarcos    = htmlLoc + 'macros/';
   let htmlModules   = htmlLoc + 'modules/**/*.+(html|nunjucks)';
   let htmlPages     = htmlLoc + 'pages/**/*.+(html|nunjucks)';
   let htmlDest      = 'dist';
   // let htmlModDest   = "./dist/shared/"+shared+"/html/";


   gulp.task('html-seperated', () => {
      return Object.keys(banners).forEach((item) => {
         console.log("Banner in For Each: ", item);
         return gulp.src(htmlLoc + "pages/" + item + ".html")
         .pipe(nunjucksRender({
            path: './resources/html/templates'
         }))
         .pipe(gulp.dest('dist/seperated_assets/' + item))
      });
   });

   gulp.task('html-shared', () => {
      return gulp.src(htmlPages)
         .pipe(nunjucksRender({
            path: './resources/html/templates'
         }))
         .pipe(gulp.dest('dist/shared-assets'))
   })
   
//   gulp.task('watchHtml', () =>
//     {
//       gulp.start('html');

//       gulp.watch([htmlLoc + '/**/*.html'], ['html']);
//     }
//   );
};
