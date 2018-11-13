import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'semantic-ui-react';

import * as historyStorage from '../../../utils/historyStorage';

import { CrawlHistory } from '../index';

const props = {
  updateData: jest.fn(),
  history: {
    push: jest.fn(),
  },
};

let wrapper;
let instance;
let id;
describe('CrawlHistory', () => {
  beforeEach(() => {
    wrapper = shallow(<CrawlHistory {...props} />);
    instance = wrapper.instance();
    id = historyStorage.newItem();
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
      localStorage.clear();
      instance.loadItems();
      expect(instance.state.items).toEqual({});
    });
  });

  describe('onReset', () => {
    it('should reset the history', () => {
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

  describe('onClick', () => {
    it('should update the graphs data', () => {
      instance.onClick(null, { id });
      const data = historyStorage.getItem({ id });
      expect(props.updateData).toBeCalledWith({ data });
    });

    it('should redirect to the graph page', () => {
      instance.onClick(null, { id });
      expect(props.history.push).toBeCalledWith('/graph');
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
