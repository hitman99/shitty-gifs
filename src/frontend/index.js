import "regenerator-runtime/runtime";

import 'semantic-ui-css/semantic.min.css'
import 'styles/style.css'

import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import * as sagas from 'sagas'
import rootReducer from 'reducers'
import App from 'components/App'


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  , applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas.rootSaga);
const action = type => store.dispatch({type});

render(
    <Provider store={store}>
        <Router>
            <Route path="/" render={props => <App />} />
        </Router>
    </Provider>,
    document.getElementById('react-root'));