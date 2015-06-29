module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  var toGoogle = req.body.text;
  var botPayload = {
    text : 'https://www.google.com/?gws_rd=ssl#q='
    for (var i = 0; i <= toGoogle.length - 1; i++) {
      text += toGoogle[i] + '%2c+'
    };
    
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
}