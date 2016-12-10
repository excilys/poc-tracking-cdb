import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import gitList from './gitList';

export const reducers = combineReducers({
    routing,
    gitList
});