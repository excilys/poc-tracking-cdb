import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from 'redux';
import reducers from "./reducer";
import App from './container/App';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';


const configureStore = () => {
    const middlewares = [thunk];//, routerMiddleware(browserHistory)];
    const state = {};
    return createStore(reducers, state, applyMiddleware(...middlewares));
};

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </Provider>), document.getElementById('root')
);