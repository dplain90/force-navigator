class Kbd extends Command {
  constructor(results) {
    super(results);
  }

  kbdCommand(e, key) {
  var position = posi;
  var origText = '', newText = '';
  if(position <0) position = 0;

  origText = document.getElementById("sfnav_quickSearch").value;
  if(typeof outp.childNodes[position] != 'undefined')
    {
      newText = outp.childNodes[position].firstChild.nodeValue;

    }

  var newtab = newTabKeys.indexOf(key) >= 0 ? true : false;
  if(!newtab){
    clearOutput();
    setVisible("hidden");
  }

  if(!invokeCommand(newText, newtab))
    invokeCommand(origText, newtab);
}
}
