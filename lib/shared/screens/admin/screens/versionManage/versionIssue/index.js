import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as versionsActions from 'actions/versions';
import VersionIssue from './components';

@dataConnect(
    (state) => ({states: state.versions}),
    (dispatch) => ({
        actions : bindActionCreators(versionsActions, dispatch)
    }),
    (props) => ({
    })
)
export default class VersionIssueContainer extends React.Component {
    render () {
        return (
            <VersionIssue {...this.props}/>
        );
    }
}
