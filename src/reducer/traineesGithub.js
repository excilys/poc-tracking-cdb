import * as Immutable from 'immutable';
import axios from 'axios';

/**
 * Created by charles on 11/12/16.
 */

const prefix                    = '@@traineesGithub';
const GET_FIRSTS_INFOS   = prefix + '/GET_FIRSTS_INFOS';
const emptyState = {};

export default function traineesGithub(state = Immutable.fromJS(emptyState), action) {
    switch (action.type) {
        case GET_FIRSTS_INFOS:
            state[action.payload.pseudo]['infos'] = SelectFirstInfos(action.payload.infos);
            return state;
            break;
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

const SelectFirstInfos = (data) => {
    let infos = {};
    infos.owner = data.owner;
    infos.git_tags_url = data.git_tags_url;
    infos.trees_url = data.trees_url;
    infos.updated_at = data.updated_at;
    return infos;
};
