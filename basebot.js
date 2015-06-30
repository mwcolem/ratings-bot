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
      default:
        botPayload = {
          "text" : 'Hello ' + userName + '. Command "' + commandArr[1] + '" not recognized.'
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
