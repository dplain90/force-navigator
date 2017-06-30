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

  function setColor (_posi, _color, _forg){
    outp.childNodes[_posi].style.background = _color;
    outp.childNodes[_posi].style.color = _forg;
  }

  function selectMove(direction) { // selectResult

    let searchBar = document.getElementById('sfnav_quickSearch');

    var firstChild;

    if(outp.childNodes[posi] != null)
      firstChild = outp.childNodes[posi].firstChild.nodeValue;
    else
      firstChild = null;

    let textfield = searchBar;
    let isLastPos = direction == 'down' ? posi < words.length-1 : posi >= 0

    if (words.length > 0 && isLastPos) {
      if(posi < 0) posi = 0;
      posi = posi + (direction == 'down' ? 1 : -1);
      if(outp.childNodes[posi] != null)
        firstChild = outp.childNodes[posi].firstChild.nodeValue;
      else
        firstChild = null;
      if (posi >=0) {
        outp.childNodes[posi + (direction == 'down' ? -1 : 1) ].classList.remove('sfnav_selected');
        outp.childNodes[posi].classList.add('sfnav_selected');
        outp.childNodes[posi].scrollIntoViewIfNeeded();
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
