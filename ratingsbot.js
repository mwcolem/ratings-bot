module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var command = req.body.text;
  var botPayload;

  if (command != undefined) {
    var commandArr = command.split(" ");

    switch(commandArr[1]) {
      case ('hello'):
        botPayload = {
          "text" : 'Hello ' + userName + '!'
        };
        break;
      case ('weather'):
        botPayload = {
          "text" : 'http://www.wunderground.com/cgi-bin/findweather/getForecast?query=pws:KSCMOUNT27',
          "user_name" : 'weatherbot'
        };
        break;
      case ('google'):
        var search = 'https://www.google.com/?gws_rd=ssl#q=' + commandArr[2];

        for (var i=3; i<commandArr.length; i++) {
          search += "+" + commandArr[i]
        }
        botPayload = {
          "text" : search,
          "user_name" : 'googlerbot'
        };
        break;
      default:
        botPayload = {
          "text" : 'Hello ' + userName + '. Command ' + commandArr[1] + ' not recognized.'
        };
    }    
  }
 
  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}