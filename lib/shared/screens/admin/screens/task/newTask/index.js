import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as taskActions from 'actions/tasks';
import NewTask from './components';

@dataConnect(
    (state) => ({states: state.tasks}),
    (dispatch) => ({
        actions : bindActionCreators(taskActions, dispatch)
    }),
    (props) => ({
    })
)
export default class NewTaskContainer extends React.Component {
    render () {
        return (
            <NewTask {...this.props}/>
        );
    }
}
