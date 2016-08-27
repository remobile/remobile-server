import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {rootDataConnect, dataConnect} from 'relate-js';
import {updateNavPath} from 'actions/common';
import Admin from './components';

@rootDataConnect()
@dataConnect(
    (state) => ({
        navpath: state.common.navpath
    }),
    (dispatch) => bindActionCreators({
        updateNavPath,
    }, dispatch),
    (props) => ({
        fragments: Admin.fragments
    })
)
export default class AdminContainer extends React.Component {
    render () {
        return (
            <Admin {...this.props}>
                {this.props.children}
            </Admin>
        );
    }
}
