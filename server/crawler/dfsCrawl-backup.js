const fetch = require('node-fetch');
const cheerio = require('cheerio');
const urlParse = require('url');
const util = require('util');
util.inspect.defaultOptions.maxArrayLength = null;

async function dfsCrawl(options) {
  console.log(`In the dfsCrawl module, the options are ${util.inspect(options,false,null,true)}`);
  let url = options.url;
  let parent = '';
  const MAX_DEPTH = options.hopLimit;
  const target = options.target;

  let Links = [];
  let queue = [];
  let outputNodes = [];
  let tmp = [];
  queue.push({url,parent});

  let graphData = {};
  graphData = options;

  //let queueRandom = [];
  //queueRandom.push({url,parent});

  console.log(`Entering the MAX_DEPTH while loop`);

  for(i=0; i<MAX_DEPTH; i++) {
    Links[i] = queue;
    if(i>0){
      tmp = await queueCreator(Links,i);
      console.log(`The queue in the i is ${util.inspect(tmp,false,null,true)}`);
      queueRandom = tmp[Math.floor(Math.random()*tmp.length)]
      console.log(`The queue random in the i is ${util.inspect(queueRandom,false,null,true)}`);
      queue = [];
      queue.push(queueRandom);
    }
    //queue = queueRandom;
    console.log(`The queue is ${util.inspect(queue,false,null,true)}`);
    currentNodes = await traverseQueue(queue, target);

    // console.log(`The queue is ${util.inspect(queue,false,null,true)}`);
    for(k=0;k<currentNodes.nodes.length;k++){ // pushing links present in current url
      outputNodes[outputNodes.length] = currentNodes.nodes[k]; // pushing current set of nodes visited in main nodes array
    }
    if(currentNodes.found == true){
      console.log('keyword Found'); // if keyword is found loop will be stopped
      break;
    }
  }
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

async function queueCreator(Links, i) {
  queue = [];
  let currentURL = Links[i].url;
  for(j=0; j<Links[i].length;j++){
    console.log(`The Links is ${util.inspect(Links[i][j],false,null,true)}`);
    console.log(`The currentURL is ${util.inspect(Links[i][j].url,false,null,true)}`);
    // console.log(`Pushing links of ${Links[i][j]} to the queue`);
    // console.log(`Pushing Links ${util.inspect(Links[i][j],false,null,true)}`);
    // let response = await theFetch(Links[i][j]);
    let url_host = urlParse.parse(Links[i][j].url, true);
    console.log(`The url host protocol is ${url_host.protocol}`);
    console.log(`The url host hostname is ${url_host.hostname}`);
    currentURL = url_host.protocol + '//' + url_host.hostname;
    let html = await theFetch(currentURL);
    // let currentLinks = await getLinks(Links[i][j],response);
    // let currentLinks = await getLinks(currentURL, response);
    let currentLinks = [];
    try {
      const $ = cheerio.load(html);
      console.log("**********Finding Links*************");
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
    for(k=0; k<currentLinks.length;k++){
      queue[queue.length] = {url: currentLinks[k], parent: Links[i][j].url};
    }

  }
  return queue;
}
async function theFetch(url){
  // console.log("Fetching with node-fetch");
  // console.log(`The currentURL is ${url}`);
  // console.log(`The currentURL is ${util.inspect(url,false,null,true)}`);
  response = await fetch(url)
    .then(response => response.text())
    .then(body => {
      return body;
    });
  return response
}

async function traverseQueue(pageUrls, target) {
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
            let html = await theFetch(currentURL);
            console.log('Currently Crawling: '+ currentURL);
            // await page.waitFor(2*1000);

            let result = {};
            let targetFound = 0;
            try {
              const $ = cheerio.load(html);
              let title = $('head > title').text();
              console.log(`Found the title - ${title}`);
              let word = $('html > body').text();
              if(word.toLowerCase().indexOf(target.toLowerCase()) !== -1) {
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
    //}
    return {
        nodes: nodes,
        found: false
    };
}

module.exports = dfsCrawl;
