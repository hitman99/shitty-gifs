import "regenerator-runtime/runtime";

import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import * as sagas from 'sagas'
import rootReducer from 'reducers'
import App from 'components/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,/*composeEnhancers()*/applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas.rootSaga);

render(
  <Provider store={store}>
    <Router>
      <Route
        path="/"
        render={props => <App {...props}/> }
      />
    </Router>
  </Provider>,
  document.getElementById('react-root'));