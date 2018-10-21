import React from 'react';
import { List, Header } from 'semantic-ui-react';

import HistoryItem from './HistoryItem';

const HistoryItems = ({ items }) => {
  const keys = Object.keys(items);

  // No history message
  if (!keys.length) {
    const props = {
      as: 'h3',
      textAlign: 'center',
      color: 'violet',
      content: 'No History :(',
      style: { padding: '50px 0' },
    };

    return (
      <Header {...props} />
    );
  }

  return (
    <List divided verticalAlign='middle'>
      {
        keys.map(x => (
          <HistoryItem key={x} {...items[x]} />
        ))
      }
    </List>
  );
};

export default HistoryItems;
