/**
* 
* SETUP FOR A NEW PROJECT
*
* Scaffold builds sass, html, and images for new projects.
*
* For new projects:
*
* First fill out ./banners.json with all the different banners for your
* project
* Afterwards run `gulp scaffold:clean` to delete example banners. Then run
* `gulp scaffold` to create sass and html pages.
* You can also run `gulp re-scaffold` to both clean and create in one command
*
* To update an existing project:
*
* If new banners need to be added to an existing project, first add the
* banner info to banners.json, then run `gulp scaffold`. It wont overwrite
* old banner pages.
* To delete a keymessage remove it from keymessage.json and run 

*
* The HTML file that are given to banners upon scaffolding can be customized
* by editng html/templates/layout.html
*/

const del = require("del");
const fs = require("fs");
const RESOURCES_PATH = "resources";
const HTML_PATH = "resources/html/";
const JS_PATH = "resources/js/";
const SCSS_PATH = "resources/scss/";
const IMG_PATH = "resources/img/";

module.exports = (gulp, banners) =>
{
   gulp.task("scaffold", () => {
      checkThenMakeDir(RESOURCES_PATH);
      const subFolders = ['html', 'scss', 'img'];
      for (let i = 0; i < subFolders.length; i++) {
         checkThenMakeDir(RESOURCES_PATH + "/" + subFolders[i]);
         checkThenMakeDir(RESOURCES_PATH + "/" + subFolders[i] + "/pages");
      }
      for (let item in banners) {
         scaffoldHTML(item);
         scaffoldSCSS(item);
         scaffoldIMG(item);
      }
   });

   const checkThenMakeDir = path => {
      if (!fs.existsSync(path)) {
         fs.mkdirSync(path);
      }
   }
   
   const checkThenWriteFile = (path, content) => {
      if (!fs.existsSync(path)) {
         fs.writeFileSync(path, content);
      }
   }
   
   // Scaffold SCSS
   const scaffoldSCSS = item => {
      checkThenWriteFile(SCSS_PATH + "/pages/" + item + ".scss", "");
   }
   
   // Scaffold HTML
   const scaffoldHTML = item => {
      checkThenWriteFile(
         HTML_PATH + "/pages/" + item + ".html", 
         `{% set banner = "${item}" %}\n\n{% extends "layout.html" %}\n{% block bodyClass %}{% endblock %}\n\n{% block content %}\n  <!--enter content for ${item} here-->\n{% endblock %}`
      );
   }
   
   // Scaffold IMG
   const scaffoldIMG = item => {
      checkThenMakeDir(IMG_PATH + "/pages/" + item);
   }
   
   // Clean Scaffold
   gulp.task("scaffold:clean", () => {
      return del.sync([RESOURCES_PATH + "/html/pages", RESOURCES_PATH + "/js/pages", RESOURCES_PATH + "/scss/pages", RESOURCES_PATH + "/img/pages"])
   });

   // Re-Scaffold Task
   gulp.task(
      "re-scaffold",
      ["scaffold:clean", "scaffold"],
      () => {
         console.log("Rebuilding Resources");
      }
   );
};


