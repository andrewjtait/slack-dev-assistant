var github = require('octonode')

var client = github.client(process.env.GITHUB_ACCESS_TOKEN)

module.exports = client;
