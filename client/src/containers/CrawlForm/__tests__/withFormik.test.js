import schema from '../schema';
import * as withFormik from '../withFormik';


const values = {
  url: 'http://google.com',
  type: 'bfs',
  limit: 10,
  keyword: 'testing',
};

const formikBag = {
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  props: {
    onRequest: jest.fn(),
    onSuccess: jest.fn(),
    onFailure: jest.fn(),
  },
};

const response = { k1: 'v1' };

const mockFetch = async () => ({
  json: async () => response,
});

let result;
describe('withFormik', () => {
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  describe('validationSchema', () => {
    it('should not throw an error for valid values', () => {
      result = withFormik.validationSchema.validateSync(values);
      expect(result).toBeTruthy();
    });

    it('should not throw an error for valid values', () => {
      try {
        withFormik.validationSchema.validateSync({
          ...values,
          type: '',
        });
      } catch (err) {
        result = err;
      }

      expect(result).toBeDefined();
    });
  });

  describe('mapPropsToValues', () => {
    it('should contain all the keys in the schema', () => {
      const formKeys = Object.keys(withFormik.mapPropsToValues());
      const schemaKeys = Object.keys(schema);
      expect(formKeys).toEqual(schemaKeys);
    });
  });

  describe('handleSubmit', () => {
    it('should clear the status and set as not submitting once completed', async () => {
      await withFormik.handleSubmit(values, formikBag);
      expect(formikBag.setStatus).toBeCalledWith(null);
      expect(formikBag.setSubmitting).toBeCalledWith(false);
    });

    it('should call the request and success handlers', async () => {
      await withFormik.handleSubmit(values, formikBag);
      expect(formikBag.props.onRequest).toBeCalledWith({ request: values });
      expect(formikBag.props.onSuccess).toBeCalledWith({ response });
    });

    it('should call the failure handler and set a `submissionError` on error', async () => {
      const error = new Error('test errorz!');
      global.fetch = () => { throw error; };
      await withFormik.handleSubmit(values, formikBag);
      expect(formikBag.props.onFailure).toBeCalledWith({ error });
      expect(formikBag.setStatus).toBeCalledWith('submissionError');
    });
  });
});
