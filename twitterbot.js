module.exports = function (tweet) {
  var HttpStatus = require('http-status-codes');
  var botPayload;
  var botText = tweet[0].text;

  botPayload = {
  	"username" : "trafficbot",
  	"icon_emoji" : ":truck:",
  	"channel" : "bot-testing",
  	"text" : botText
  };

  return botPayload;
};