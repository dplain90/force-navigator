import Nav from './nav.js';
class Loader extends Nav {
  constructor() {
    super();
    this.domEl = document.getElementById('sfnav_loader');
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
      let that = this;
    this.domEl.setVisibility('visible');
    setTimeout(() => (that.setVisibility('hidden')), 300);
  }

  hide() {
    let that = this;
    setTimeout(() => (that.setVisibility('hidden')), 300);
  }
}

export default Loader;
