import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as administratorsActions from 'actions/administrators';
import Administrators from './components';

@dataConnect(
    (state) => ({states: state.administrators}),
    (dispatch) => ({
        actions : bindActionCreators(administratorsActions, dispatch)
    }),
    (props) => ({
        fragments: Administrators.fragments,
        mutations: {
            registerAdministrator: [{
                type: 'APPEND',
                field: 'getAdministratorList'
            }]
        }
    })
)
export default class AdministratorsContainer extends React.Component {
    render () {
        return (
            <Administrators {...this.props} />
        );
    }
}
