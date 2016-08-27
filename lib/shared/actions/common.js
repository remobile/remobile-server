import {common as actionTypes} from 'actions';
import {push} from 'redux-router';
import {mutation} from 'relate-js';

export function updateNavPath(navpath) {
    return {
        type: actionTypes.updateNavPath,
        navpath: navpath,
    }
}
