import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from '../ErrorMessage';

const props = {
  errors: {
    errTouch: 'errTouch Error',
    errNoTouch: 'errNoTouch Error',
  },
  touched: {
    touch: true,
    errTouch: true,
    errNoTouch: false,
  },
  status: null,
  schema: {
    touch: {},
    errTouch: {},
    errNoTouch: {},
  },
};

let wrapper;
describe('FormikForm', () => {
  beforeEach(() => {
    wrapper = shallow(<ErrorMessage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render if no errors', () => {
    wrapper.setProps({ errors: {} });
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should render a submission error status', () => {
    wrapper.setProps({ status: 'submissionError' });
    const list = wrapper.first().prop('list');
    expect(list).toContain('Failed to Submit');
  });
});
