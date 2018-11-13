import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import * as historyStorage from '../../../utils/historyStorage';

import routes from '../routes';
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

  describe('initHistory', () => {
    it('should initalize the history', () => {
      historyStorage.init = jest.fn();
      instance.initHistory();
      expect(historyStorage.init).toBeCalled();
    });

    it('should update the apps data with the current crawl history', () => {
      historyStorage.newItem();
      instance.initHistory();
      expect(wrapper.state('data')).toEqual(historyStorage.getCurrent());
    });
  });

  describe('getRoutes', () => {
    it('should render all the routes', () => {
      // times 2 due to mobile + desktop
      expect(wrapper.find(Route).length).toEqual(routes.length * 2);
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
