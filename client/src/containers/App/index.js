import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import * as historyStorage from '../../utils/historyStorage';
import routes from './routes';
import MobileContainer from './MobileContainer';
import DesktopContainer from './DesktopContainer';

// load our websocket
import '../../utils/socket';

/**
 * main application container that handles:
 *  - routing bewteen containers
 *  - tranfering data to pages
 */
class App extends React.PureComponent {
  state = {
    data: {
      response: {
        nodes: [],
      },
    },
  }

  componentDidMount() {
    this.initHistory();
  }

  initHistory = () => {
    historyStorage.init();
    const data = historyStorage.getCurrent();
    this.setState({ data });
  }

  getRoutes = () => {
    const { data } = this.state;
    const props = {
      data,
      updateData: this.updateData,
    };

    return routes.map(route => (
      <Route
        key={route.key}
        exact={route.exact}
        path={route.path}
        component={() => <route.component {...props} />}
      />
    ));
  }

  updateData = ({ data }) => {
    historyStorage.setCurrent({ id: data.id });
    this.setState({ data });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <MobileContainer>
            {this.getRoutes()}
          </MobileContainer>
          <DesktopContainer>
            {this.getRoutes()}
          </DesktopContainer>
        </div>
      </HashRouter>
    );
  }
}

export default App;
