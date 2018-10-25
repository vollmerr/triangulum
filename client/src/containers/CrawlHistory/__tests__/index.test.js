import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'semantic-ui-react';

import * as historyStorage from '../../../utils/historyStorage';

import CrawlHistory from '../index';

jest.spyOn(historyStorage, 'init');

let wrapper;
describe('CrawlHistory', () => {
  beforeEach(() => {
    wrapper = shallow(<CrawlHistory />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should initalize the history on mount if it doesn`t exist', () => {
    expect(historyStorage.init).toBeCalled();
  });

  it('should reset the history when the reset button is pressed', () => {
    historyStorage.newItem();
    wrapper.find(Button).simulate('click');
    const items = historyStorage.getItems();
    expect(items).toEqual({});
  });
});
