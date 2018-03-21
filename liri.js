
require("dotenv").config();
var twitterr = require("twitter");
var spotifyr = require("spotify");
var request = require("request");
var keys = require('./keys');
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//Lets get some user input
var action = process.argv[2];

//If the user doesnt input one of the 4 commands let them know and dont run the command
if (action !="my-tweets" || action!="spotify-this-song" || action!="movie-this" || action!="do-what-it-says") {
    return console.log("Liri doed not recognize this command. Please try again.")
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

//url used to get movie data
var movieUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy"

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
function myTweets() {

}

//When the user types spotify-this-song do this
function spotifyThisSong () {

}

//When the user types movie-this do this
function movieThis() {
    request(movieUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
      
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plote: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

        }
        else {
            return console.log(error);
        }
      });
}

//When the user types do-what-it-says do this
function doWhatItSays() {

}