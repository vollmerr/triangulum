import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, withRouter, Link } from 'react-router-dom';

import CrawlForm from '../CrawlForm';
import CrawlGraph from '../CrawlGraph';
import CrawlHistory from '../CrawlHistory';

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

  onCrawlSuccess = (data) => {
    const { history } = this.props;
    this.setState({ data });
    history.push('/graph');
  }

  render() {
    const { data } = this.state;

    const crawlerFormProps = {
      onSuccess: this.onCrawlSuccess,
    };

    const graphProps = {
      data,
    };

    return (
      <Container text>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/graph">graph</Link>
          </li>
          <li>
            <Link to="/history">history</Link>
          </li>
        </ul>

        <Route exact path="/" component={() => <CrawlForm {...crawlerFormProps} />} />
        <Route path="/graph" component={() => <CrawlGraph {...graphProps} />} />
        <Route path="/history" component={() => <CrawlHistory />} />
      </Container>
    );
  }
}

export default withRouter(App);
