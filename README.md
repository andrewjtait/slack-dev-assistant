### Testing Locally:

* `npm install`
* `npm start`

Visit [http://localhost:3600](http://localhost:3600)

(if you kill the server, use `npm restart` to stop and start the db properly)

### Testing with Slack:

* Do the above.
* Install [ngrok](https://ngrok.com/download)
* `ngrok http 3600`
* Setup a [slash command](https://slack.com/apps/A0F82E8CA-slash-commands) in Slack.
  * Provide your slash command with a custom command.
  * Configure your slash command to use your ngrok URL.
* Run your slash command in your Slack channel.
