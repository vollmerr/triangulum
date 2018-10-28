const utils = require('../utils');
let request = require('request');
let cheerio = require('cheerio');
let URL = require('url-parse');

//A queue to create the order for the next URL to vist and scrape/etc
let searchQueue = [];
//An array that will hold the object contents for each site visited
let nodesVisited = [];
//Object that holds the content for a specific site
let urlContent = {};
let numberOfPages = 0;
let testData = {};

let nodesSmall = [
  //targetFound boolean 0 means the keyword was not found
  //targetFound booland 1 means the keyword was found
  //this should change to searchKeyord ?  Ask the team
  {url: "google.com", title: "Google", parent: "", targetFound:0},
  {url: "facebook.com", title: "Facebook", parent: "Google", targetFound:0},
  {url: "youtube.com", title: "Youtube", parent: "?", targetFound:0},
  {url: "twitter.com", title: "Twitter", parent: "?", targetFound:0},
  {url: "gmail.com", title: "Gmail", parent: "?", targetFound:1}
];

let nodesBigger = [
  {"url": "google.com", "title": "Google", "parent":"", "targetFound":0},
  {"url": "facebook.com", "title": "Facebook", "parent": "google.com", "targetFound":0},
  {"url": "youtube.com", "title": "Youtube", "parent": "google.com", "targetFound":0},
  {"url": "twitter.com", "title": "Twitter", "parent": "google.com", "targetFound":0},
  {"url": "gmail.com", "title": "Gmail", "parent": "google.com", "targetFound":0},
  {"url": "http://canvas.oregonstate.edu/","title": "Canvas OSU", "parent": "google.com", "targetFound":0},
  {"url": "www.espn.com", "title": "ESPN", "parent": "facebook.com", "targetFound":0},
  {"url": "www.nsa.gov", "title": "National Security Agency", "parent": "facebook.com", "targetFound":0},
  {"url": "www.youtube.com/feed/trending", "title": "Trending - Youtube", "parent": "youtube.com", "targetFound":0},
  {"url": "www.youtube.com/feed/subscriptions", "title": "Subscriptions - Youtube", "parent": "youtube.com", "targetFound":0},
  {"url": "www.youtube.com/feed/history", "title": "History - Youtube", "parent": "youtube.com", "targetFound":0},
  {"url": "twitter.com/i/moments", "title": "Today - Twitter Moments", "parent": "twitter.com", "targetFound":0},
  {"url": "twitter.com/i/notifications", "title": "Twitter/Notifcations", "parent": "twitter.com", "targetFound":0},
  {"url": "www.google.com/maps", "title": "Google Maps", "parent": "google.com", "targetFound":0},
  {"url": "news.google.com", "title": "Google News", "parent": "gmail.com", "targetFound":0},
  {"url": "contacts.google.com/", "title": "Google Contacts", "parent": "gmail.com", "targetFound":0},
  {"url": "drive.google.com/drive/", "title": "Google Drive", "parent": "gmail.com", "targetFound":0},
  {"url": "calendar.google.com/calendar/", "title": "Google Calendar", "parent": "gmail.com", "targetFound":0},
  {"url": "https://osu-cs.slack.com/", "title": "OSU Slack", "parent": "http://canvas.oregonstate.edu/", "targetFound":0},
  {"url": "www.espn.com/fantasy/football/", "title": "Fantasy Football", "parent": "www.espn.com", "targetFound":0},
  {"url": "www.espn.com/nba/", "title": "ESPN NBA", "parent": "www.espn.com", "targetFound":0},
  {"url": "https://www.youtube.com/watch?v=6F1iqcxvfBc", "title": "NBA Youngboy - Temporary Time - Youtube", "parent": "www.youtube.com/feed/trending", "targetFound":0},
  {"url": "https://www.youtube.com/watch?v=-DVkz4LLu8w", "title": "Matty Mathesons Ultimate Burger Recipe", "parent": "www.youtube.com/feed/subscriptions", "targetFound":1}
];

const crawl = async (options) => {
  //verify that we can pull out the options sent from main page
  //we also want to return the options per the doc that Sid share on the team drive ?
  console.log(options);
  const url = options.url;
  const type = options.type;
  const hopLimit = options.limit;
  const target = options.keyword;
  testData.url = url;
  testData.type = type;
  testData.hopLimit = hopLimit;
  testData.target = target;
  // debug purposes - can be commented out after fully tested
  console.log(`The starting URL is ${url}`);
  console.log(`The search type is ${type}`);
  console.log(`The maximum depth is ${hopLimit}`);
  console.log(`The search keyword is ${target}`);
  // debug purpose - print out the current testData Object
  console.log(testData);

  //this check allows us to push the startingURL from the client options
  //onto the queue
  if (numberOfPages === 0) {
    searchQueue.push(url);
  }
  // pop the URL from the front of the stack using shift
  var current = searchQueue.shift();
  console.log("**********Current URL to Crawl**********");
  console.log(current);
  // push the current node to the nodes visited list
  //nodesVisited.push(current);

  //increment this counter everytime we crawl a new URL
  //we'll compare this to the hopLimit to terminate a crawl
  //when we hit this limit
  numberOfPages++;


// Lets now go visit the url
// the Promise is needed to prevent timing errors.
return new Promise((resolve, reject) => {
  request(current, (error, response, body) => {
      if (error) {
        console.log("We hit an error - reject error!");
         reject(error);
       }
      console.log('error code: ', error);
      console.log('status code: ', response && response.statusCode);
      $ = cheerio.load(body);
      //first thing is we need to get the title of this page
      let currentTitle = $('head > title').text();
      //search through and see if there is a match in the HTML body with the keyword variable
      //named target

      /*
        find target code block here
      */

      //Begin searching body of the downloaded page and store URL links
      let links = $('a');
      let foundTitle;
      console.log("**********Found Link**********");
      $(links).each((i, link) => {
        let foundLink = $(link).attr('href');
        foundTitle = $('head > title').text();
        console.log(`We found this link ${foundLink} with this title ${foundTitle}`);
        searchQueue.push(foundLink);
      });
      //push the first URL and Title onto the nodesVisited array
      //the nodesVisited array holds the contents (url and title) of each site visited
      urlContent.url = current;
      urlContent.title = currentTitle;
      nodesVisited.push(urlContent);
      //Completed downloading the links on the page and pushing to the searchQueue

      if (numberOfPages >= hopLimit) {
        console.log("We've reached the depth limit and will return the data set to the client");
        // this allows us to push the options from the client onto the list and send back to the caller
        testData.nodes = nodesBigger;
        console.log(nodesVisited);
        testData = JSON.stringify(testData);
        return resolve(testData);
      }

      console.log("We are completing our crawl and will return the data set to the client");
      // this allows us to push the options from the client onto the list and send back to the caller
      testData.nodes = nodesBigger;
      console.log(nodesVisited);
      testData = JSON.stringify(testData);
      return resolve(testData);

    });
});
}

process.on('message', async (options) => {
  console.log("in the process");
  try {
    const result = await crawl(options);
    console.log("finished crawl");
    process.send(result);
    console.log("sent results");
  } catch (err) {
    // parent process expects an 'error' property on response if error
    process.send({ error: err.message || 'Something Broke!' });
  }
});
