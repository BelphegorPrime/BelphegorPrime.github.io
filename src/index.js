import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import './styles/index.css';
import './styles/print.css';
import Resume from './components/Resume';
import Blog from './components/Blog';

import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/blog" render={props => <Blog {...props} />} />
      <Route path="/" render={props => <Resume {...props} />} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
