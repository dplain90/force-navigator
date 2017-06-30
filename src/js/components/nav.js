class Nav {
  constructor() {
    this.domEl = document.getElementById("sfnav_shadow");
  }

  visibility(){
    return this.domEl.style.visibility;
  }

  isVisible(){
    return this.visibility !== 'hidden';
  }

  setVisibility(val, el = this.domEl) {
    el.style.position = 'relative';
    el.style.visibility = val;
  }
}


export default Nav;
