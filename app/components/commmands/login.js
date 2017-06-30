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

 userDetailPage(userId) {
    var loginLocation = window.location.protocol + '//' + window.location.host + '/' + userId + '?noredirect=1';
    console.log(loginLocation);
    return loginLocation;
  }



}
