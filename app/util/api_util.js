function httpGet(url, callback)
{
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.setRequestHeader("Authorization", sid);
  req.onload = function(response) {
    callback(response);
  }
  req.send();
}
