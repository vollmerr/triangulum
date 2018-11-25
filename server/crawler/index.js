const cheerio = require('cheerio');
const util = require('util');
const initialize = require('./initialize.js');
const bfsCrawl = require('./bfsCrawl.js');
const dfsCrawl = require('./dfsCrawl.js');


// global variables
let graphData = {};
let searchQueue = [];
let urlsScraped = [];
let urlContent = {};
let nodesVisited = [];
let currentTitle;
let pageCounter = 0;


let main = async (options) => {
    let result;
    let data;
    let graphData = {};
    console.log("before intialize");
    let startingData = await initialize(options);
    console.log(`Initialize result is ${util.inspect(startingData,false,null,true)}`);
    console.log("after intitialize");
    graphData = startingData;

    if(startingData.type === 'bfs') {
      // bfs routine
        console.log('in the bfs');
        let result = await bfsCrawl(startingData).then((value) => {
          console.log('in the BFS');
          data = value;
          // console.log(`BFS value is ${util.inspect(value,false,null,true)}`);
          // console.log(`BFS data is ${util.inspect(data,false,null,true)}`);
        });
        // console.log(`simpleBFS result is ${util.inspect(result,false,null,true)}`);

    } else {
      // dfs routine
      console.log('in the dfs');
      result = await dfsCrawl(startingData).then((value) => {
        console.log('in the DFS');
        data = value;
        // console.log(`dfS value is ${util.inspect(value,false,null,true)}`);
        // console.log(`dfS result is ${util.inspect(result,false,null,true)}`);
      });
      console.log(`dfS result is ${util.inspect(result,false,null,true)}`);
    }
  graphData.nodes = data;
  return graphData;
};

process.on('message', async (options) => {
  console.log('in the process');
  try {
    console.log(`Looking at the options in the process ${options}`);
    const result = await main(options);
    console.log(`The result is ${util.inspect(result,false,null,true)}`);
    console.log('finished crawl');
    process.send(result);
    console.log('sent results');
  } catch (err) {
    // parent process expects an 'error' property on response if error
    process.send({ error: err.message || 'Something Broke!' });
  }
});
