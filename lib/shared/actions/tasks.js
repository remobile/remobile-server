import {tasks as actionTypes} from 'actions';
import {mutation} from 'relate-js';

export function addTask(fragments, data) {
    console.log(fragments, data, "===");
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                addTask: fragments.tasks
            },
            variables: {
                addTask: {
                    data: {
                        value: data,
                        type: 'TASK_CREATE_TYPE!'
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
