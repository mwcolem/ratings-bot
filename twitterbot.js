module.exports = function (req, res, next) {
  var HttpStatus = require('http-status-codes');
  var botPayload;
  var botText = req[0].text;

  botPayload = {
  	"username" : "trafficbot",
  	"icon_emoji" : ":truck:",
  	"channel" : "#bot-testing",
  	"text" : botText
  };

  return botPayload;
};