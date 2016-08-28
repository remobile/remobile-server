import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as tasksActions from 'actions/tasks';
import TaskList from './components';

@dataConnect(
    (state) => ({states: state.tasks}),
    (dispatch) => ({
        actions : bindActionCreators(tasksActions, dispatch)
    }),
    (props) => ({
        fragments: TaskList.fragments
    })
)
export default class TaskListContainer extends React.Component {
    render () {
        return (
            <TaskList {...this.props} />
        );
    }
}
