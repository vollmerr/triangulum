import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';

import routes from '../routes';
import { MobileContainer, Links } from '../MobileContainer';

let wrapper;
let instance;
const props = {
  location: {
    pathname: '/test-path',
  },
};
const Child = () => <div>children...</div>;

describe('Links', () => {
  it('should map all the routes as menu items', () => {
    wrapper = shallow(<Links />);
    const items = wrapper.find(Menu.Item);
    expect(items.length).toEqual(routes.length);
  });
});

describe('MobileContainer', () => {
  beforeEach(() => {
    wrapper = shallow((
      <MobileContainer {...props}>
        <Child />
      </MobileContainer>
    ));
    instance = wrapper.instance();
  });

  describe('closeMenu', () => {
    it('should close the menu if it is open', () => {
      wrapper.setState({ isMenuOpen: true });
      instance.closeMenu();
      expect(wrapper.state('isMenuOpen')).toBeFalsy();
    });

    it('should do nothing if the menu is not open', () => {
      wrapper.setState({ isMenuOpen: false });
      instance.closeMenu();
      expect(wrapper.state('isMenuOpen')).toBeFalsy();
    });
  });

  describe('toggleMenu', () => {
    it('should toggle the menu from false to true', () => {
      wrapper.setState({ isMenuOpen: true });
      instance.toggleMenu();
      expect(wrapper.state('isMenuOpen')).toBeFalsy();
    });

    it('should toggle the menu from true to false', () => {
      wrapper.setState({ isMenuOpen: false });
      instance.toggleMenu();
      expect(wrapper.state('isMenuOpen')).toBeTruthy();
    });
  });

  describe('render', () => {
    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the chidlren', () => {
      expect(wrapper.find(Child).length).toEqual(1);
    });
  });
});
