import {administrators as actionTypes} from 'actions';

const defaultState = {
    modalVisile: false,
    removeOpened: false,
    waiting: false,
    isEdit: false,
    selectedAdministrator: null,
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
            })
        }
        case actionTypes.closeModal: {
            return Object.assign({}, state, {
                modalVisile: false,
                waiting: false,
                isEdit: false,
            })
        }
        case actionTypes.showWaiting: {
            return Object.assign({}, state, {
                waiting: true,
            })
        }
        case actionTypes.setSelectedAdministrator: {
            return Object.assign({}, state, {
                selectedAdministrator: action.selectedAdministrator,
            })
        }
        case actionTypes.openRemove: {
            return Object.assign({}, state, {
                removeOpened: true,
            })
        }
        case actionTypes.clearRemove: {
            return Object.assign({}, state, {
                removeOpened: false,
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
                selectedAdministrator: null,
                isEdit: false,
                isSelfEditing: false,
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
                selectedAdministrator: null,
            })
        }
        case actionTypes.startEditPersonalInfo: {
            return Object.assign({}, state, {
                isSelfEditing: true,
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
