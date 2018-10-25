import React from 'react';
import { shallow } from 'enzyme';

import { FormikForm } from '../FormikForm';

const props = {
  handleSubmit: jest.fn(),
  isSubmitting: false,
};

let wrapper;
describe('FormikForm', () => {
  beforeEach(() => {
    wrapper = shallow(<FormikForm {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
