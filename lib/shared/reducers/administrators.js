import {administrators as actionTypes} from 'actions';

const defaultState = {
    modalVisile: false,
    removeOpened: false,
    waiting: false,
    isEdit: false,
    isSelfEditing: false,
    passwordModalVisile: false,
};

export default function administratorReducer (state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.openModal: {
            return Object.assign({}, state, {
                modalVisile: true,
                waiting: false,
                isEdit: action.isEdit,
                isSelfEditing: false,
            })
        }
        case actionTypes.closeModal: {
            return Object.assign({}, state, {
                modalVisile: false,
                waiting: false,
            })
        }
        case actionTypes.showWaiting: {
            return Object.assign({}, state, {
                waiting: true,
            })
        }
        case actionTypes.addSuccess: {
            return Object.assign({}, state, {
                modalVisile: false,
                waiting: false,
            })
        }
        case actionTypes.addError: {
            return Object.assign({}, state, {
                waiting: false,
            })
        }
        case actionTypes.updateSuccess: {
            return Object.assign({}, state, {
                modalVisile: false,
                waiting: false,
                passwordModalVisile: false,
            })
        }
        case actionTypes.updateError: {
            return Object.assign({}, state, {
                waiting: false,
            })
        }
        case actionTypes.removeSuccess: {
            return Object.assign({}, state, {
                removeOpened: false,
            })
        }
        case actionTypes.startEditPersonalInfo: {
            return Object.assign({}, state, {
                isSelfEditing: true,
                isEdit: false,
            })
        }
        case actionTypes.stopEditPersonalInfo: {
            return Object.assign({}, state, {
                isSelfEditing: false,
            })
        }
        case actionTypes.openUpdatePasswordModal: {
            return Object.assign({}, state, {
                passwordModalVisile: true,
                waiting: false,
            })
        }
        case actionTypes.closeUpdatePasswordModal: {
            return Object.assign({}, state, {
                passwordModalVisile: false,
                waiting: false,
            })
        }
        default: {
            return state;
        }
    }
}
