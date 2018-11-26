
const Isi = require('./components/isi.js');
const IScroll = require('./vendor/iscroll-probe.js');

module.exports = class Expanding {
  constructor() {
    this.isi = new Isi(IScroll);
    this.mainPanel = document.getElementById('main-panel');
    this.expandedPanel = document.getElementById('expanded-panel');
    this.collapsedPanel = document.getElementById('collapsed-panel');
    
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
    
    if (callback) {
      callback();
    }
  }

  expandFinishAnimation() {
    // Do stuff when the expansion starts
    this.isi.refresh();

  }

  collapseStartAnimation(callback) {
    // Do stuff, then call callback after it is complete
    this.expandedPanel.classList.remove('expand');
    this.collapsedPanel.style.display = 'block';

    if (callback) {
      callback();
    }
  }

  collapseFinishAnimation() {
    // Do stuff when the collapse finishes
    this.isi.refresh();

  }
};