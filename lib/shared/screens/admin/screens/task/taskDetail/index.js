import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as taskActions from 'actions/tasks';
import TaskDetail from './components';

@dataConnect(
    (state) => {console.log("===", state);return ({states: state.task, taskId: state.router.location.state.id})},
    (dispatch) => ({
        actions : bindActionCreators(taskActions, dispatch)
    }),
    (props) => ({
        fragments: TaskDetail.fragments,
        variablesTypes: {
            task: {
                id: 'ID!'
            }
        },
        initialVariables: {
            task: {
                id: props.taskId
            }
        }
    })
)
export default class TaskDetailContainer extends React.Component {
    render () {
        return (
            <TaskDetail {...this.props}/>
        );
    }
}
