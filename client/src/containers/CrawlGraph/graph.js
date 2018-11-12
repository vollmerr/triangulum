import React from 'react';
import Tree from './react-d3-tree';
import stratify from './utils.js';
import InfoAccordion from './infoAccordion.js';
import SearchSettings from './searchSettings.js';

const data = 
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
/**
 * Graph Component
 *
 * Renders the entire crawl graph, including information on how to use, the graph itself, 
 * and search parameters. 
 *
 * The graph is created using the react-d3-tree utility, an open source react component 
 * that uses d3 methods to create interactive tree graphs. The version in this project
 * is slightly modified so that labels can act as hyperlinks and have mouseover event
 * handlers. 
 * https://github.com/bkrem/react-d3-tree
 * 
 * data is passed as props, which contains url, target, type, hopLimit, and nodes fields. 
 */
class Graph extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = { 
      hierarchy: stratify(data.nodes),
      translate: {x: 0, y: 0},
      initialDepth: 0,
      separation: {siblings: 0.45, nonSiblings: 0.6},
      styles: {
        links: {
          fill: 'none',
          strokeWidth: '2px',
          stroke: 'LightGray',
        },  
      },
      textLayout: {
        textAnchor: "start", 
        y: 0, 
        transform: undefined,
      },
      width: 0,
      height: 0,
      depthFactor: 0
    }
  }

  // Following window size methods adapted from: 
  // https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ 
      width: String(0.8 * window.innerWidth) + 'px', 
      height: String(0.7 * window.innerHeight) + 'px',
      depthFactor: 0.175 * window.innerWidth,
      translate: {x: 0.03 * window.innerWidth, y: 0.35* window.innerHeight} 
    });
  }

  /**
   * Renders InfoAccordion, Tree (the graph), and Search Settings components
   * InfoAccordion - no passed props
   * Tree 
   *    - hierarchy data: data.nodes after being proccessed into hierarchical format
   *    - styling params as specified by react-d3-tree 
   *      - translate: positions root node at middle of chart at initial render
   *      - initialDepth: only displays root node at initial render
   *      - separation: specifies space between children and non-children nodes
   *      - depthFactor: specifies space between parent and child nodes, changes with window size
   *      - styles: specifies link styling
   *      - textLayout: specifies initial positioning of node label
   * Search Settings
   *    - url: url of starting site, taken from data.url
   *    - target: keyword for targeted search, taken from data.target
   *    - type: search type, taken from data.type
   *    - hopLimit: hop limit, taken from data.hopLimit
   *    - targetedSearch: bool value for targeted search
   *    - targetFound: 'FOUND' or 'NOT FOUND' depending on results of search
   */
  render() {
    const targetedSearch = (data.target) ? 1 : 0;
    const targetFound = (data.nodes[data.nodes.length - 1].targetFound) ? 'FOUND' : 'NOT FOUND';

    return (
      <div>
        <div 
          id='infoAccordionWrapper' 
          style={{
            width: this.state.width, 
            margin: 'auto'
          }}
        >
          <InfoAccordion />
        </div>
        <div 
          id='treeWrapper' 
          style={{
            width: this.state.width, 
            height: this.state.height,
            border: '3px solid #6435C8', 
            margin: 'auto'
          }}
        >
          <Tree 
            data={this.state.hierarchy} 
            translate={this.state.translate}
            initialDepth={this.state.initialDepth}
            separation={this.state.separation}
            depthFactor={this.state.depthFactor}
            styles={this.state.styles}
            textLayout={this.state.textLayout}
          />
        </div>
        <div
          style={{height: '10px'}}
        >
        </div>
          <div 
          id='searchSettingsWrapper' 
          style={{
            width: this.state.width, 
            margin: 'auto'
          }}
        >
          <SearchSettings
            url={data.url}
            target={data.target}
            type={data.type}
            hopLimit={data.hopLimit}
            targetedSearch={targetedSearch}
            targetFound={targetFound}
          />
        </div>
      </div>
    );
  }
}

export default Graph;
