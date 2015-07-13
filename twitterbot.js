module.exports = function (req, res, next) {
  var HttpStatus = require('http-status-codes');
  var botPayload;
  var botText = req[0].text;

  if (botText.match("(.*)I-95(.*)") ||
    (botText.match("(.*)Hilton Head Island(.*)"))) {
    botPayload = {
        "username" : "trafficbot",
        "icon_emoji" : ":truck:",
        "channel" : "#bot-testing",
    };    
  } else {
    botPayload = {
        "username" : "trafficbot",
        "icon_emoji" : ":truck:",
        "channel" : "#bot-testing",
        "text" : botText
    };
  }
  return botPayload;
};