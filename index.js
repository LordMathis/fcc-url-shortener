var express = require('express');
var path = require('path');
var mongo = require('mongodb').MongoClient
var validUrl = require('valid-url');

var app = express();
var db;
var baseUrl = 'localhost:' + app.get('port');
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urlshrt';

app.set('views', path.join(__dirname, '/views'));
app.engine('md', require('marked-engine').renderFile);
app.set('view engine', 'md');
app.set('port', (process.env.PORT || 5000));

var baseUrl = 'localhost:' + app.get('port');

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/new/:url*', (req, res) => {
  var url = req.url.slice(5);

  if (!validUrl.isUri(url)) {
    res.json({
      "error": url + " is not a valid URL"
    });
  } else {
    uniqueShortUrl(url, res, save);
  }
});

app.get('/:url', (req, res) => {
  var url = req.params.url;
  db.collection('url').find({"shortUrl": url}).toArray((err, data) => {
    if (err) throw err;

    if (data.length > 0) {
      res.redirect(data[0].url);
    } else {
      res.json({
        "error": url + " is not a valid shortened url"
      });
    }
  });
});

mongo.connect(mongoUrl, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(app.get('port'), () => {
    console.log('Server is running on port', app.get('port'));
  });
});

function uniqueShortUrl(url, res, callback) {
  db.collection('url').find().toArray((err, data) => {
    if (err) return callback(err);

    var urlList = data.map((obj) => {
      return obj.shortUrl;
    })
    do {
      var shortUrl = Array(6).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, 5);
    } while (urlList.indexOf(shortUrl) != -1);

    return callback(null, url, shortUrl, res);

  });
};

function save(err, url, shortUrl, res) {
  if (err) throw err;

  db.collection('url').insert({
    "url": url,
    "shortUrl": shortUrl
  });

  res.json({
    "original_url": url,
    "short_url": baseUrl + '/' + shortUrl
  });
}
