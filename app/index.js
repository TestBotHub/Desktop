import React from 'react';
import { render } from 'react-dom';
// import { hashHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
// import { syncHistoryWithStore } from 'react-router-redux';
import Root from './container/Root';
import configureStore from './store/configureStore';

const store = configureStore();
// const history = syncHistoryWithStore(hashHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
