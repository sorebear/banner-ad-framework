Banner Ad Framework 
===============================================================================
A simple framework for building HTML Banner Ads of differing Sizes

Setup
-------------------------------------------------------------------------------

Start by installing all the required dependencies and dev-dependencies:

    npm install

Next open up `banners.json` to customize your project. There are two objects you will need to update, banners and links.

### Banners

    "banners": {
      "<banner-name>": {
        "width": <banner-width>,
        "height": <banner-height>
        "orientation": <banner-orienation>,
        "static": <is-banner-static?>
      }
    }

The project structure will be built from this   

### Links

    "<link-name">: {
      "displayName": "<displayed-link-name>"
      "href": "<url-of-link>"
    }

Banners deployed to doubleclick studio do not use traditional anchor tags, but handle all linking through javascript. The necessary javascript functions will be built from the information that is provided here.


An Important Note About Links
-------------------------------------------------------------------------------

If a banner is going to be deployed on Doubleclick Studio, it does not use anchor tags, but handles everything in Javascript. If the banner is not for Doubleclick Studio, it will have standard anchor tags. This framework is built to have one link syntax which will be rendered as Doubleclick links in one build process and anchor tags in another build process.

When inserting a link into your HTML, write it as follows:

        <p>A sample paragraph with a {{ link(<link-name>, '<class-name>') }}Sample Link{{ closeLink() }}</p>
    
The link name that you pass in should match a <link-name> that you placed in `banners.json`. The second paramater will be added as a class to the link when rendered. Some classes will be added automatically, but you can optionally add your own here.


Gulp Tasks Overview
-------------------------------------------------------------------------------

A quick guide to the various Gulp taks in this framework. If you do not have Gulp globally installed, every task covered here can also be accessed by running `npm run <gulp-task>`.

        gulp scaffold

This task will build out the file-structure and generate a couple files for you based on the contents of `banner.json`. If you alter the banners object in `banner.json` file and re-run this command, it will build files for the new banners but will not remove any previous banners that were created.

-------------------------------------------------------------------------------

        gulp re-scaffold

This task will clear out all the files from `resources/html/pages`, `resources/scss/pages`, `resources/js/pages`, and `resources/img/pages`, and then re-scaffold your project from `banners.json`. Be careful before running this command and double-check you aren't overwriting something you need.

-------------------------------------------------------------------------------

	gulp develop
	
This task will build your project, place it in `dist`, and then watch for any updates within `resources`. It will not minify your CSS or Javascript, making it easier to debug. 

This build process is for *Non-Doubleclick Banners*, which means that:

* All `{{ link(<link-name>, <class-name>) }} Sample Links {{ closeLink() }}` will be rendered as `<a href="<link-url>">Sample Links</a>`
* The class "doubleclick" will not be added to the banners.
* The Enabler script, `<script src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>`, will not be included in your document <head>
* All Enabler methods will be bypassed in your Javascript files.

-------------------------------------------------------------------------------

	gulp build

This task will build your project similar to `gulp develop`, but will minify all Javascript and CSS, and will run just once.

-------------------------------------------------------------------------------

	gulp develop:doubleclick
	
This task will build your project, place it in `dist`, and then watch for any updates within `resources`. It will not minify your CSS or Javascript, making it easier to debug. 

This build process is for *Doubleclick Banners*, which means that:

* All `{{ link(<link-name>, <class-name>) }} Sample Links {{ closeLink() }}` will be rendered as `<span class="<link-name> <class-name">Sample Links</span>`
* The class "doubleclick" will be added to the banners.
* The Enabler script, `<script src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>`, will be included in your document <head>
* All Enabler methods will be executed in your Javascript files.

-------------------------------------------------------------------------------

	gulp build:doubleclick

This task will build your project similar to `gulp develop:doubleclick`, but will minify all Javascript and CSS, and will run just once.

-------------------------------------------------------------------------------

	gulp zip

This task will take each folder currently in `dist`, zip it, and place it in `dist/zips`.


Getting Started
-------------------------------------------------------------------------------

There are several gulp tasks in place for banner development, let's quickly walk through each of them. Every major gulp task has an NPM script attached to it, so it can be used by either running *gulp <task-name>* or running *npm run <task-name>*.

### Scaffolding

Once your `banners.json` file is filled out, you can scaffold the project structure.

  gulp scaffold
  npm run scaffold
  
This will build out your project structure. The bolder items below are the ones that will be created in the scaffolding process.

-resources
	-html
		-pages
			-**<banner-title-1>.html**
			-**<banner-title-2>.html**
		-**index.html**
	-img
		-pages
			-**<banner-title-1>**
			-**<banner-title-2>**
	-js
		-components
			-**enabler.js**
	-scss
		-pages
			-**<banner-title-1>.scss**
			-**<banner-title-2>.scss**

File Structure
-------------------------------------------------------------------------------

The entry point for each banners HTML, CSS (SCSS), and Javascript is within the pages folder. Let's look at each one of these in more detail.

### File Structure - HTML

