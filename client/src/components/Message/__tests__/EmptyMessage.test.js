import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'semantic-ui-react';

import EmptyMessage from '../EmptyMessage';

const props = {
  message: 'test message',
};

let wrapper;
describe('EmptyMessage', () => {
  beforeEach(() => {
    wrapper = shallow(<EmptyMessage {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect on click', () => {
    window.location.hash = '#/wrong';
    wrapper.find(Button).simulate('click');
    expect(window.location.hash).toEqual('#/');
  });
});
