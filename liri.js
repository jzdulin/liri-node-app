
require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require('./keys');
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Lets get some user input
var action = process.argv[2];

//If the user doesnt input one of the 4 commands let them know and dont run the command
if (action ==="my-tweets" || action==="spotify-this-song" || action==="movie-this" || action==="do-what-it-says") {
}
else{
  return console.log("Liri did not recognize that command. Please try again.")
}

var nodeArgs = process.argv;
var value = "";

//For when theres more than one word in a movie title or song name
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
  
      value = value + "+" + nodeArgs[i];
  
    }
  
    else {
  
      value += nodeArgs[i];
  
    }
  }
//Takes the first part of the user interface and uses it to decide which function to run
switch (action) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotifyThisSong();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
}

//When the user types my-tweets do this
var count = 0
function myTweets() {
  var params = {screen_name: 'JoshDulin2'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && count<20) {
        console.log(tweets[count].created_at);
        console.log(tweets[count].text);
        count++;
        myTweets();
    }
    else {
      if (error === null) {
        return
      }
      console.log(error);
    }
  })
}

//When the user types spotify-this-song do this
function spotifyThisSong () {
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else{
      console.log(data); 
    }
  });
}

//When the user types movie-this do this
function movieThis() {
  if (value === "") {
    value ="Mr Nobody";
  }
  //url used to get movie data
  var movieUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy"

    request(movieUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
      
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        else {
            return console.log(error);
        }
      });
}

//When the user types do-what-it-says do this
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    var dataArr = data.split(",");

    action = dataArr[0];
    value = dataArr[1]

    console.log(action)
    console.log(value)
    spotifyThisSong ()
  })
}