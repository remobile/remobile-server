import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as usersActions from 'actions/users';
import Users from './components';

@dataConnect(
    (state) => ({states: state.users}),
    (dispatch) => ({
        actions : bindActionCreators(usersActions, dispatch)
    }),
    (props) => ({
        fragments: Users.fragments
    })
)
export default class UsersContainer extends React.Component {
    render () {
        return (
            <Users {...this.props} />
        );
    }
}
