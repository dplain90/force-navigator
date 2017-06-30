class ResultContainer extends Nav {
  constructor() {
    super();
    this.domEl = document.getElementById("sfnav_output");
    this.results = [];
  }

  addEl(el, result){
    this.domEl.appendChild(el);
    if(result) this.results.push(result);
  }

  clearOutput(){
    this.results.forEach((result) => {
      this.domEl.removeChild(result.domEl)
    }, this);
  }

  setColor (_posi, _color, _forg){
    this.domEl.childNodes[_posi].style.background = _color;
    this.domEl.childNodes[_posi].style.color = _forg;
  }

  isLastPos(posi, dir) {
    let result = posi >= 0;
    if(dir === 'down') result = posi < (this.results.length - 1);
    return result;
  }

  selectMove(direction) { // selectResult
    let searchBar = document.getElementById('sfnav_quickSearch');
    let firstChild;
    let results = this.domEl;
    let posi = this.store.get('posi');

    if(this.domeEl.childNodes[posi] != null) {
      firstChild = this.domeEl.childNodes[posi].firstChild.nodeValue;
    } else {
      firstChild = null;
      let textfield = searchBar;
      if (this.results.length > 0 && this.isLastPos()) {
        if(posi < 0) posi = 0;
        posi = posi + (direction == 'down' ? 1 : -1);
        if(this.domeEl.childNodes[posi] != null) {
          this.store.update('posi', posi);
          firstChild = this.domeEl.childNodes[posi].firstChild.nodeValue;
        } else {
          firstChild = null;
        if (posi >= 0) {
          this.domEl.childNodes[posi + (direction == 'down' ? -1 : 1) ].classList.remove('sfnav_selected');
          this.domEl.childNodes[posi].classList.add('sfnav_selected');
          this.domEl.childNodes[posi].scrollIntoViewIfNeeded();
          textfield.value = firstChild;
          return false
          //if(textfield.value.indexOf('<') != -1 && textfield.value.indexOf('>') != -1) {
            //textfield.setSelectionRange(textfield.value.indexOf('<'), textfield.value.length);
            //textfield.focus();
           // return false;
          //}
        }
      }
    }
  }
}

export default ResultContainer;
