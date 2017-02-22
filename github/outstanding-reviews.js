var client = require('./client')
var lodash = require('lodash')
var db = require('./../db');

module.exports = function(body, res) {
  db.open(function(err, db) {
    if (err) return console.log(err)

    db.collection('repositories').find().toArray(function(err, repos) {
      if (err) return console.log(err)

      if (repos.length === 0) {
        res.send("No repos added!")
        db.close()
        return
      }

      var response = "Awaiting review:\n"
      var promises = []

      repos = repos.map(function(repo) {
        return repo.repo
      })

      repos.forEach(function(repo) {
        if (repo) {
          promises.push(
            new Promise(function(resolve, reject) {
              var ghrepo = client.repo(repo)

              ghrepo.issues({ per_page: 5, state: 'open', labels: 'GH REVIEW: review-needed,SEMVER-major' }, function(err, issues) {
                if (err) {
                  reject(repo + ": " + err.message)
                }

                var prs = lodash.filter(issues, function(issue) {
                  return issue.hasOwnProperty('pull_request')
                })

                prs.forEach(function(pr) {
                  response += "\n" + pr.html_url
                })

                resolve()
              })
            })
          )
        }
      })

      Promise.all(promises).then(function(values) {
        db.close()
        res.send(response)
      }, function(err) {
        db.close()
        res.send(err)
      })
    })
  })
}
