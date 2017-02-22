var db = require('./../db');

module.exports = function(body, res) {
  db.open(function(err, db) {
    var repo = body.text.replace("add ", "")
    var collection = db.collection('repositories')
    var collectionData = {
      channel_id: body.channel_id,
      repo: repo
    }

    collection.count(collectionData, function(err, count) {
      if (count > 0) {
        res.send("Already added " + repo + "!");
        db.close();
      } else {
        collection.save(collectionData, function() {
          res.send("Added " + repo + "!");
          db.close();
        });
      }
    })
  });
}
