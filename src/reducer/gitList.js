import axios from 'axios';
import * as Immutable from 'immutable';

const prefix                    = '@@gitList';
const SET_REPOS   = prefix + '/SET_REPOS';

const emptyState = {};

export default function gitList(state = Immutable.fromJS(emptyState), action) {
    switch (action.type) {
        case SET_REPOS:
        default:
            return state;
    }
}

export function setRepos(repos) {
    return {
        type: SET_REPOS,
        payload: repos
    };
}

export function fetchRepos() {
    window.console.log("je passe ici");
    return dispatch => {
        axios.get('https://api.github.com/orgs/excilys/repos').then(response => {
            dispatch(setRepos(response.data));
        }).catch(function (error) {
            window.console.log(error);
        });
    };
}