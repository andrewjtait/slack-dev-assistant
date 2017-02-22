var server = require('./server')
var outstandingReviews = require('./github/outstanding-reviews');

// for testing locally:
server.get('/', function(req, res) {
  outstandingReviews(res);
})

// slack endpoint:
server.post('/', function(req, res) {
  outstandingReviews(res);
})

server.listen(3600, function () {
  console.log('Bot listening on port 3600!')
})
