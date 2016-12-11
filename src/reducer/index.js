import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import gitList from './gitList';
import traineesGithub from './traineesGithub'

const reducers = combineReducers({
    routing : routerReducer,
    gitList,
    traineesGithub
});

export default reducers;