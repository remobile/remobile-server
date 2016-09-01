import {tasks as actionTypes} from 'actions';
import {notification} from 'antd';
import {mutation} from 'relate-js';

export function addTask(data, fragments) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                addTask: fragments
            },
            variables: {
                addTask: {
                    data: {
                        value: data,
                        type: 'taskInputType!'
                    }
                }
            }
        }, (result) => {
            if (result.addTask) {
                notification.success({description: '添加任务成功'})
                dispatch({
                    type: actionTypes.addSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.addError
                })
                notification.error({description: '添加任务失败'})
            }
        })(dispatch, getState);
    };
}
