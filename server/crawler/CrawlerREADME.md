# About
The crawler is written in node.js and uses the node-fetch, cheerio and url packages.
The util package is also used to help display console.log messages.

# Getting Started - Install, Build, Run
Please see the README located in the program root directory to install, build and run the program.

# Crawler Program Flow - Looking at the Breadth-First Crawl - bfsCrawl
1. The program starts (see Getting Started section above) and the user enters search options on client page
2. The client sends options to process.on in the /server/crawler/index.js file
3. Process.on calls main with argument options, also located in index.js
4. Main initializes variables and the options
5. A conditional check of startindData.type will determine if we execute the "breadth-first" or "depth-first" algorithm.
6. The results of either search will be store in the "graphData" object. In turn, the graphData object will be returned to process.on, which will return that object to the calling client.

## The breadth-first crawl, bfsCrawl receives the startingData as options
1. To build the node structure, bfsCrawl will loop to the depth defined in MAX_DEPTH that was received from the user options.
2. Within each iteration, we build the queue by calling the buildQueue function
3. For each buildQueue called, we walk that queue by calling the walkQueue function.  
4. The result of the walkQueue is a set of nodes that have the url, title, parent and targetFound set.
5. These nodes are then assigned to the outputNodes array.
6. Once the loop completes, the outputNodes array is sent to the clean_the_nodes function to get the data set into the format required by the visualizer.

## The buildQueue function receives theLinks list and the iteration # of the bfsCrawl loop.
1. Enter a new loop where we cycle through the length of the theLinks list. IE, we will build a set of links from each URL in the theLinks list.
2. Extrace out the URL from the theLinks list and call the url package to get the URL into the format required of the node-fetch package.
3. Call theFetch with the currentURL and assign to HTML
4. Use the cheerio package to get all the URL's that have http.  IE these are the absolute links and node-fetch rquires this.
5. Store the currentLinks and the associated parent into the queue.
6. Return the queue to bfsCrawl function.

## The walkQueue function receives the of URL's to walk, as well as the target keyword.
1. create a list of urls from the pageURLS called urlList.
2. iterate through the pageURL list with a for in method
3. Set the currentURL to the urlList.
4. Call theFetch and assign to HTML
5. Use the cheerio package to get the page title, search for the keyword.
6. Set the url, title, parent and targetFound to the result and push the result to nodes.
7. Return nodes and a keyword found flag.

# The Depth-First Crawl - dfsCrawl
The dfsCrawl is the same as bfsCrawl except for one significant difference.
In the dfsCrawl function, we randomly select one link from the queue to walkQueue.
```
tmp = await buildQueue(theLinks,i);
console.log(`The queue in the i is ${util.inspect(tmp,false,null,true)}`);
queueRandom = tmp[Math.floor(Math.random()*tmp.length)]
console.log(`The queue random in the i is ${util.inspect(queueRandom,false,null,true)}`);
queue = [];
queue.push(queueRandom);
```
<b>Note</b>: This leads to some minor changes in the dfsCrawl.js walkQueue function compared to the bfsCrawl.js walkQueue function.
