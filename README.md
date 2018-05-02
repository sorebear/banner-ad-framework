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

Banners deployed to doubleclick studio do not use traditional anchor tags, but handle all linking through javascript. The necessary javascript functions will be built from the information that is provided here. Furthermore, we will go into more detail later about the syntax to use when inserting links into your banners to be properly rendered at build time.


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
        

