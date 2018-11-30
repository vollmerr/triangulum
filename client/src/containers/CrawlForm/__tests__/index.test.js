import React from 'react';
import { shallow } from 'enzyme';

import * as historyStorage from '../../../utils/historyStorage';
import ws from '../../../utils/socket';

import FormikForm from '../FormikForm';
import { CrawlForm } from '../index';

const request = { k1: 'v1' };
const response = { data: JSON.stringify({ k2: 'v2' }) };
const error = { message: 'test error' };
const bag = {
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
};

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
    id = wrapper.state('id');
    ws.OPEN = 1;
  });

  describe('handleSubmit', () => {
    beforeEach(() => {
      instance.onRequest = jest.fn();
      instance.onSuccess = jest.fn();
      instance.onFailure = jest.fn();
      instance.handleSubmit({ bag, values: request });
    });

    it('should clear the status of the form', () => {
      expect(bag.setStatus).toBeCalledWith(null);
    });

    it('should request the crawl', () => {
      expect(instance.onRequest).toBeCalledWith({ bag, request });
    });

    it('should set the ws.onmessage hook to the success handler', () => {
      ws.onmessage('test');
      expect(instance.onSuccess).toBeCalledWith({ bag, response: 'test' });
    });

    it('should set the ws.onerror hook to the error handler', () => {
      ws.onerror('test');
      expect(instance.onFailure).toBeCalledWith({ bag, error: 'test' });
    });

    it('should call the error handler if the ws is closed', () => {
      jest.resetAllMocks();
      ws.OPEN = 0;
      instance.handleSubmit({ bag, values: request });
      expect(instance.onFailure).toBeCalled();
    });
  });

  describe('onRequest', () => {
    beforeEach(() => {
      instance.onRequest({ request });
      id = wrapper.state('id');
    });

    it('should add a new history item with the request', () => {
      expect(id).toBeDefined();
      expect(historyStorage.getItem({ id }).request).toEqual(request);
    });

    it('should load a new ws if it is closed', () => {
      jest.resetAllMocks();
      ws.OPEN = 0;
      instance.onRequest({ request });
      expect(ws.init).toBeCalled();
    });

    it('should send the request to the ws', () => {
      expect(ws.send).toBeCalledWith(JSON.stringify(request));
    });
  });

  describe('onSuccess', () => {
    beforeEach(() => {
      instance.onSuccess({ response, bag });
    });

    it('should update the graphs data', () => {
      const data = historyStorage.getItem({ id });
      expect(props.updateData).toBeCalledWith({ data });
    });

    it('should update the history with the response', () => {
      expect(historyStorage.getItem({ id }).response).toEqual(JSON.parse(response.data));
    });

    it('should navigate to the graph', () => {
      expect(props.history.push).toBeCalledWith('/graph');
    });
  });

  describe('onFailure', () => {
    beforeEach(() => {
      instance.onFailure({ error, bag });
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
