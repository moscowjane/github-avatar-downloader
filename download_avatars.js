  var request = require('request');
  var secrets = require('./secrets');
  var fs = require('fs');

  console.log('Welcome to the GitHub Avatar Downloader!');

  function getRepoContributors(repoOwner, repoName, callback) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Access-token': secrets["GITHUB_TOKEN"],
      }
    };

    request(options, function(err, res, body) {
        const results = JSON.parse(body);
        callback(err, results);
    });
  }


  getRepoContributors("jquery", "jquery", function(err, results) {

    console.log("Errors:", err);
    console.log("Result:", results);

    results.forEach(function(result) {
      // const filePath1 = `./${result["login"]}.jpg`;
      const filePath2 = './downloads/' + result["login"] + '.jpg';
      downloadImageByURL(result["avatar_url"], filePath2);
      console.log("Avatar_url: " + result["avatar_url"]);
    });
  })

  function downloadImageByURL(url, filePath) {
    request.get(url)
       .on('error', function (err) {
       })
       .on('response', function (response) {
         console.log('File downloaded: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
  }


