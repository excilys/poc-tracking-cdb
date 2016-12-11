import * as Immutable from 'immutable';

/**
 * Created by charles on 11/12/16.
 */

const emptyState = {};

export default function traineesGithub(state = Immutable.fromJS(emptyState), action) {
    switch (action.type) {
        default:
            return state;
    }
}
