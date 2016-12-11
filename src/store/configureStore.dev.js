import thunk from "redux-thunk";
import {createStore, applyMiddleware} from 'redux';
import reducers from "../reducer";
import createLogger from 'redux-logger';
import InitialState from '../constants/traineesGithub.json'

/**
 * Created by charles on 11/12/16.
 */

const configureStore = () => {
    const middlewares = [thunk];//, routerMiddleware(browserHistory)];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    const state = getInitialState();
    return createStore(reducers, state, applyMiddleware(...middlewares));
};

const getInitialState =  () => {
    return InitialState;
};

export default configureStore;