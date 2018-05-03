module.exports = function Expanding() {
  this.expandStartAnimation = function(callback) {
    console.log('Animating Expand Animation');


    if (callback) { callback(); };
  }

  this.expandFinishAnimation = function(callback) {
    console.log('Animating Expand Finish');


    if (callback) { callback(); };
  }

  this.collapseStartAnimation = function(callback) {
    console.log('Animating Collapse Start');



    if (callback) { callback(); };
  }

  this.collapseFinishAnimation = function(callback) {
    console.log('Animating Collapse Finish');


    
    if (callback) { callback(); };
  }
}