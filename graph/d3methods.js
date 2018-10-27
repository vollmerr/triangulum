/* 
    Triangulum
    JS file for d3 data visualization
*/

/****************************************************************************************
 * Preparing data for d3 tree
 ****************************************************************************************/

// Sample resonse from crawler
var response = 
{
    "url": "google.com",
    "target": "word",
    "type": "bfs", 
    "hopLimit": 10,
    "nodes": 
    [
        {"url": "google.com", "title": "Google", "parent":"", "targetFound":0},
        {"url": "facebook.com", "title": "Facebook", "parent": "google.com", 
            "targetFound":0},
        {"url": "youtube.com", "title": "Youtube", "parent": "google.com", 
            "targetFound":0},
        {"url": "twitter.com", "title": "Twitter", "parent": "google.com", 
            "targetFound":0},
        {"url": "gmail.com", "title": "Gmail", "parent": "google.com", "targetFound":0},
        {"url": "http://canvas.oregonstate.edu/","title": "Canvas OSU", 
            "parent": "google.com", "targetFound":0},
        {"url": "www.espn.com", "title": "ESPN", "parent": "facebook.com", 
            "targetFound":0},
        {"url": "www.nsa.gov", "title": "National Security Agency", "parent": 
            "facebook.com", "targetFound":0},
        {"url": "www.youtube.com/feed/trending", "title": "Trending - Youtube", 
            "parent": "youtube.com", "targetFound":0},
        {"url": "www.youtube.com/feed/subscriptions", "title": "Subscriptions - Youtube",
            "parent": "youtube.com", "targetFound":0},
        {"url": "www.youtube.com/feed/history", "title": "History - Youtube", "parent": 
            "youtube.com", "targetFound":0},
        {"url": "twitter.com/i/moments", "title": "Today - Twitter Moments", "parent": 
            "twitter.com", "targetFound":0},
        {"url": "twitter.com/i/notifications", "title": "Twitter/Notifcations", "parent":
            "twitter.com", "targetFound":0},
        {"url": "www.google.com/maps", "title": "Google Maps", "parent": "google.com", 
            "targetFound":0},
        {"url": "news.google.com", "title": "Google News", "parent": "gmail.com", 
                "targetFound":0},
        {"url": "contacts.google.com/", "title": "Google Contacts", "parent": 
            "gmail.com", "targetFound":0},
        {"url": "drive.google.com/drive/", "title": "Google Drive", "parent": 
            "gmail.com", "targetFound":0},
        {"url": "calendar.google.com/calendar/", "title": "Google Calendar", "parent": 
            "gmail.com", "targetFound":0},
        {"url": "https://osu-cs.slack.com/", "title": "OSU Slack", "parent": 
            "http://canvas.oregonstate.edu/", "targetFound":0},
        {"url": "www.espn.com/fantasy/football/", "title": "Fantasy Football", 
            "parent": "www.espn.com", "targetFound":0},
        {"url": "www.espn.com/nba/", "title": "ESPN NBA", "parent": "www.espn.com", 
            "targetFound":0},
        {"url": "https://www.youtube.com/watch?v=6F1iqcxvfBc", "title": 
            "NBA Youngboy - Temporary Time - Youtube", "parent": 
            "www.youtube.com/feed/trending", "targetFound":0},
        {"url": "https://www.youtube.com/watch?v=-DVkz4LLu8w", "title": 
            "Matty Mathesons Ultimate Burger Recipe", "parent": 
            "www.youtube.com/feed/subscriptions", "targetFound":1}
    ]
};
 
// Global variables
var counter = 0, // Counter, assigns unique IDs to nodes
    duration = 800, // Speed (ms) for transition
    // Bool for target search success
    targetSuccess = response.nodes[response.nodes.length - 1].targetFound; 

// Find target path for later styling
if(targetSuccess) findTargetPath(response.nodes);

// Turn response data into hierarchical json format for d3
var treeData = d3.stratify()
    .id(function(d) { return d.url; })
    .parentId(function(d) { return d.parent; })
    (response.nodes);

/****************************************************************************************
 * Initial page and chart setup 
 ****************************************************************************************/

// Set the margins of the diagram
var margin = {top: 30, right: 30, bottom: 30, left: 30};

// Get page dimensions
var size = 
{
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
};

// Set container width
document.getElementById("pageContainer").style.width = String(0.85 * size.width) + "px";

// Set chart (svg group) dimensions
var width = (0.8 * size.width) - margin.left - margin.right;
var height = (0.65 * size.height) - margin.top - margin.bottom;

/****************************************************************************************
 * Render initial tree
 ****************************************************************************************/

// append the svg object to the body of the page
// add dimensions and zoom handler
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#d3Container").append("svg")
    .attr("id", "d3-svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.zoom().on("zoom", function() {
        svg.attr("transform", d3.event.transform)
    }))
    .append("g")
        .attr("transform", "translate("+ margin.left + "," + margin.top + ")");

