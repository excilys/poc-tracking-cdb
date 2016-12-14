import * as Immutable from 'immutable';
import axios from 'axios';
import * as utils from '../utils';
/**
 * Created by charles on 11/12/16.
 */

const prefix = '@@traineesGithub';
const GET_FIRSTS_INFOS = prefix + '/GET_FIRSTS_INFOS';
const GET_COMMIT_LIST = prefix + '/GET_COMMIT_LIST';
const GET_TAGS = prefix + '/GET_TAGS';
const POPULATE_COMMIT_INFO = prefix + 'POPULATE_COMMIT_INFO';

const emptyState = {};

function handleActions(state = Immutable.fromJS(emptyState), action) {
    switch (action.type) {
        case GET_FIRSTS_INFOS:
            state[action.payload.pseudo]['infos'] = SelectFirstInfos(action.payload.infos);
            return state;
        case GET_TAGS:
            state[action.payload.pseudo]['tags'] = action.payload.tags;
            return state;
        case GET_COMMIT_LIST:
            state[action.payload.pseudo]['commitList'] = action.payload.commits;
            state[action.payload.pseudo]['commitList_url'] = {};
            state[action.payload.pseudo]['commitList_url'].next = action.payload.nextUrl;
            state[action.payload.pseudo]['commitList_url'].end = action.payload.endUrl;
            return state;
        case POPULATE_COMMIT_INFO:
            state[action.payload.pseudo]['commitList'][action.payload.commitNumber] = action.payload.infos;
            return state;
        default:
            return state;
    }
}

export default function traineesGithub(state = {}, action) {
    return Object.assign({}, state, handleActions(state, action))
}

export function getInfos(pseudo, infos) {
    return {
        type: GET_FIRSTS_INFOS,
        payload: {pseudo, infos}
    };
}

export function getTags(pseudo, tags) {
    return {
        type: GET_TAGS,
        payload: {pseudo, tags}
    };
}

export function get30FirstCommit(pseudo, commits, nextUrl, endUrl) {
    return {
        type: GET_COMMIT_LIST,
        payload: {pseudo, commits, nextUrl, endUrl}
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

export function fetchTags(pseudo, repo) {
    return dispatch => {
        let url = 'https://api.github.com/repos/' + pseudo + '/' + repo +'/tags';
        axios.get(url).then(response => {
            dispatch(getTags(pseudo, response.data));
        }).catch(function (error) {
            window.console.log(error);
        });
    };
}

export function fetch30FirstCommit(pseudo, repo) {
    return dispatch => {
        let url = 'https://api.github.com/repos/' + pseudo + '/' + repo + '/commits';
        axios.get(url).then(response => {
            let nextUrl = '';
            let endUrl = '';
            if (response.headers.link !== undefined) {
                let link = response.headers.link.split(';');
                nextUrl = utils.cleanLink(link[0]);
                endUrl = utils.cleanLink(link[1]);
            }
            dispatch(get30FirstCommit(pseudo, response.data, nextUrl, endUrl));
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
