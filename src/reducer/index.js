import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import gitList from './gitList';

const reducers = combineReducers({
    routing : routerReducer,
    gitList
});

export default reducers;