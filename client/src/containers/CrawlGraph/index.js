import React from 'react';
import Graph from './graph';

/**
 * Crawler visual graph
 *
 * 'data' gets populated in parent App container
 *  when successful response from crawler form submit.
 */
const CrawlGraph = ({ data }) => {
  if (data.response && data.response.nodes.length) {
    return <Graph data={data} />;
  }
  return null;
};

export default CrawlGraph;
