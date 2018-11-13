import React from 'react';
import Graph from './graph.js';

/**
 * Placeholder for crawler visual graph
 *
 * 'data' gets populated in parent App container
 *  when successful response from crawler form submit.
 *
 * TODO:
 *   - display on single page for mobile
 *   - display on page with history sidebar + form above in desktop
 */
const CrawlGraph = ({ data }) => (
  <div>
    <Graph data={data} />
  </div>
);

export default CrawlGraph;
