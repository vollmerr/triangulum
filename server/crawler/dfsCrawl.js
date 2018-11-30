const fetch = require('node-fetch');
const cheerio = require('cheerio');
const urlParse = require('url');
const util = require('util');
util.inspect.defaultOptions.maxArrayLength = null;

// ADDED ---------------------------------------
let maxTimeReached = false;
let timerID = setTimeout(() => {
    maxTimeReached = true;
  }, 105000);

async function dfsCrawl(options, graphData) {
  console.log(`In the dfsCrawl module, the options are ${util.inspect(options,false,null,true)}`);
  let url = options.url;
  let parent = '';
  const MAX_DEPTH = options.hopLimit;
  const target = options.target;

  let theLinks = [];
  let queue = [];
  let outputNodes = [];
  let tmp = [];
  queue.push({url,parent});

  graphData.isTimedOut = maxTimeReached;
  //let graphData = {};
  //graphData = options;

  //let queueRandom = [];
  //queueRandom.push({url,parent});

  console.log(`Entering the MAX_DEPTH while loop`);

  for(i=0; i<MAX_DEPTH; i++) {
    theLinks[i] = queue;
    if(i>0){
      tmp = await buildQueue(theLinks,i);
      console.log(`The queue in the i is ${util.inspect(tmp,false,null,true)}`);
      queueRandom = tmp[Math.floor(Math.random()*tmp.length)]
      console.log(`The queue random in the i is ${util.inspect(queueRandom,false,null,true)}`);
      queue = [];
      queue.push(queueRandom);
    }
    //queue = queueRandom;
    console.log(`The queue is ${util.inspect(queue,false,null,true)}`);
    currentNodes = await walkQueue(queue, target, i);
    console.log(`The currentNodes is ${util.inspect(currentNodes,false,null,true)}`);

    for(k=0;k<currentNodes.nodes.length;k++){ // pushing links present in current url
      outputNodes[outputNodes.length] = currentNodes.nodes[k]; // pushing current set of nodes visited in main nodes array
    }

    if(i==0){
      if(currentNodes.nodes[i].url==="BAD URL"){
        console.log("Exiting due to BAD URL from the Client");
        break;
      }
    }

    if(currentNodes.found == true){
      console.log('keyword Found'); // if keyword is found loop will be stopped
      break;
    }

    if(maxTimeReached == true){
      console.log('max search time hit'); // if keyword is found loop will be stopped
      graphData.isTimedOut = maxTimeReached;
      break;
    }

  }

  clearTimeout(timerID);

  // graphData.nodes = outputNodes;
  let result = clean_the_nodes(outputNodes);
  return result;
}

// function clean_the_nodes puts the data in the format required
async function clean_the_nodes(linkQ) {
  EARLS = linkQ.map(linkQ => linkQ.url);
  TITLES = linkQ.map(linkQ => linkQ.title);
  PARENTS = linkQ.map(linkQ => linkQ.parent);
  TARGETS = linkQ.map(linkQ => linkQ.targetFound);
  // console.log(`Big O URL's ${EARLS}`);
  // console.log(`Big O URL Titles ${TITLES}`);
  // console.log(`Big O Parent URLs ${PARENTS}`);
  // console.log(`Big O Targets Found ${TARGETS}`);
  // console.log(`Target 0 is ${TARGETS[0]}`);
  let cleanedNodes = [];
  // console.log(`EARLS length is ${EARLS.length}`);
  for(let i = 0; i<EARLS.length; i++){
    let url = EARLS[i];
    let title = TITLES[i];
    let parent = PARENTS[i];
    let targetFound = TARGETS[i];
    cleanedNodes.push({url,title,parent,targetFound});
  }
  return cleanedNodes;
}  // end clean_the_node function

