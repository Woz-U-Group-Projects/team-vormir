import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import 'semantic-ui-css/semantic.min.css';
import Root from './containers/Root';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

Sentry.init({dsn: "https://14869c71c4cb4455a46dd282bb215548@sentry.io/1796952"});



const store = configureStore();
const history = createBrowserHistory();
ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}

