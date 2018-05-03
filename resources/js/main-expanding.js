var Isi = require('./components/isi.js');
var Iscroll = require('./vendor/iscroll-probe.js');

module.exports = function Expanding() {
  this.init = function() {
    var isi = new Isi(Iscroll);
    isi.init();
    animationLoader.init();
  }

  var animationLoader = (function() {
    var animator = {};
    var animationSpeed = 1500;

    function fadeInScreen1() {
      $('.screen-1').fadeIn(animationSpeed, function() {
        // Do Something After Screen-1 Fades In

      });
    }

    animator.init = function() {
      fadeInScreen1();
    }

    return animator;
  }());
  

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