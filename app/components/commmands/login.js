class Login extends Command {
  constructor(results) {
    super(results);
  }

  function loginAsShowOptions(records){
    for(var i = 0; i < records.length; ++i){
      var cmd = 'Login As ' + records[i].Name;
      cmds[cmd] = {key: cmd, id: records[i].Id};
      addWord(cmd);
    }
    setVisible('visible');
  }

  function loginAsPerform(userId) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        document.write(xmlhttp.responseText );
        document.close();
        setTimeout(function() {
          document.getElementsByName("login")[0].click();
        }, 1000);
      }
    }
    xmlhttp.open("GET", userDetailPage(userId), true);
    xmlhttp.send();
  }

  function userDetailPage(userId) {
    var loginLocation = window.location.protocol + '//' + window.location.host + '/' + userId + '?noredirect=1';
    console.log(loginLocation);
    return loginLocation;
  }



}
