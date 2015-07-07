var server = require('express')();
var bodyParser = require('body-parser');
var HttpStatus = require('http-status-codes');

var ratingsbot = require('./ratingsbot');

var port = process.env.PORT || 3000;

// body parser middleware
server.use(bodyParser.urlencoded({extended: true}));

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
