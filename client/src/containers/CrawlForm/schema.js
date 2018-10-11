import { Form } from 'semantic-ui-react';

export default {
  url: {
    name: 'url',
    label: 'Start URL',
    placeholder: 'http://example.com',
    control: Form.Input,
  },
  type: {
    name: 'type',
    label: 'Search Type',
    placeholder: 'Select a Type',
    options: [
      { value: 'bfs', text: 'Breadth-first' },
      { value: 'dfs', text: 'Depth-first' },
    ],
    control: Form.Select,
  },
  limit: {
    name: 'limit',
    label: 'Limit',
    placeholder: 'Maximum Depth Limit',
    type: 'number',
    control: Form.Input,
  },
  keyword: {
    name: 'keyword',
    label: 'Keyword (optional)',
    placeholder: 'Word to search for',
    control: Form.Input,
  },
};
