import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as versionsActions from 'actions/versions';
import VersionList from './components';

@dataConnect(
    (state) => ({states: state.versions}),
    (dispatch) => ({
        actions : bindActionCreators(versionsActions, dispatch)
    }),
    (props) => ({
        fragments: VersionList.fragments
    })
)

export default class VersionListContainer extends React.Component {
    render () {
        return (
            <VersionList {...this.props}/>
        );
    }
}
