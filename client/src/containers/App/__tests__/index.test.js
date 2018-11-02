import React from 'react';
import { shallow } from 'enzyme';

import * as historyStorage from '../../../utils/historyStorage';

import App from '../index';

const data = { k1: 'v1' };

let wrapper;
let instance;
describe('App', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });

  describe('componentDidMount', () => {
    it('should initalize the history on mount if it doesn`t exist', () => {
      instance.componentDidMount();
      expect(historyStorage.getItems()).toEqual({});
    });
  });

  describe('updateData', () => {
    it('should update the local data', () => {
      instance.updateData({ data });
      expect(instance.state.data).toEqual(data);
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
