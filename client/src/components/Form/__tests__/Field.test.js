import React from 'react';
import { shallow } from 'enzyme';

import Field from '../Field';

const formikProps = {
  values: {
    k1: 'v1',
  },
  touched: {},
  errors: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  isSubmitting: false,
};

const field = {
  name: 'k1',
  options: [
    { value: 'o1', text: 'option 1' },
    { value: 'o2', text: 'option 2' },
  ],
};

const props = {
  formikProps,
  field,
  'data-cy': 'field-test',
};

let wrapper;
let FormField;
describe('FormikForm', () => {
  beforeEach(() => {
    wrapper = shallow(<Field {...props} />);
    FormField = wrapper.first();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass an error if error is set and touched', () => {
    wrapper.setProps({
      formikProps: {
        ...props.formikProps,
        errors: { k1: 'k1 error' },
        touched: { k1: true },
      },
    });
    const error = wrapper.first().prop('error');
    expect(error).toBeTruthy();
  });

  describe('single value fields', () => {
    beforeEach(() => {
      wrapper.setProps({ field: { ...field, options: null } });
      FormField = wrapper.first();
    });

    it('should map the `onChange` correctly', () => {
      FormField.prop('onChange')('v2');
      expect(formikProps.handleChange).toBeCalledWith('v2');
    });

    it('should map the `onBlur` correctly', () => {
      FormField.prop('onBlur')();
      expect(formikProps.handleBlur).toBeCalled();
    });
  });

  describe('multi value fields', () => {
    it('should map the options correctly', () => {
      const options = FormField.prop('options');
      expect(options.length).toBe(field.options.length);
      expect(options[0].name).toBe(field.name);
      expect(options[0].value).toBe(field.options[0].value);
    });

    it('should map the `onChange` correctly', () => {
      const option = field.options[1];
      FormField.prop('onChange')(null, option);
      expect(formikProps.setFieldValue).toBeCalledWith(field.name, option.value);
    });

    it('should map the `onBlur` correctly', () => {
      FormField.prop('onBlur')();
      expect(formikProps.setFieldTouched).toBeCalledWith(field.name, true);
    });
  });
});
