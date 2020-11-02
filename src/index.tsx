import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Tracker from './containers/components/Tracker';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/fr';
import store from './store';

import './assets/scss/index.scss';

moment.locale('fr');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <Tracker />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
