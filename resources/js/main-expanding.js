
const Isi = require('./components/isi.js');
const helperFunctions = require('./util/helper-functions');

module.exports = class Expanding {
  constructor() {
    this.isi = new Isi(IScroll);
    this.animator = this.animationLoader();

    this.mainPanel = document.getElementById('main-panel');
    this.expandedPanel = document.getElementById('expanded-panel');
    this.collapsedPanel = document.getElementById('collapsed-panel');
    this.expandedContentWrapper = document.getElementById('expanded-content-wrapper');
    
    this.init = this.init.bind(this);
    this.expandStartAnimation = this.expandStartAnimation.bind(this);
    this.expandFinishAnimation = this.expandFinishAnimation.bind(this);
    this.collapseStartAnimation = this.collapseStartAnimation.bind(this);
    this.collapseFinishAnimation = this.collapseFinishAnimation.bind(this);
  }

  animationLoader() {
    const animator = {};
    const animationSpeed = 2000;
    let continueAnimating = true;

    // reference variables to DOM elements
    const screen1 = document.querySelector('.screen-1');
    const screen1title = screen1.querySelector('h1');
    const screen2 = document.querySelector('.screen-2');

    function fadeOutAllScreens() {
      helperFunctions.fadeOut(screen1, 250);
      helperFunctions.fadeOut(screen2, 250);
      return;
    }

    function fadeInScreen1() {
      // helperFuctions.fadeIn works similarly to jQuery's fadeIn method
      helperFunctions.fadeIn(screen1, animationSpeed, () => {
        if (!continueAnimating) { return; }

        setTimeout(() => {
          // helperFunctions.fadeOut works similarly to jQuery's fadeOut method
          if (!continueAnimating) { return; }
          helperFunctions.fadeOut(screen1, animationSpeed, () => {
            if (!continueAnimating) { return; }
            fadeInScreen2();
            screen1title.style.marginTop = '.67em';
          });
        }, 1000);
      });
    }

    function fadeInScreen2() {
      helperFunctions.fadeIn(screen2, animationSpeed, () => {
        if (!continueAnimating) { return; }
        setTimeout(() => {
          if (!continueAnimating) { return; }
          helperFunctions.fadeOut(screen2, animationSpeed, () => {
            if (!continueAnimating) { return; }
            fadeInScreen1();
          });
        }, 1000);
      });
    }

    animator.init = () => {
      continueAnimating = true;
      fadeInScreen1();
    };

    animator.close = () => {
      fadeOutAllScreens();
      continueAnimating = false;
    };

    return animator;
  }
  
  init() {
    this.isi.init();
  }

  expandStartAnimation(callback) {
    // Do stuff, then call callback after it is complete

    this.expandedPanel.classList.add('expand');
    this.collapsedPanel.style.display = 'none';
    
    this.expandedContentWrapper.addEventListener('transitionend', () => {
      if (callback) {
        callback();
      }
    }, { once: true });
  }

  expandFinishAnimation() {
    // Do stuff when the expansion finishes
    
    this.animator.init();
    this.isi.refresh();

  }

  collapseStartAnimation(callback) {
    // Do stuff, then call callback after it is complete
    
    this.expandedPanel.classList.remove('expand');
    this.animator.close();

    this.expandedContentWrapper.addEventListener('transitionend', () => {
      this.collapsedPanel.style.display = 'block';
      if (callback) {
        callback();
      }
    }, { once: true });
  }

  collapseFinishAnimation() {
    // Do stuff when the collapse finishes
    this.isi.refresh();

  }
};