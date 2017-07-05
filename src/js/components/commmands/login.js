class Login {
  constructor() {

  }

  // let arrSplit = cmd.split(' ');
  // let searchValue = arrSplit[2];
  // if(arrSplit[3] !== undefined)
  // searchValue += '+' + arrSplit[3];
  attempt(username) {
    let query = 'SELECT+Id,+Name,+Username+FROM+User+WHERE+Name+LIKE+\'%25' + username + '%25\'+OR+Username+LIKE+\'%25' + username + '%25\'';

    ftClient.query(query,
      function(success) {
        console.log(success);
        let numberOfUserRecords = success.records.length;
        if(numberOfUserRecords < 1){
          addError([{"message":"No user for your search exists."}]);
        } else if(numberOfUserRecords > 1){
          loginAsShowOptions(success.records);
        } else {
          var userId = success.records[0].Id;
          loginAsPerform(userId);
        }
      },
      function(error)
      {
        console.log(error);
        addError(error.responseJSON);
      }
    );
  }


   loginAsShowOptions(records){
    // for(var i = 0; i < records.length; ++i){
    //   var cmd = 'Login As ' + records[i].Name;
    //   cmds[cmd] = {key: cmd, id: records[i].Id};
    //   addWord(cmd);
    // }
    // setVisible('visible');
  }

 userDetailPage(userId) {
    // var loginLocation = window.location.protocol + '//' + window.location.host + '/' + userId + '?noredirect=1';
    // console.log(loginLocation);
    // return loginLocation;
  }

}

export default Login;
