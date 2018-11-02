import React from 'react';
import { Container } from 'semantic-ui-react';
import { HashRouter, Route } from 'react-router-dom';

import * as historyStorage from '../../utils/historyStorage';

import CrawlForm from '../CrawlForm';
import CrawlGraph from '../CrawlGraph';
import CrawlHistory from '../CrawlHistory';

import Header from './Header';


/**
 * main application container that handles:
 *  - routing bewteen containers
 *  - tranfering data to pages
 *
 * TODO:
 *  - handle mobile vs desktop view
 *    - handles resizing event / redirecting on resize
 *    - form, history, and graph on own page for mobile
 *    - form, history, and graph on single page for desktop
 */
class App extends React.PureComponent {
  state = {
    data: {},
  }

  componentDidMount() {
    historyStorage.init();
  }

  updateData = ({ data }) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;

    const crawlerFormProps = {
      updateData: this.updateData,
    };

    const graphProps = {
      data,
    };

    return (
      <HashRouter>
        <Container text>
          <Header />

          <Route exact path="/" component={() => <CrawlForm {...crawlerFormProps} />} />
          <Route path="/graph" component={() => <CrawlGraph {...graphProps} />} />
          <Route path="/history" component={() => <CrawlHistory />} />
        </Container>
      </HashRouter>
    );
  }
}

export default App;