// declares a tree layout and assigns the size
var tree = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
var root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Initial rendering - collapse all nodes and then call update
initialCollapse(root);
update(root);
console.log(root);

// String processing
var keyString= response.target;
if(targetSuccess) 
    keyString += " (FOUND)";
else
    keyString += " (NOT FOUND)";

// Render settings text
document.getElementById("startURL").innerHTML = response.url;
document.getElementById("type").innerHTML = response.type + " (" + response.hopLimit + ")";
document.getElementById("keyword").innerHTML = keyString;

/****************************************************************************************
 * findTargetPath()
 * 
 * Takes an array of objects (nodes) and determines crawl path to target word
 ****************************************************************************************/
function findTargetPath(nodes) 
{    
    addTargetPathVar(nodes);
    addTargetPath(nodes, nodes.length - 1, 0);

    // Assigns each object a "targetPath" key and value
    function addTargetPathVar(nodes) 
    {
        for (i = 0; i < nodes.length; i++)
            nodes[i].targetPath = 0;
    }
    
    // Recursivley determines target path by linear search
    function addTargetPath(nodes, chiIdx, iter)     
    {
        nodes[chiIdx].targetPath = 1;
        if(nodes[chiIdx].parent != null)
        {
            for(i = 0; i < nodes.length; i++)
            {
                if(nodes[chiIdx].parent == nodes[i].url)
                    addTargetPath(nodes, i, iter);
            }
        }
    }
}

/****************************************************************************************
 * initialCollapse()
 * 
 * Collapses each lower level node starting with the passed node (d)
 ****************************************************************************************/
function initialCollapse(d) 
{
    if(d.children) 
    {
        d._children = d.children;
        d._children.forEach(initialCollapse);
        d.children = null;
    }
}

/****************************************************************************************
 * update()
 * 
 * Calculates positioning of nodes/links, renders elements onto dom. Updates, adds,
 * and removes elements. 
 ****************************************************************************************/
function update(source) 
{
    // Assigns the x and y position for the nodes
    var treeData = tree(root);

    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(function(d){ d.y = d.depth * 300});

    // ****************** Nodes section ***************************
        
    // Update the nodes...
    var node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++counter); });

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.data.data.targetFound ? "26" : "13";
        })
        .attr("text-anchor", "start")
        .text(function(d) { return d.data.data.title; });

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")";
        });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
        .attr('r', function(d) {
            return d.data.data.targetFound ? "20" : "10";
        })
        .style("fill", function(d) {
            if(d._children)
            {
                if(d.data.data.targetPath)
                    return "#c0f7cc";
                else
                    return "#bcdcff";
            }
            else
                return "#fff";
        })
        .attr('stroke', function(d) {
            if(d.data.data.targetPath)
            { 
                if(d.data.data.targetFound)
                    return "#dc3545";
                else
                    return "#28a745";
            }
            else
                return "#007bff";
        })
         .attr('stroke-width', function(d) {
            return d.data.data.targetFound ? "5px" : "3px";
        })
        .attr('cursor', 'pointer');

    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
        .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
        nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
            var o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
        })
        .attr('stroke', function(d) {
            return d.data.data.targetPath ? "LightGray" : "LightGray";
        })
        .attr('stroke-width', function(d) {
            return d.data.data.targetPath ? "4px" : "2px";
        });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);
    
    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });
    
    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) 
    {
        path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

        return path;
    }

    // Toggle children on click.
    function click(d) 
    {
        if (d.children) 
        {
            d._children = d.children;
            d.children = null;
        } 
        else 
        {
            d.children = d._children;
            d._children = null;
        }
        
        update(d);
    }
}

/****************************************************************************************
 * levelClick(d)
 * 
 * Uncollapses each next level node 
 ****************************************************************************************/
function levelClick(d) 
{
    d.eachAfter(function(d) {
            if(d._children)
            {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    );
}

/****************************************************************************************
 * globalCollapse(d)
 * 
 * Collapses each lower level node starting with the passed node (d)
 ****************************************************************************************/
function globalCollapse(d) 
{
    if(d.children) 
    {
        d._children = d.children;
        d._children.forEach(globalCollapse);
        d.children = null;
    }
    
    update(d);
}

/****************************************************************************************
 * showTargetPath(d)
 * 
 * Collapses each node not associated with target path, while uncollapsing all target
 * path nodes
 ****************************************************************************************/
function showTargetPath(d) 
{
    d.each(function(d) {
            if(d._children && d.data.data.targetPath)
            {
                d.children = d._children;
                d._children = null;
            }
            else if(d.children && !d.data.data.targetPath)
            {
                d._children = d.children;
                d.children = null;
            }
            
            update(d);
        }
    );

}
