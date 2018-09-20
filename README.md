<img width="1212px" src="https://res.cloudinary.com/sorebear/image/upload/v1526145174/envivent/bolognese-banners.png">

## Bolognese Banners - Table of Contents
1. [Quick Start](#1-quick-start)
   1. [Getting Started](#11-getting-started)
   1. [Scaffolding](#12-scaffolding)
   1. [Gulp Tasks](#13-gulp-build-tasks-overview)
   1. [Banner Links](#14-banner-links)
   1. [Renaming Banners](#15-renaming-banners)

1. [File Structure](#2-file-structure)
   1. [File Structure - HTML](#21-file-structure-html)
   1. [File Structure - SCSS](#22-file-structure-scss)
   1. [File Structure - Javascript](#23-file-structure-javascript)
      1. [banner.js - Standard Banners](#bannerjs-standard-banners)
      1. [banner.js - Static Banners](#bannerjs-static-banners)
      1. [banner.js - Expanding Banners](#bannerjs-expanding-banners)
      1. [main-js - Standard Banners](#mainjs-standard-banners)
      1. [main-expanded.js - Expanding Banners](#main-expandingjs-expanding-banners)
      1. [isi.js](#isijs)


# 1: Quick Start

This quick start guide will give the basic overview of commands and file structure to get you up and running.

## 1.1: Getting Started

Start by cloning this project.

```
git clone git@gitlab.envivent.com:envivent/bolognese-banners.git <name-of-your-project>
```

Then install the necessary dependencies

```
npm install
```

Once everything is installed, open up `banners.json` in the root directory to customize your project. There are two objects you will need to update, banners and links.

### Banners

```javascript
"banners": {
  "<banner-name>": {                     // @string - Enter banner title
    "width": <banner-width>,             // @int - Enter banner width in px
    "height": <banner-height>,           // @int - Enter banner height in px
    "orientation": <banner-orientation>, // @string Enter either 'horizontal' or 'vertical'
    "static": <is-banner-static>         // @bool - Enter either true or false
    
    /* If it is an expanding banner you will also add the following */
    "expanded": {
      "width": <expanded-banner-width>,   // @int - Enter expanded banner height in px
      "height": <expanded-banner-height>, // @int - Enter expanded banner height in px
      "expandEventHandler": <event>,      // @string - Either 'click' or 'hover'
      "expandDirection": [
        <expand-direction-1>,             // @string - Accepts 'left', 'right', 'up', or 'down'
        <expand-direction-2>              // @string - Optionally more directions
        /* A multi-directional expanding banner will automatically be made if you include "up" and "down" or "left" and "right" */
      ]
    }
  }
}
```

### Links
```javascript
"<link-name>": {                   // @string - Reference name for link. It cannot include spaces or dashes. It should be camelCase.
  "displayName": <displayed-name>, // @string - Name that will show in DoubleClick Studio analytics
  "href": <url-of-link>            // @string - Link URL. This will be used to create click tags in Doubleclick Campaign Manager banners.
}
```

Banners do not use traditional anchor tags, but handle all linking through javascript. Banners deployed to DoubleClick Studio use exit links. Banners deployed to DoubleClick Campaign Manager use click tags. The necessary javascript functions will be built from the information that is provided in this links object. Links are explained in further details in [Section 1.4](#14-banner-links).

## 1.2: Scaffolding

After filling out `banners.json`, there are two scaffolding processes you can run. If you do not have Gulp globally installed, each task covered here can also be accessed by running `npm run <gulp-task>`.

```
gulp scaffold
```
This task will build out the source file-structure based on the contents of `banner.json`. If you alter the banners object in `banner.json` file and re-run this command, it will only build files for the new banners and will **not** remove any previous banners that were created.

```
gulp re-scaffold
```
This task will clear out all the files from `resources/html/pages`, `resources/scss/pages`, `resources/js/pages`, and `resources/img/pages`, and then re-scaffold your project from `banners.json`. Be careful before running this command and double-check you aren't overwriting something you need.

### Understanding and Customizing Scaffolding

To see the scaffolding script, open up `app/tasks/scaffold.js`. Here is a quick overview of what is happening:
* The *banners* object from `banner.json` is passed as an argument to the scaffolding module. 
* A For-In loop is run over the *banners* object.
* Within the For-In loop: 
    * A large object is created with several dimensions (*dims*) specific to that *banner*. 
    * The scaffoldHTML, scaffoldSCSS, scaffoldJS, and scaffoldIMG functions are called, passing in the name of each banner and each banner's *dims* object.
    * Each of these scaffold functions selects and reads a template file from `app/templates`, a template is determined by whether the banner is standard, static, expanding, or multi-direction expanding. 
    * It then takes this template and replaces several placeholder tags in the template with information about the banner from the *dims* object. 
    * The newly written files are then placed in their respective banner folder within the `resources` directory. 
* An Exit Links module is built from the *links* object in `banner.json` and written to `resources/js/components/exit-links.js`.
* A Click Tag Links module is built from the *links* object and written to `resources/js/macros/clickTags/links.html`.

#### Example
A banner titled 'banner-banter' would:
* Create the HTML file `resources/html/pages/banner-banter.html`
* Create the SCSS file `resources/scss/pages/banner-banter.scss`
* Create the JS file `resources/js/pages/banner-banter.js`
* Create the IMG folder `resources/img/pages/banner-banter`

### Note on Scaffolding and Re-Scaffolding

While `gulp scaffold` will not overwrite any HTML, SCSS, Javascript, or Image files within the pages subfolder, it will **always** rewrite `resources/html/macros/clickTags/links.html` and `resources/js/components/exitLinks.js`. This is because it is common to add in additional banners or links when you are halfway through a project and always want to ensure the exit links and index file are up to date. 

## 1.3: Gulp Build and Develop Tasks Overview

Here is a quick guide to the Gulp build tasks available in this framework. If you do not have Gulp globally installed, each task covered here can also be accessed by running `npm run <gulp-task>`.

### Build / Develop Overview

All of the build and develop processes will create a seperate folder for each banner `dist/unzipped` with self-contained assets for that banner. 

*For Example:* If you have two banners in your project, "first-banner" and "second-banner", the build processes will create the following file structure:
```
-dist
  -unzipped
    -first-banner
      -css
        -main.css
      -js
        -bundle.js
      -img
      -first-banner.html
    -second-banner
      -css
        -main.css
      -js
        -bundle.js
      -img
      -second-banner.html
```

### develop
```
gulp develop
```	

This task will return a prompt to see if you are developing for DoubleClick Campaign Manager or DoubleClick Studio.

### Develop for DoubleClick Campaign Manager

This option can be selected when running `gulp develop` or can be directly accessed by running:

```
gulp develop:campaign
```

This task will build your project, place it in `dist`, and then watch for any updates within `resources`. It will not minify your CSS or Javascript, making it easier to debug. It will also include an 'EXPAND ISI' button in the top right corner of non-static banners, which clients often ask for to proof check the ISI content on smaller banners.

This build process is for *DoubleClick Campaign Manager Banners*, which means that:

* A script containing Click Tags will be included in the document &lt;head&gt;, `<script> var sampleLink = http://samplelink.com </script>`.
* The link `{{ link(sampleLink, 'sample-class') }}Sample Link{{ closeLink() }}` will be rendered as `<span class="sample-class" onclick="window.open(window.sampleLink)>Sample Link</span>`
* The Enabler script, `<script src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>`, will not be included in your document <head>
* All Enabler methods will be bypassed in your Javascript files.

### Develop for DoubleClick Studio

This option can be selected when running `gulp develop` or can be directly accessed by running:
```
gulp develop:studio
```	
This task will build your project, place it in `dist`, and then watch for any updates within `resources`. It will not minify your CSS or Javascript, making it easier to debug.
It will also include an 'EXPAND ISI' button in the top right corner of non-static banners, which clients often ask for to proof check the ISI content on smaller banners.

This build process is for *Doubleclick Studio Banners*, which means that:

* All `{{ link(<link-name>, <class-name>) }}Sample Link{{ closeLink() }}` will be rendered as `<span class="<link-name> <class-name>">Sample Link</span>`
* The class "studio" will be added to the banners.
* The Enabler script, `<script src="https://s0.2mdn.net/ads/studio/Enabler.js"></script>`, will be included in your document <head>
* A script containing Click Tags will not be included in the document &lt;head&gt;
* All Enabler methods will be executed in your Javascript files.

### build
```
gulp build
```
This task will build your project similar to `gulp develop` with the following differences:
* Minifies all Javascript and CSS
* Runs just once and then exits
* Does not include the 'EXPAND ISI' button
* Includes a zipped folder for each banner placed in `dist/zipped`
* Includes a single zipped file of all the banners placed in `dist/single-zip`.

### build:doubleclick
```
gulp build:doubleclick
```
This task will build your project similar to `gulp develop:doubleclick`, but will minify all Javascript and CSS, and will run just once.

### zip
```
gulp zip
```
This task will take each folder currently in `dist`, zip it, and place it in `dist/zips`.

## 1.4: Banner Links

If a banner is going to be deployed on Doubleclick Studio, it does not use anchor tags, but handles everything in Javascript. If the banner is not for Doubleclick Studio, it will have standard anchor tags. This framework is built to have one link syntax which will be rendered as Doubleclick links in one build process and anchor tags in another build process.

When inserting a link into your HTML, write it as follows:
```html
<p>A sample paragraph with a {{ link('<link-name>', '<class-name>') }}Sample Link{{ closeLink() }}</p>
```
The link name that you pass in should be a string and match link-name that you placed in `banners.json`. The second parameter is optional and will be added as a class to the link when rendered.

## 1.5: Renaming Banners

If you need to rename one of your banners at any point, there is a built in Gulp command to do this. 

```
gulp rename --old <name-of-a-current-banner> --new <name-you-want-to-chang-it-to>
```
> Note: Because this uses command line variables, this will not work by running 'npm run rename...'. You will need to have Gulp globally installed to run the rename command.

This command helps avoid the hassle of manually alterning your banners.json and renaming several files. 

### Links for Doubleclick Studio

When you run `gulp develop:doubleclick` or `gulp build:doubleclick` the links will be rendered as "span" elements. The link name and "exit" will be automatically be added as classes. Add the class "exit-link" as the second argument to underline the text and make it inherit the parent element's color (this matches the appearance of an anchor tag). If you are adding the link to an image or container &lt;div&gt;, you typically would not add the "exit-link" class.

```html
<!-- The following link -->

{{ link('myCoolLink', 'exit exit-link awesome-class') }}Click Here{{ closeLink() }}

<!-- Will be rendered to -->
<span class="myCoolLink exit-link awesome-class">Click Here</span>
```

### Links for Other Platforms

When your run `gulp develop` or `gulp build` the links will be rendered as anchor tags, making reference to click tags which are declared in a script within the document &lt;head&gt;. Remember that the "href" url will be pulled from the matching link name in `banners.json`.

```html
<!-- The following link -->

{{ link('myCoolLink', 'exit-link awesome-class') }}Click Here{{ closeLink() }}

<!-- Will be rendered to -->
<a src="javascript:window.open(window.myCoolLink)" class="exit-link awesome-class">Click Here</a>
```

# 2: File Structure

#### Overview - HTML, SCSS, JS

The bulk of your development work will be working within the `resources` folder. The entry point for each banner's HTML, SCSS, and Javascript will be that banner's respective self-titled file within the `resources/<html/scss/javascript>/pages` folder.

For example, if you created a banner called `my-awesome-banner`:
* The HTML entry point would be `resources/html/pages/my-awesome-banner.html`.
* The SCSS entry point would be `resources/scss/pages/my-awesome-banner.scss`.
* The Javascript entry point would be `resources/javascript/pages/my-awesome-banner.js`. 

Each banner's HTML, SCSS, and Javascript file pulls in common components, but the individual entry point allows you a great deal of customization for each banner when necessary.

#### Overview - Images

The image folder works slightly different. If "my-awesome-banner" was marked as a "vertical" banner, it would pull in all the images from:
* `resources/img/shared`
* `resources/img/vertical`
* `resources/img/pages/my-awesome-banner`.

## 2.1: File Structure - HTML

This framework uses Nunjucks Rendering to create HTML files during its build process. You can learn more by reading the <a href="https://mozilla.github.io/nunjucks/">Nunjucks Documentation</a>

Navigate to `resources/html/pages` to see the HTML entry point for each banner, generated by the scaffolding process. We will quickly walk through each section in this file. 

### Setting Meta-Data

```nunjucks
{% set width = 160 %} 
{% set height = 600 %}
```

Some meta data is added with the <head> component regarding the banner size.

### Setting Title and Banner Class

```nunjucks
{% set banner = "<%fileName%>" %}
{% block bannerClass %}{% endblock %}
```

The banner file name will set the title and set the class of outermost banner div. If you would like to add any additional classes to your banner, you can add them within the 'bannerClass' block. 

### Importing Macros
```nunjucks
{% from "./links.html" import link, closeLink, enabler %}
```

This line imports Macros to build either standard links or doubleclick links depending on the build process which is run. When `gulp develop` or `gulp build` is run, it will import the macros from `resources/html/macros/dataLinks/links.html`. When `gulp develop:doubleclick` or `gulp build:doubleclick` is run, it will import the macros from `resources/html/macros/dcLinks/links.html`.

### Extending Layouts

```nunjucks
<!-- In Standard Banners -->
{% extends "layout.html" %}

<!-- In Static Banners -->
{% extends "layout-static.html" %}

<!-- In Expanding Banners -->
{% extends "layout-expanding.html %}
```

These three layout files can all be found within `resources/html/components`. You can edit these files for changes you would like to see across all banners of one type.

### Content Blocks

#### Main Content and ISI - Standard Banners

```nunjucks
{% block content %}
  {% include './main-content.html' %}
  <!--enter page specific content here-->
{% endblock %}

{% block isi %}
  {% include './isi.html' %}
{% endblock %}
```
All standard banners will include the content located in `resources/html/components/main-content.html`. The bulk of your HTML development will happen in this file.

All standard banners will also include the "Important Safety Information" content located in `resources/html/components/isi.html`. 

#### Main Content - Static Banners

```nunjucks
{% block content %}
  {% include './main-content-static.html' %}
  <!--enter page specific content here-->

{% endblock %}
```
All static banners will include the content located in `resources/html/components/main-content-static.html`. The bulk of your HTML development will happen in this file.

Static banners typically do not include the Important Safety Information, which is why the "isi" block is excluded by default.

#### Main Content and ISI - Expanded Banners

```nunjucks
{% block mainContentCollapsed %}
  {% include './main-content-collapsed.html' %}
  <!--enter page specific content here-->
{% endblock %}

{% block isiCollapsed %}
  {% include './isi.html' %}
{% endblock %}

{% block mainContentExpanded %}
  {% include './main-content-expanded.html' %}
  <!--enter page specific content here-->
{% endblock %}

{% block isiExpanded %}
  {% include './isi.html' %}
{% endblock %}
```

The required structure for an expanding banner is to have one main panel, with a collapsed panel and expanded panel inside of it. Typically, the main content of your collapsed banner and your expanded banner will be different, so each block is pulling in a different file (either `resources/html/components/main-content-collapsed.html` or `resources/html/components/main-content-expanded.html`. 

Often your ISI will be identical on both, which is why both the collapsed ISI block and expanded ISI block are pulling in the same file by default. 

## 2.2: File Structure - SCSS

The entry point for each banner's styles is that banner's specific SCSS file within `resources/scss/pages`. All common SCSS files used by that banner will need to be imported into this file. Let's walk through the file structure by section.

### Import Modules and Orientation Styles
```scss
@import "../vendor/normalize";
@import "../modules/all";
@import "../orientation/vertical";
```
First, we will import normalize.scss. This is a commonly used 3rd party stylesheet to help normalize some inconsistencies across browsers.

Second, we will import all of our modules. This could include variables, animations, and other stylesheets that don't directly apply styles to the DOM. By default, several variables will be pulled in from `resources/scss/modules/_variables.scss`. It is good to open up this file to view, edit, and add variables to your project. 

Third, depending on the banner's orientation, we will import either `resources/scss/orientation/vertical.scss` or `resources/scss/orientation/horizontal`. If you open up these files, you will see some additional variables. This is a great place to add or overwrite global variables that are orientation specific. 

### Declare or Re-Declare Banner- Specific Variables

```scss
/* Alter variables for one specific banner by redefining them here */


@import "../partials/all";
```
Next you have space to redeclare variables that need banner-specific values. It is important to do this before pulling in all of your partials, because that is where the variables are evaluated.

### Banner-Specific Styles (Standard and Static)

```scss
#main-panel.sample-expand-on-click-banner {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 500px;
  height: 500px;

  /* Declare banner specific styles here */


}
```
As you can see, some banner size styles are automatically created during the scaffolding process. 

There is then space to add your banner-specific styles.

### Banner-Specific Styles (Expanding)

```scss
#main-panel.sample-expand-on-hover-banner {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 640px;
  height: 250px;

  #collapsed-panel {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 320px;
    height: 250px;
  }

  #expanded-panel {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 640px;
    height: 250px;
  }

  /* Declare banner specific styles here */


}

```
If you are making an expanding banner, there will be some additional sizing styles for the multiple panels within your file structure. 

## 2.3: File Structure - Javascript

The entry point for each banner's javascript is that banner's specific JS file within `resources/js/pages`. Let's quickly look at this entry point for each type of banner.

### banner.jS - Standard Banners
Example: `resources/js/pages/my-standard-banner.js`

```javascript
var mainJs = require('../main.js');

window.addEventListener('load', function() {
  if ($('#main-panel').hasClass('doubleclick')) {
    function enablerInitHandler() {
      testLinks();
			
      if (Enabler.isPageLoaded()) {
        mainJs();
      } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, mainJs);
      }
    }

    if (Enabler.isInitialized()) {
      enablerInitHandler();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.INIT, function() {
        enablerInitHandler();
      });
    }
  } else {
    mainJs();
  }
});

```
The majority of this code is simply conditionally initializing the HTML5 "Enabler" and importing `resources/js/main.js`.

When your project is built for DoubleClick Studio, it will properly initialize the Enabler script, import your configured exit links, and then run `resources/js/main.js`. When your project is not built for DoubleClick Studio, this file will simply import and run `resources/js/main.js`. 

If you would like to better understand how the Enabler is initialized and loaded, you can visit <a href="https://support.google.com/richmedia/answer/2672545?hl=en&ref_topic=2672541&visit_id=1-636613313005899523-3765677550&rd=1">DoubleClick's documentation</a>

### banner.js - Static Banners
Example: `resources/js/pages/my-static-banner.js`

The code within static banners will look almost identical to that of standard banners. The only difference is that once Enabler.js is initialized and loaded in DoubleClick banners it loads nothing else, and in non-DoubleClick banners it verifies it doesn't have the class "doubleclick" and loads nothing.
a
### banner.js - Expanding Banners
Example: `resources/js/pages/my-expand-on-hover-banner.js`

This section will be added to the documentation soon. Please reach out to `sbaird@envivent.com` if you have questions about the file structure for expanding banners.

### main.js - Standard Banners
Path: `resources/js/main.js`

By default, `main.js` is set up with base functionality that will be typical for most banner projects. 

```javascript
var Isi = require('./components/isi.js');
var IScroll = require('./vendor/iscroll-probe.js');

module.exports = function() {
  var isi = new Isi(IScroll);
  // If you don't want an auto-scrolling Isi
  // Remove this init function 
  isi.init();

  var animationLoader = (function() {
    var animator = {};
    var animationSpeed = 1500;
      function fadeInScreen1() {
        $('.screen-1').fadeIn(animationSpeed, function() { 
          // Do something after screen-1 fades in
      });
    }
      
    animator.init = function() {
      fadeInScreen1();
    }

    return animator;
  }());

  animationLoader.init();
}
```

First, we will create a new ISI (Important Safety Information) Component using iScroll. This component is explained in further detail [below](#isijs). If you are not going to have automatic (programmatic) scrolling, remote `isi.init()`. 

Next we will build an animationLoader object, return that object, and then call it's `init()` method. When the animationLoader component is initialized it will run the function `fadeInScreen1()`, which finds the DOM element with the class ".screen-1" and causes it to fade in. From here you can build out additional methods to be called in sequence.

### main-expanding.js - Expanding Banners
Path: `resources/js/main-expanding.js`.

The first 27 lines of this file are almost identical to `resources/js/main.js`. The unique features of expanding banners are the next four methods 

```javascript
this.expandStartAnimation = function(callback) {

  if (callback) { callback(); };
}
```
This method will be called whenever the request to expand the banner is made. This is where you will add your own code to animate the expanding of your banner. After your animation is complete, you will need to run `if (callback) { callback(); };`. When this banner is built for DoubleClick Studio, this callback is what notifies Enabler.js the banner is now expanded.

**NOTE:** It's important to set up your code in such a way that the callback is not executed until your animation has completed. 

```javascript
this.expandFinishAnimation = function(callback) {
    
}
```

If something needs to execute *after* the expand animation is complete, add it here. 

```javascript
this.collapseStartAnimation = function(callback) {
    
    if (callback) { callback() ; };
}
```
Similar to this.expandStartAnimation, this method will be called whenever the request to collapse the banner is called. This is where code is added to animate the expanding of the banner. After the animation is complete, you will need to run `if (callback) { callback(); };`. When this banner is built for DoubleClick Studio, this callback is what notifies Enabler.js the banner is now collapsed.

**NOTE:** It's important to set up your code in such a way that the callback is not executed until your animation has completed. 

```javascript
this.collapseFinishAnimation = function(callback) {
    
}
```

If something needs to execute *after* the collapse animation is complete, add it here.

### isi.js

Navigate to `resources/js/components/isi.js`.

```javascript
this.id = id ? id : 'isi';
this.isi = document.getElementById(this.id);
this.isiContainer = document.getElementById(`${this.id}-container`);
this.isiScroll = new IScroll(`#${this.id}-container`, {
	mouseWheel: true,
	scrollbars: true,
	probeType: 3
});
```

This initial code is what creates the new IScroll element. Notice we are adding some custom configurations to this instantiation. You can read more about the different configuration options in the <a href="http://iscrolljs.com/#configuring">iScroll Documentation</a>

Every other variable and method in this file is for handling programmatic scrolling. If your project will not have programmatic scrolling, you can remove all of these functions. If you do this, make sure you also remove `isi.init()` from `main.js` and `main-expanding.js`. Additionally, `probType: 3` is what allows the ISI to pause and resume scrolling, so this can be removed if it's not needed.

#### Programmatic Scrolling

```javascript
this.initialized = false;
this.mouseOverIsi = false;
this.scrollSpeedMultiplier = -100;

this.init = function() {
  if (!this.initialized) {
    this.initialized = true;
    this.startScrollFromBeginning();
  }
};

this.handleMouseEnter = function() {
  this.mouseOverIsi = true;
  if (this.initialized) {
    this.pauseScroll();
  }
}

this.handleMouseLeave = function() {
  this.mouseOverIsi = false;
  if (this.initialized) {
    this.resumeScroll();
  }
}

this.startScrollFromBeginning = function() {
  if (!this.mouseOverIsi) {
    this.isiScroll.scrollTo(
      0,
      this.isiScroll.maxScrollY,
      this.isiScroll.maxScrollY * this.scrollSpeedMultiplier,
      IScroll.utils.ease.quadratic
    );
  }
}

this.pauseScroll = function() {
  this.isiScroll.scrollTo(
    0,
    this.isiScroll.y,
    -1,
    IScroll.utils.ease.quadratic
  );
};

this.resumeScroll = function() {
  if (!this.mouseOverIsi) {
    var self = this;
    setTimeout(function() {
      if (!self.mouseOverIsi) {
        self.isiScroll.scrollBy(
          0,
          self.isiScroll.maxScrollY - self.isiScroll.y,
          (self.isiScroll.maxScrollY - self.isiScroll.y) * self.scrollSpeedMultiplier,
          IScroll.utils.ease.quadratic
        );
      }
    }, 75);
  }
};

// Set event listeners
this.isiContainer.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
this.isiContainer.addEventListener('mouseleave', this.handleMouseLeave.bind(this));

```

If you are using programmatic scrolling in your project, here is a quick overview of what is happening: 

* Two flag variables, `this.initialized` and `this.mouseOverIsi`, are initialized to false.
* `this.scrollSpeedMultiplier` is set to `-100`. You can adjust this number to make it scroll faster or slower. Make sure the number is negative. 
* The method `this.init` is declared. This can be called whenever you want the programmatic scroll to start. The method checks to make sure the component has not already been initialized, then flips `this.initialized` to `true`, and calls `this.startScrollFromBeginning()`.
* At the bottom, two event listeners are added to the ISI Container, one to listen for 'mouseenter' and the other for 'mouseleave'. 
* When the mouse enters the ISI container, `this.mouseOverIsi` is flipped to `true`. Then, if the component has been initialized, it will pause the scroll.
* When the mouse leaves the ISI container, `this.mouseOverIsi` is flipped to `false`. Then, if the component has been initialized, it will resume the scroll.


