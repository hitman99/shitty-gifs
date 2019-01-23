import "regenerator-runtime/runtime";

import 'semantic-ui-css/semantic.min.css'
import 'styles/style.css'

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
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas.rootSaga);
const action = type => store.dispatch({type});

render(
    <Provider store={store}>
        <Router>
            <Route
                path="/"
                render={props => <App {...props}
                                      fetchImages={() => action('fetch_images')}
                />}
            />
        </Router>
    </Provider>,
    document.getElementById('react-root'));