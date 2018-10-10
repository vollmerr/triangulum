import React from 'react';
import { Container } from 'semantic-ui-react';
import { Route, withRouter } from 'react-router-dom';

import CrawlerForm from '../CrawlerForm';
import Graph from '../Graph';

// main application container, handles tranfering data to pages
class App extends React.PureComponent {
  state = {
    graphData: {},
  }

  onCrawlSuccess = (data) => {
    const { history } = this.props;
    this.setState({ graphData: data });
    history.push('/graph');
  }

  render() {
    const { graphData } = this.state;

    const crawlerFormProps = {
      onSuccess: this.onCrawlSuccess,
    };

    const graphProps = {
      data: graphData,
    };

    return (
      <Container text>
        <Route exact path="/" component={() => <CrawlerForm {...crawlerFormProps} />} />
        <Route path="/graph" component={() => <Graph {...graphProps} />} />
      </Container>
    );
  }
}

export default withRouter(App);
