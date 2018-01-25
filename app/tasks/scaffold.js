/**
* 
* SETUP FOR A NEW PROJECT
*
* Scaffold builds sass, html, and sharedKm info for new projects.
*
* For new projects:
*
* First fill out ./keymessages.json with all the key messages of your
* project, be sure a shared KM for this project exists and give it a
* value of "shared": true.
* Afterwards run `gulp scaffold:clean` to delete example KMs. Then run
* `gulp scaffold` to create sass and html pages.
*
* To update an existing project:
*
* If new KM's need to be added to an existing project, first add the KM
* info to keymessages.json, then run `gulp scaffold`. It wont overwrite
* old KM pages.
* To delete a keymessage remove it from keymessage.json and run 
* `gulp scaffold:clean` and it will delete the files and folders
* associated with it leaving others intact.
*
*
* The HTML file that are given to KM's upon scaffolding can be customized
* by editng app/templates/htmlPage.tpl
*/

