import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as tasksActions from 'actions/tasks';
import AllTasks from './components';

@dataConnect(
    (state) => ({states: state.tasks}),
    (dispatch) => ({
        actions : bindActionCreators(tasksActions, dispatch)
    }),
    (props) => ({
        fragments: AllTasks.fragments
    })
)
export default class AllTasksContainer extends React.Component {
    render () {
        return (
            <AllTasks {...this.props} />
        );
    }
}
