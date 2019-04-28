import React from 'react';
import ReactDOM from 'react-dom'; //allows us render react components into the DOM
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/index';
import {createLogger} from 'redux-logger';
import rootSaga from '../sagas'
import createSagaMiddleware from 'redux-saga';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import App from './components/app/app.container';
import CurrencyConverter from './components/pages/currencyconverter/currencyconverter.container';
import './index.scss';

//create your sagas for yielding API calls before sending to reducers
const sagas = createSagaMiddleware();

//create your browser history
const history = createBrowserHistory();

const store = createStore(
    reducer(history),
    applyMiddleware(
        routerMiddleware(history),
        createLogger(), 
        sagas
    )
);

sagas.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App>
                <Route exact path="/" component={CurrencyConverter} />
            </App>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);