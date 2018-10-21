import React from 'react';
import { Button } from 'semantic-ui-react';

import * as historyStorage from '../../utils/historyStorage';

import HistoryItems from './HistoryItems';

/**
 * History of previous crawls made
 *
 * TODO:
 *  - load graph on click / store entire result
 *  - display for mobile vs desktop
 *    - sidebar on desktop
 *    - own page on mobile
 */
class CrawlHistory extends React.PureComponent {
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

  render() {
    const { items } = this.state;

    const resetProps = {
      fluid: true,
      basic: true,
      icon: 'trash',
      size: 'large',
      type: 'button',
      color: 'red',
      content: 'Reset',
      onClick: this.onReset,
      disabled: !Object.keys(items).length,
    };

    return (
      <div>
        <HistoryItems items={items} />
        <Button {...resetProps} />
      </div>
    );
  }
}

export default CrawlHistory;
