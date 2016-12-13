import * as Immutable from 'immutable';
import axios from 'axios';

/**
 * Created by charles on 11/12/16.
 */

const prefix = '@@traineesGithub';
const GET_FIRSTS_INFOS = prefix + '/GET_FIRSTS_INFOS';
const GET_COMMIT_LIST = prefix + '/GET_COMMIT_LIST';
const POPULATE_COMMIT_INFO = prefix + 'POPULATE_COMMIT_INFO';

const emptyState = {};

export default function traineesGithub(state = Immutable.fromJS(emptyState), action) {
    switch (action.type) {
        case GET_FIRSTS_INFOS:
            state[action.payload.pseudo]['infos'] = SelectFirstInfos(action.payload.infos);
            return state;
        case GET_COMMIT_LIST:
            state[action.payload.pseudo]['commitList'] = action.payload.commits;
            return state;
        case POPULATE_COMMIT_INFO:
            state[action.payload.pseudo]['commitList'][action.payload.commitNumber] = action.payload.infos;
            return state;
        default:
            return state;
    }
}

export function getInfos(pseudo, infos) {
    return {
        type: GET_FIRSTS_INFOS,
        payload: {pseudo, infos}
    };
}

export function getCommitList(pseudo, commits) {
    return {
        type: GET_COMMIT_LIST,
        payload: {pseudo, commits}
    };
}

export function PopulateCommitInfos(pseudo, infos, commitNumber) {
    return {
        type: POPULATE_COMMIT_INFO,
        payload: {pseudo, infos, commitNumber}
    };
}

export function fetchFirstInfos(pseudo, repo) {
    return dispatch => {
        let url = 'https://api.github.com/repos/' + pseudo + '/' + repo;
        axios.get(url).then(response => {
            dispatch(getInfos(pseudo, response.data));
        }).catch(function (error) {
            window.console.log(error);
        });
    };
}

export function fetchCommitList(pseudo, repo) {
    return dispatch => {
        let url = 'https://api.github.com/repos/' + pseudo + '/' + repo + '/commits';
        axios.get(url).then(response => {
            dispatch(getCommitList(pseudo, response.data));
            let commitNumber = 0;
            response.data.forEach((commit) => {
                dispatch(populateCommitInfo(pseudo, commitNumber, commit.url));
                commitNumber++;
            })
        }).catch(function (error) {
            window.console.log(error);
        });
    };
}

export function populateCommitInfo(pseudo, commitNumber, url) {
    return dispatch => {
        axios.get(url).then(response => {
            dispatch(PopulateCommitInfos(pseudo, response.data, commitNumber));
        }).catch(function (error) {
            window.console.log(error);
        });
    };
}

const SelectFirstInfos = (data) => {
    let infos = {};
    infos.owner = data.owner;
    infos.git_tags_url = data.git_tags_url;
    infos.trees_url = data.trees_url;
    infos.updated_at = data.updated_at;
    return infos;
};
