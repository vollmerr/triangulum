import React from 'react';
import { shallow } from 'enzyme';

import Header from '../Header';

let wrapper;
describe('App', () => {
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
