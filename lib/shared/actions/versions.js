import {versions as actionTypes} from 'actions';
import {notification} from 'antd';
import {mutation} from 'relate-js';

export function addVersion(fragments, data) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                addVersion: fragments.versions
            },
            variables: {
                addVersion: {
                    data: {
                        value: data,
                        type: 'VERSION_CREATE_TYPE!'
                    }
                }
            }
        }, (result) => {
            if (result.addVersion) {
                notification.success({description: '添加版本成功'})
                dispatch({
                    type: actionTypes.addSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.addError
                })
                notification.error({description: '添加版本失败'})
            }
        })(dispatch, getState);
    };
}

export function removeVersion (id) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                removeVersion: {
                    _id: 1
                }
            },
            variables: {
                removeVersion: {
                    id: {
                        value: id,
                        type: 'ID!'
                    }
                }
            },
            type: 'REMOVE'
        }, () => {
            dispatch({
                type: actionTypes.addSuccess
            });
        })(dispatch, getState);
    };
}
