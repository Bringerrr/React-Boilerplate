import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { IntlProvider } from 'react-intl';

import 'semantic-ui-css/semantic.min.css';

import './index.scss';
import store from './state/store';
import App from './App';
import history from './state/history';

ReactDOM.render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </IntlProvider>,
  document.getElementById('root'),
);
