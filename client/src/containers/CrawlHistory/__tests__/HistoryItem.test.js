import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'semantic-ui-react';

import HistoryItem from '../HistoryItem';

const props = {
  updated: new Date('2018-01-02'),
  request: {
    url: 'http://test.com',
    type: 'bfs',
    limit: 100,
    keyword: 'test keyword',
  },
};

let wrapper;
describe('HistoryItem', () => {
  beforeEach(() => {
    wrapper = shallow(<HistoryItem {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render not a keyword if none provided', () => {
    wrapper.setProps({ request: { ...props.request, keyword: null } });
    const keywordNode = wrapper
      .find(List.Description)
      .findWhere(x => x.text().match(/Keyword/));
    expect(keywordNode.length).toEqual(0);
  });
});
