import React from 'react';
import { List } from 'semantic-ui-react';

import HistoryItem from './HistoryItem';

const HistoryItems = ({ items }) => (
  <List divided verticalAlign='middle'>
    {
      Object.keys(items).map(x => (
        <HistoryItem key={x} {...items[x]} />
      ))
    }
  </List>
);

export default HistoryItems;
