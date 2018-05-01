import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import store from './store';
import './styles/index.css';
import './styles/print.css';
import registerServiceWorker from './registerServiceWorker';

const history = syncHistoryWithStore(createBrowserHistory(), store);

class Root extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Route path="/" component={App} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
