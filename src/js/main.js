const Isi = require('./components/isi.js');
const helperFunctions = require('./util/helper-functions');

module.exports = class MainJs {
  constructor() {
    this.isi = new Isi(IScroll);
    this.animator =  this.animationLoader();
    this.init = this.init.bind(this);
  }

  animationLoader() {
    const animator = {};
    const animationSpeed = 2000;

    // reference variables to DOM elements
    const screen1 = document.querySelector('.screen-1');
    const screen1title = screen1.querySelector('h1');
    const screen2 = document.querySelector('.screen-2');

    function fadeInScreen1() {
      // helperFuctions.fadeIn works similarly to jQuery's fadeIn method
      helperFunctions.fadeIn(screen1, animationSpeed, () => {

        // helpferFunctions.animate works similarly to jQuery's animate method
        helperFunctions.animate(document.querySelector('.screen-1 h1'), { marginTop: '150px' }, 'ease-in-out', () => {

          setTimeout(() => {
            // helperFunctions.fadeOut works similarly to jQuery's fadeOut method
            helperFunctions.fadeOut(screen1, animationSpeed, () => {
              fadeInScreen2();
              screen1title.style.marginTop = '.67em';
            });
          }, 1000);
        });
      });
    }

    function fadeInScreen2() {
      helperFunctions.fadeIn(screen2, animationSpeed, () => {
        setTimeout(() => {
          helperFunctions.fadeOut(screen2, animationSpeed, () => {
            fadeInScreen1();
          });
        }, 1000);
      });
    }

    animator.init = function() {
      fadeInScreen1();
    };

    return animator;
  }

  init() {
    this.isi.init();
    this.animator.init();
  }
};