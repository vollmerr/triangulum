import React from 'react';

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
    <pre>{`Graph will go here... ${JSON.stringify(data, null, 2)}`}</pre>
    <p><a href={`${process.env.REACT_APP_URL}/graph`}>Temp link to graph</a></p>
  </div>
);

export default CrawlGraph;
