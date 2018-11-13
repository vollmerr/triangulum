import React from 'react';
import { List } from 'semantic-ui-react';

const HistoryItem = ({ onClick, ...item }) => (
  <List.Item onClick={onClick} id={item.id}>
    <List.Content floated='right'>
      <List.Description>{new Date(item.updated).toUTCString()}</List.Description>
    </List.Content>
    <List.Content>
      <List.Header>{item.request.url}</List.Header>
      <List.Description>{`Type: ${item.request.type}`}</List.Description>
      <List.Description>{`Limit: ${item.request.limit}`}</List.Description>
      {
        item.request.keyword
        && <List.Description>{`Keyword: ${item.request.keyword}`}</List.Description>
      }
    </List.Content>
  </List.Item>
);

export default HistoryItem;
