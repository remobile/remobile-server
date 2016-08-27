import {administrators as actionTypes} from 'actions';
import {notification} from 'antd';
import {mutation} from 'relate-js';

export function updateUserStatus(id, status) {
    const statusText = status===1 ? '冻结' : '解冻';
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateUserStatus: 1,
            },
            variables: {
                updateUserStatus: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    state: {
                        value: state,
                        type: 'Int!'
                    }
                }
            }
        }, (result) => {
            if (result.updateUserStatus) {
                notification.success({description: statusText+'成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: statusText+'失败'})
            }
        })(dispatch, getState);
    };
}
