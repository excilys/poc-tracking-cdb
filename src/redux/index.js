import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import gitList from './gitList';

export const reducers = combineReducers({
    routing : routerReducer,
    gitList
});