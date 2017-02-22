var server = require('./server')
var addRepo = require('./github/add-repo');
var outstandingReviews = require('./github/outstanding-reviews');

// for testing locally:
server.get('/', function(req, res) {
  outstandingReviews(req.body, res);
})

// slack endpoint:
server.post('/', function(req, res) {
  var body = req.body

  if (body.text.startsWith('add')) {
    addRepo(body, res);
  } else if (body.text.startsWith('review')) {
    outstandingReviews(body, res);
  }
})

server.listen(3600, function () {
  console.log('Bot listening on port 3600!')
})
