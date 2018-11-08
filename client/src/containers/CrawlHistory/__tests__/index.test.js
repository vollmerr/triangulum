import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'semantic-ui-react';

import * as historyStorage from '../../../utils/historyStorage';

import { CrawlHistory } from '../index';

let wrapper;
let instance;
describe('CrawlHistory', () => {
  beforeEach(() => {
    wrapper = shallow(<CrawlHistory />);
    instance = wrapper.instance();
  });

  describe('componentDidMount', () => {
    it('should load the history into state', () => {
      instance.loadItems = jest.fn();
      instance.componentDidMount();
      expect(instance.loadItems).toBeCalled();
    });
  });

  describe('loadItems', () => {
    it('should initalize the history and load into state', () => {
      instance.loadItems();
      expect(instance.state.items).toEqual({});
    });
  });

  describe('onReset', () => {
    it('should reset the history', () => {
      historyStorage.newItem();
      instance.loadItems();
      instance.onReset();
      expect(instance.state.items).toEqual({});
    });

    it('should force a re-render', () => {
      instance.forceUpdate = jest.fn();
      instance.onReset();
      expect(instance.forceUpdate).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should reset the history when the reset button is pressed', () => {
      historyStorage.newItem();
      instance.loadItems();
      wrapper.find(Button).simulate('click');
      const items = historyStorage.getItems();
      expect(items).toEqual({});
    });
  });
});
