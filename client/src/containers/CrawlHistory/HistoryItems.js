import React from 'react';
import { List } from 'semantic-ui-react';

import EmptyMessage from '../../components/Message/EmptyMessage';
import HistoryItem from './HistoryItem';

const HistoryItems = ({ items, onClick }) => {
  const keys = Object.keys(items);

  // No history message
  if (!keys.length) {
    return (
      <EmptyMessage message={'No History :('} />
    );
  }

  return (
    <List selection divided verticalAlign='middle'>
      {
        keys.map(x => (
          <HistoryItem key={x} {...items[x]} onClick={onClick} />
        ))
      }
    </List>
  );
};

export default HistoryItems;