async function buildQueue(theLinks, i) {
  queue = [];
  let currentURL = theLinks[i].url;
  for(j=0; j<theLinks[i].length;j++){
    console.log(`The theLinks is ${util.inspect(theLinks[i][j],false,null,true)}`);
    console.log(`The currentURL is ${util.inspect(theLinks[i][j].url,false,null,true)}`);
    // console.log(`Pushing links of ${theLinks[i][j]} to the queue`);
    // console.log(`Pushing theLinks ${util.inspect(theLinks[i][j],false,null,true)}`);
    // let response = await theFetch(theLinks[i][j]);
    let url_host = urlParse.parse(theLinks[i][j].url, true);
    console.log(`The url host protocol is ${url_host.protocol}`);
    console.log(`The url host hostname is ${url_host.hostname}`);
    currentURL = url_host.protocol + '//' + url_host.hostname;
    let html;
    try {
      html = await theFetch(currentURL);
    } catch (error) {
      console.log(error);
    }
    let currentLinks = [];
    try {
      const $ = cheerio.load(html);
      console.log("**********Finding theLinks*************");
      $("a[href^='http']").each(function() {
        theurl = $(this).attr('href');
        // foundTitle = $('head > title').text();
        console.log(`We found this link ${theurl}`);
        // linkQ.push({url,parent});
        currentLinks.push(theurl);
      });
      console.log("**********Finding Complete**********");
    } catch (error) {
      console.log(error);
    }
    console.log(`The currentLinks list is ${util.inspect(currentLinks,false,null,true)}`);
    console.log("Removing duplicates");
    currentLinks = Array.from(new Set(currentLinks))
    console.log(`The currentLinks dedupe list is ${util.inspect(currentLinks,false,null,true)}`);
    for(k=0; k<currentLinks.length;k++){
      queue[queue.length] = {url: currentLinks[k], parent: theLinks[i][j].url};
    }

    // ADDED -----------------------------------------
    if(maxTimeReached == true){
      console.log('max search time hit'); // if keyword is found loop will be stopped
      break;
    }

  }
  return queue;
}
async function theFetch(url){
  try {
    const response = await fetch(url);
    // only process text/html files...
    if (response.headers.get('content-type').match(/text\/html/)) {
      return response.text();
    }
    // skip others such as zip, etc
    return null;
  } catch (err) {
    throw err;
  }
}

async function walkQueue(pageUrls, target, i) {
    console.log(`The pageURLs is ${util.inspect(pageUrls[0].url,false,null,true)}`);
    let currentURL = '';
    console.log(`The currentURL is ${util.inspect(currentURL,false,null,true)}`);
    console.log(`The target is ${util.inspect(target,false,null,true)}`);
    nodes = [];
    // let urlList = pageUrls.map(a => a.url);
    // console.log(`The pageURLS url is ${pageUrls.url}`);
    let urlList = pageUrls[0].url;
    console.log(`The urlList is ${urlList}`);
    //for( x in pageUrls) {
    currentURL = urlList;
    console.log(`The currentURL is ${util.inspect(currentURL,false,null,true)}`);
    // await page.goto(pageUrls[x].url).catch((err) => {}); // loading url
    let html
    try {
      html = await theFetch(currentURL);
    } catch (error) {
      console.log(error);
      if(i===0) {
        let badResult = {};
        badResult.url = "BAD URL";
        badResult.parent = "";
        badResult.title = "BAD URL";
        badResult.targetFound = 1;
        nodes.push(badResult)
        console.log("Before the return");
        return {
            nodes: nodes,
            found: false
        };
        console.log("After the return");
      }
    }
    console.log('Currently Crawling: '+ currentURL);
    // await page.waitFor(2*1000);

    let result = {};
    let targetFound = 0;
    try {
      const $ = cheerio.load(html);
      let title = $('head > title').text();
      console.log(`Found the title - ${title}`);
      let word = $('html > body').text();
      if(target === ''){
        targetFound = 0;
      } else if(word.toLowerCase().indexOf(target.toLowerCase()) !== -1) {
          targetFound = 1;
      } else {
        targetFound = 0;
      }
      result.url = pageUrls[0].url;
      result.title = title;
      result.targetFound = targetFound;
    } catch (error) {
      console.log(error);
    }

    if(result.title){
        result.parent = pageUrls[0].parent; // seeting the parent of current list of urls
        nodes.push(result);
    }
    if(result.targetFound && result.targetFound == 1){ // if keyword is returning thecurrent set of nodes
        return {
            nodes: nodes,
            found: true
        };
    }

    // ADDED ----------------------------------------------------------
    if(maxTimeReached == true){
        console.log('max search time hit'); // if keyword is found loop will be stopped
        //break;
    }

    return {
        nodes: nodes,
        found: false
    };
}

module.exports = dfsCrawl;
