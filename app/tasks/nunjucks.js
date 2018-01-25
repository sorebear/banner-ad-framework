/**
 * NUNJUCKS HTML TEMPLATING
 *
 * Nunjucks templating for key message HTML as well as AJAX'ed html files.
 * All html is compiled from the resources/html directory.
 *
 * An HTML file for each key message is generated from the directory
 * resources/html/pages. A template for each file will be found
 * in that folder, named [km-name].html. If it's a file is missing run
 * `gulp scaffold` to generate it from the keymessages.json.
 *
 * For re-used AJAXed in html templates, use the directory
 * resources/html/modules. Files places within it will automatically
 * be comiled and placed in the shared KM in  src/shared/[km-name]/html.
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


   gulp.task('html', () => {
      return Object.keys(banners).forEach((item) => {
         console.log("Banner in For Each: ", item);
         return gulp.src(htmlLoc + "pages/" + item + ".html")
         .pipe(nunjucksRender({
            path: './resources/html/templates'
         }))
         .pipe(gulp.dest('dist/' + item))
      });
   });
   

//   gulp.task('watchHtml', () =>
//     {
//       gulp.start('html');

//       gulp.watch([htmlLoc + '/**/*.html'], ['html']);
//     }
//   );
};
