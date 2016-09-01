import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as administratorActions from 'actions/administrators';
import {registerAdministrator} from 'actions/administrators';

import AdminInit from './components/init';

@connect(
    () => ({}),
    (dispatch) => ({
        actions : bindActionCreators(administratorActions, dispatch)
    }),
)
export default class Init extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onSubmit(administrator) {
        this.props.actions.registerAdministrator(administrator, {id:1})
        .then(() => {
            window.location = '/admin/login';
        })
        .done();
    }
    render() {
        return (
            <AdminInit
                {...this.props}
                onSubmit={::this.onSubmit}
                />
        );
    }
}
