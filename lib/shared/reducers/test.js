import {tests as actionTypes} from 'actions';
import { notification } from 'antd';

export const defaultState = {
    waiting: false,
    name: '',
    removeId: null,
};

export default function testReducer (state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.changeName: {
            return Object.assign({}, state, {
                [action.property]: action.value,
            });
        }
        case actionTypes.testShowWaiting: {
            return Object.assign({}, state, {
                waiting: true
            });
        }
        case actionTypes.testHideWaiting: {
            return Object.assign({}, defaultState);
        }
        case actionTypes.addNameError: {
            notification.open({
                message: '错误',
                description: '添加失败',
            });
            return Object.assign({}, defaultState);
        }
        default: {
            return state;
        }
    }
}
