import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
} from 'semantic-ui-react';

import routes from './routes';

export const Logo = () => (
  <Menu.Item as={Link} to={'/'}>
    <Icon name={'sitemap'} style={{ transform: 'rotate(0.5turn)' }} />
    <span>riangulum</span>
  </Menu.Item>
);

export const Links = ({ path }) => (
  routes.map(route => (
    <Menu.Item
      key={route.key}
      icon={route.icon}
      content={route.name}
      as={Link}
      to={route.path}
      active={path === route.path}
    />
  ))
);

export class DesktopContainer extends Component {
  state = {}

  render() {
    const { children, location } = this.props;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth} id={'desktop-view'}>

        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: 40, padding: '1em 0em', margin: '0 0 2em 0' }}
          color={'violet'}
          vertical
        >
          <Container>
            <Menu
              fixed={'top'}
              inverted
              pointing
              secondary
              color={'violet'}
            >
              <Logo />
              <Menu.Item position={'right'} />
              <Links path={location.pathname} />
            </Menu>
          </Container>
        </Segment>

        {children}
      </Responsive>
    );
  }
}

export default withRouter(DesktopContainer);
