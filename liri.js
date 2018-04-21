require("dotenv").config();

// Lets start requiring folks to do stuff
var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var omdb = require('omdb-client');

var keys = require('./keys');

var reqeust = require('request');

var fs = require('fs');


var spotify = new Spotify(keys.spotify);

var getArtistName = function (artist) {
  return artist.name;
};


var getSpotify = function (songName) {
  if (songName === undefined) {
    songName = "Texas Blood Money";
  }
  spotify.search({
    type: "track",
    query: "Texas Blood Money"
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var songs = data.tracks.items;
    for (var i = 0;
         i < songs.length;
         i++
    ) {
      console.log('song- ' + songs[i].name);
      console.log('album- ' + songs[i].album.name);
      console.log('artist- ' + songs[i].artists.map(getArtistName));
    }
  })
};

var getTweets = function () {
  var twitter = new Twitter(keys.twitter);
  var params = {
    screen_name: "bubba_budha"
  };
  twitter.get("statuses/user_timeline", params, function (error, tweets) {
    if (!error) {
      for (var i = o; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log('- - - -');
        console.log(tweets.text);
      }
    }
  });
};


var getMovies = function () {

  var param = {
    apiKey: 'http://www.omdbapi.com/?i=tt3896198&apikey=5bf71b4a',
    title: 'Saving Private Ryan',
    year: 1998
  };
  omdb.get(param, function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log('title' + jsonData.Title);
    console.log('year ' + jsonData.Year);
    console.log('plot' + jsonData.Plot)
  });

  omdb.search('Saving Private Ryan', function (err, movies) {
    if (err) {
      return console.error(err);
    }

    if (movies.length < 1) {
      return console.log('No movies were found!');
    }

    movies.forEach(function (movie) {
      console.log('%s (%d)', movie.title, movie.year);
    });
  })
};


// possible additions (delete this message)
var recordAllThis = function () {
  fs.readFile('random.txt', 'utf-8', function (error, data) {
    console.log(data);

    var dtArr = data.split(',');

    if (dtArr.length === 2) {
      inquire(dtArr[0], dtArr[1]);
    } else if (dtArr === 1) {
      inquire(dtArr[0]);
    }
  });
};
var inquire = function (caseData, functionData) {
  switch (caseData) {
    case 'find-song':
      getSpotify(functionData);
      break;
    case 'display-tweets':
      getTweets();
      break;
    case 'find-movie':
      getMovies(functionData);
      break;
    case 'record-all-this':
      recordAllThis();
      break;
    // possible additions (delete this messages)
    default:
      console.log('What you talkkin\'n bout Willis?!?!');
  }

};

var startHere = function (argOne, argTwo) {
  inquire(argOne, argTwo)
};

startHere(process.argv[2], process.argv[3]);
