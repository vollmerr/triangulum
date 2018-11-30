import React from 'react';
import Graph from './graph';

import EmptyMessage from '../../components/Message/EmptyMessage';

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
  return <EmptyMessage message={'No recent crawl to display :('} />;
};

export default CrawlGraph;
