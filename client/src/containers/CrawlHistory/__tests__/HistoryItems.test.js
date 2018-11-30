import React from 'react';
import { shallow } from 'enzyme';
import { Header } from 'semantic-ui-react';

import EmptyMessage from '../../../components/Message/EmptyMessage';
import HistoryItem from '../HistoryItem';
import HistoryItems from '../HistoryItems';

const props = {
  items: {
    id1: { k1: 'v1', k2: 'v2' },
    id2: { k3: 'v3', k4: 'v4' },
  },
};

let wrapper;
describe('HistoryItem', () => {
  beforeEach(() => {
    wrapper = shallow(<HistoryItems {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a `HistoryItem` for each item', () => {
    const numItems = Object.keys(props.items).length;
    expect(wrapper.find(HistoryItem).length).toEqual(numItems);
  });

  it('should render a message if no history', () => {
    wrapper.setProps({ items: {} });
    expect(wrapper.find(EmptyMessage).length).toEqual(1);
  });
});
