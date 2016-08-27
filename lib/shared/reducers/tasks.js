import {tasks as actionTypes} from 'actions';

const defaultState = {
    waiting: false,
};

export default function taskReducer (state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.showWaiting: {
            return Object.assign({}, state, {
                waiting: true,
            })
        }
        case actionTypes.addSuccess: {
            return Object.assign({}, state, {
                waiting: false,
            })
        }
        case actionTypes.addError: {
            return Object.assign({}, state, {
                waiting: false,
            })
        }
        default: {
            return state;
        }
    }
}
