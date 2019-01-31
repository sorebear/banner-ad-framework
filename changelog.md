

# Changelog
All notable changes to this project will be documented in this file.

## [0.9.0] - 2019-01-16
### Added
- .node-version added for developers running "nodist" (node version control).
- the .bat file will automitcally install the proper version of node and then run npm install
- Polite load incorporated to standard banners

### Removed
- Calling setPixelOffsets from the window. This feature needs more testing.

## [0.8.2] - 2019-01-11
### Changed
- Changed Enabler.setExpandingPixelOffsets to be called from the window.

## [0.8.1] - 2019-01-08
### Added
- Click tags will automatically be renamed when built for Campaign Manager.
- Exit link builder updated so links will auto populate when uploaded to Studio
- Basic animations in base/sample project
- Expanding banners now start with transition animations for expanding and collapsing.

## [0.8.0] - 2018-12-12
### Removed
- Error wrappers ported over from CLM Base
- Incorporated TouchMove fix

## [0.7.1] - 2018-11-13
### Added
- Helper functions added to replicate the jQuery methods fadeIn, fadeOut, and animate. It is now less necessary to add in jQuery to a banner project.

### Removed
- Removed all jQuery from framework and sample project.

### Changed
- Renamed all instances of "doubleclick" to "studio" or "doubleclick studio".

## [0.7.0] - 2018-09-13
### Added
- Automated zipping to the build process

### Changed
- Restructured how individual pages are built.

## [0.6.2] - 2018-07-20
### Added
- Gulp process to check for broken links
- Optional white space collapsing in HTML output
- ES Lint configuration

### Changed
- Refactored a lot of code based on the added ES Lint.

## [0.6.1] - 2018-06-27
### Added
- Gulp task for renaming banners


## [0.6.0] - 2018-05-14

### Changed
- Links for Campaign Manager are now click tags, which invoke linking through javascript, rather than using standard HTML anchor tags.



