const Isi = require('./components/isi.js');

module.exports = class Expanding {
  constructor() {
    this.isi = new Isi(IScroll);
    // this.animator = this.animationLoader();

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
    this.isi.refresh();
  }

  collapseStartAnimation(callback) {
    // Do stuff, then call callback after it is complete
    
    this.expandedPanel.classList.remove('expand');

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