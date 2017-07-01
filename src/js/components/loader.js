import Nav from './nav.js';
class Loader extends Nav {
  constructor() {
    super();
    this.domEl = document.getElementById('sfnav_loader');
    this.show = this.show.bind(this);

  }

  show() {
      let that = this;
    this.domEl.setVisibility('visible');
    setTimeout(() => (that.domEl.setVisibility('hidden')), 30000);
  }

  hide() {
    let that = this;
    setTimeout(() => (that.domEl.setVisibility('hidden')), 30000);
  }
}

export default Loader;
