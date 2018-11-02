import React from 'react';
import { shallow } from 'enzyme';

import * as historyStorage from '../../../utils/historyStorage';

import FormikForm from '../FormikForm';
import { CrawlForm } from '../index';

const request = { k1: 'v1' };
const response = { k2: 'v2' };
const error = { message: 'test error' };

const props = {
  updateData: jest.fn(),
  history: {
    push: jest.fn(),
  },
};

let wrapper;
let instance;
let id;
describe('CrawlForm', () => {
  beforeEach(() => {
    historyStorage.reset();
    wrapper = shallow(<CrawlForm {...props} />);
    instance = wrapper.instance();
    instance.onRequest({ request });
    id = wrapper.state('id');
  });

  describe('onRequest', () => {
    it('should add a new history item with the request', () => {
      expect(id).toBeDefined();
      expect(historyStorage.getItem({ id }).request).toEqual(request);
    });
  });

  describe('onSuccess', () => {
    beforeEach(() => {
      instance.onSuccess({ response });
    });

    it('should update the graphs data', () => {
      expect(props.updateData).toBeCalledWith({ data: response });
    });

    it('should update the history with the response', () => {
      expect(historyStorage.getItem({ id }).response).toEqual(response);
    });

    it('should navigate to the graph', () => {
      expect(props.history.push).toBeCalledWith('/graph');
    });
  });

  describe('onFailure', () => {
    beforeEach(() => {
      instance.onFailure({ error });
    });

    it('should update the history with an error', () => {
      expect(historyStorage.getItem({ id }).error).toEqual(error);
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a `FormikForm`', () => {
      expect(wrapper.find(FormikForm).length).toEqual(1);
    });
  });
});
