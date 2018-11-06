import CrawlForm from '../CrawlForm';
import CrawlGraph from '../CrawlGraph';
import CrawlHistory from '../CrawlHistory';

const routes = {
  form: {
    key: 'form',
    exact: true,
    name: 'New',
    path: '/',
    icon: 'plus',
    component: CrawlForm,
  },
  graph: {
    key: 'graph',
    name: 'Graph',
    path: '/graph',
    icon: 'chart area',
    component: CrawlGraph,
  },
  history: {
    key: 'history',
    name: 'History',
    path: '/history',
    icon: 'history',
    component: CrawlHistory,
  },
};

export default Object.values(routes);
