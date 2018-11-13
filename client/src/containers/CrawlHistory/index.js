import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import * as historyStorage from '../../utils/historyStorage';

import HistoryItems from './HistoryItems';

/**
 * History of previous crawls made
 */
export class CrawlHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
    };
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = () => {
    historyStorage.init();
    const items = historyStorage.getItems();
    this.setState({ items });
  }

  onReset = () => {
    historyStorage.reset();
    const items = historyStorage.getItems();
    this.setState({ items });
    this.forceUpdate();
  }

  onClick = (event, { id }) => {
    const { history, updateData } = this.props;
    const data = historyStorage.getItem({ id });
    updateData({ data });
    history.push('/graph');
  }

  render() {
    const { items } = this.state;
    const showResetBtn = !!Object.keys(items).length;

    const resetProps = {
      className: 'submitBtn',
      fluid: true,
      basic: true,
      icon: 'trash',
      type: 'button',
      color: 'red',
      content: 'Reset',
      onClick: this.onReset,
    };

    return (
      <Container text className={'page'}>
        <HistoryItems items={items} onClick={this.onClick} />
        {showResetBtn && <Button {...resetProps} />}
      </Container>
    );
  }
}

export default withRouter(CrawlHistory);
