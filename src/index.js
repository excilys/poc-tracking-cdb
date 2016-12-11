import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from './container/App';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from "./store/configureStore.dev"

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