import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';

import routes from '../routes';
import { DesktopContainer, Logo, Links } from '../DesktopContainer';

let wrapper;
const props = {
  location: {
    pathname: '/test-path',
  },
};
const Child = () => <div>children...</div>;

describe('Logo', () => {
  it('should render correctly', () => {
    wrapper = shallow(<Logo />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Links', () => {
  it('should map all the routes as menu items', () => {
    wrapper = shallow(<Links />);
    const items = wrapper.find(Menu.Item);
    expect(items.length).toEqual(routes.length);
  });
});

describe('DesktopContainer', () => {
  beforeEach(() => {
    wrapper = shallow((
      <DesktopContainer {...props}>
        <Child />
      </DesktopContainer>
    ));
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
