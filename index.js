var server = require('express')();
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var ratingsbot = require('./ratingsbot');
var twitterbot = require('./twitterbot');

var Twitter = require('twitter');
var es = require('event-stream');

var port = process.env.PORT || 3000;

var client = new Twitter({
  consumer_key: 'XiCSTD8jHaRzXAz8xwhLvg7x4',
  consumer_secret: 'wLy9ZRGTsmKQJKnhNJ9ZsR11ZbkHA399NdLDyhGFYZLSWEPXnd',
  access_token_key: '3367691267-h3zCrfK0XTz4dEJyHOhgSRlFvdvtURqCsXHTciz',
  access_token_secret: 'cFHYkVmwzNOkTyqjUgMkj2c5WL1pW7oRKSPcIYSD472PV',
});

var params = {screen_name: 'SCDOTLowCountry',
			  count: '1'};

server.use(bodyParser.urlencoded({extended: true}));

client.get('statuses/user_timeline', params, function(error, tweet, response){
  if (!error) {
    // console.log(tweet);
    server.post(twitterbot);
    // console.log(twitterbot(tweet));
  }
});

// test route
server.all('/', function (req, res) {
    res.status(HttpStatus.OK).send('Hello world!');
});

server.post('/ratingsbot', ratingsbot);

// error handler
server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(HttpStatus.BAD_REQUEST).send(err.message);
});

server.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});
