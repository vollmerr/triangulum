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
    handleSubmit: jest.fn(),
  },
};

let result;
describe('withFormik', () => {
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
    it('should call the `handleSubmit` function properly', () => {
      withFormik.handleSubmit(values, formikBag);
      expect(formikBag.props.handleSubmit).toBeCalledWith({ values, bag: formikBag });
    });
  });
});