Navigate to `resources/html/pages` to see the HTML entry point for each banner, generated by the scaffolding process.

        {% set banner = "sample-standard-banner" %}
        {% set width = 160 %} 
        {% set height = 600 %}
        {% from "./links.html" import link, closeLink, enabler %}

        {% extends "layout.html" %}

        {% block bannerClass %}{% endblock %}

        {% block content %}

          {% include './main-content.html' %}
          <!--enter page specific content here-->

        {% endblock %}

        {% block isi %}
          {% include './isi.html' %}
        {% endblock %}

Some values (which were created during the scaffolding process) are declared at the top of the file. These values will be inserted into the Banner's HTML in the build process.

Next, this banner is extending an HTML layout. By default:
* Standard banners will extend `resources/html/components/layout.html`
* Static banners will extend `resources/html/components/layout-static.html`
* Expanding banners will extend `resources/html/components/layout-expanding.html`
        

### SCSS

Navigate to `resources/scss/pages` to see the styles entry point for each banner, generated by the scaffolding process. Let's look at an expanding banner as an example, as these are the most complex.

        /* Place SCSS for horizontal banners here */
        @import "../modules/all";
        @import "../vendor/normalize";
        @import "../orientation/vertical";

        /* Alter variables for one specific banner by redefining them here */


        @import "../partials/all";

        #main-panel.sample-expand-on-click-banner {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 500px;
          height: 500px;

          #collapsed-panel {
            position: absolute;
            top: 250px;
            left: 180px;
            width: 320px;
            height: 250px;
          }

          #expanded-panel {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 500px;
            height: 500px;
          }

          /* Declare banner specific styles here */

        }

At the top of the file we pull in all our modules, normalize.scss, and either vertical.scss or horizontal.scss, depending on the orientation of the banner. You then have space to redeclare any banner-specific Sass variables before pulling in all the projects partials.

One very useful practice when developing banners is to set several global Sass variables in `resources/scss/modules/_variables.scss`, then overwrite orientation-specific variables in `resources/scss/orienation/vertical.scss` or `resources/scss/orientation/horizontal.scss` and then overwrite banner-specific variables in the page's Sass file.

Next, you will see some banner-specific styles calculated by the scaffolding process.

In a non-expanding banner, everything will be container within the #main-panel and there will be no collapsed-panel or expanded-panel.

### Javascript

Navigate to `resources/js/pages` to see the javascript entry point for each banner, generated at the scaffolding process. These files will look different depending on the number of links declared in `banners.json` and by whether it is a standard banner, static banner, or expanding banner. We will look at each banner type in more detail.

#### Javascript - Standard Banners
```javascript
var mainJs = require('../main.js');
```
Each file will execute `resources/js/main.js` after everything is initialized and loaded, so the bulk of your interactions and animations will be written there.
```javascript
window.addEventListener('load', function() {
	if ($('#main-panel').hasClass('doubleclick')) {
```
When the window is loaded, the script will check if it is a banner for doubleclick. When the build commands `gulp develop:doubleclick` or `gulp build:doubleclick` are run it will add the class "doubleclick" to the banner. When the build commands `gulp develop` or `gulp build` are run, it will not have the class "doubleclick".

Next we'll jump down a little bit:

```javascript
if (Enabler.isInitialized()) {
	enablerInitHandler();
} else {
	Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
		enablerInitHandler();
	});
}
```
If it is a doubleclick banner, it's going to call Enabler to see if it's benn initialized. If it has, it will call `enablerInitHandler()`, if it's not initalized it will set a callback to run `enablerInitHandler()` once it's initialized.


Let's jump back up now to `enablerInitHandler()`

```javascript
if ($('.testLink').length) {
	$('.testLink').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		Enabler.exit('Test Link');
	});
}
```
This is how links are coded in Doubleclick banners. Rather than using anchor tags, we use spans with specific classes. These event listeners are waiting for clicks on those spans to trigger Doubleclick exit links. 

```javascript
if (Enabler.isPageLoaded()) {
	mainJs();
} else {
	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
}
```
Finally, Enabler is called again to see if the page is loaded. If it is, `mainJs()` is called, if it's not a callback is attached to wait for the page to finish loading and then call `mainJs()`.

```javascript
} else {
	mainJs();
}
```
If it is not a Doubleclick banner, all the previous steps are skipped and `mainJs()` is executed.


#### Javascript - ISI

Almost every banner project is going to have a scrolling container to house Important Safety Information. Sometimes the banners will need to scroll programatically, and sometimes they will only be scrolled through user interaction. This framework uses iScroll for this scroller.

By default, the ISI is coded to programatically scroll upon initialization, to pause when the ISI is hovered over, and to resume scrolling when the ISI is no longer hovered. If you do not want the ISI to programatically scroll you can either remove the call to `isi.init();` from `main.js` or `main-expanding.js`, or you can remove `this.startScrollFromBeginning();` from the init() function within `isi.js`.
```javascript
this.scrollSpeedMultiplier = -100;
```
You can easily adjust the speed of the programmatic scroll by changing the `scrollSpeedMultiplier` at the top of `isi.js`. A lower number will make the scroll faster and a higher number will make the scroll slower. 

