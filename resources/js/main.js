const Isi = require('./components/isi.js');
const IScroll = require('./vendor/iscroll-probe.js');
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

    function fadeInScreen1() {
      const screen1 = document.querySelector('.screen-1');
      helperFunctions.fadeIn(screen1, animationSpeed, () => {
        helperFunctions.animate(document.querySelector('.screen-1 h1'), { marginTop: '150px', transform: 'rotate(360deg)' }, 'ease-in-out', () => {
					
        });
      });
      // Do something after screen 1 fades in
			
    }

    animator.init = function() {
      fadeInScreen1();
    };

    return animator;
  }

  init() {
    this.isi.init();
    this.animator.init();

    // helperFunctions.isiScroll(.5, this.isi);
  }
};