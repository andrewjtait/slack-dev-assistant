var client = require('./client')
var lodash = require('lodash')

module.exports = function(res) {
  var ghrepo = client.repo('facebook/react')

  ghrepo.issues({ state: 'open', labels: 'Type: Bug' }, function(_, issues) {
    var response = "";

    var prs = lodash.filter(issues, function(issue) {
      return issue.hasOwnProperty('pull_request')
    })

    prs.forEach(function(pr) {
      response += pr.html_url
    })

    res.send(response)
  })
}
