import {common as actionTypes} from 'actions';

export const defaultState = {
    navpath: [0],
};

export default function commonReducer (state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.updateNavPath: {
            return Object.assign({}, state, {
                navpath: action.navpath
            });
        }
        default: {
            return state;
        }
    }
}
