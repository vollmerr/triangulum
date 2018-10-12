import React from 'react';
import { Button } from 'semantic-ui-react';

import * as historyStorage from '../../utils/historyStorage';

import HistoryItems from './HistoryItems';

/**
 * Placehodler for crawler history
 *
 * TODO:
 *  - make into list (semantic-ui styled)
 *  - reset functionality
 *  - display for mobile vs desktop
 *    - sidebar on desktop
 *    - own page on mobile
 */
class CrawlHistory extends React.PureComponent {
  state = {
    items: historyStorage.getItems(),
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
