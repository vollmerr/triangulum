import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import routes from './routes';

export const Links = ({ path, onClick }) => (
  routes.map(route => (
    <Menu.Item
      key={route.key}
      icon={route.icon}
      content={route.name}
      as={Link}
      to={route.path}
      active={path === route.path}
      onClick={onClick}
    />
  ))
);

export class MobileContainer extends Component {
  state = {}

  closeMenu = () => {
    const { isMenuOpen } = this.state;
    if (isMenuOpen) {
      this.setState({ isMenuOpen: false });
    }
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  render() {
    const { children, location } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth} id={'mobile-view'}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='overlay' vertical visible={isMenuOpen} direction={'right'}>
            <Links path={location.pathname} onClick={this.closeMenu} />
          </Sidebar>

          <Sidebar.Pusher
            dimmed={isMenuOpen}
            onClick={this.closeMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 40, padding: '1em 0em', margin: '0 0 1.5em 0' }}
              color={'violet'}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary fixed='top'>
                  <Menu.Item
                    icon={'sitemap'}
                    style={{ transform: 'rotate(0.5turn)' }}
                    as={Link}
                    to={'/'}
                  />
                  <Menu.Item onClick={this.toggleMenu} position='right'>
                    <Icon name='sidebar' data-cy='button-menu' />
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

export default withRouter(MobileContainer);
