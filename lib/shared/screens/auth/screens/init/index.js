import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addAdministrator} from 'actions/administrators';

import AdminInit from './components/init';

@connect(
    () => ({}),
    (dispatch) => bindActionCreators({addAdministrator}, dispatch)
)
export default class Init extends React.Component {
    static propTypes = {
        addAdministrator: PropTypes.func.isRequired
    };
    constructor(props, context) {
        super(props, context);
    }
    onSubmit(administrator) {
        this.props
        .addAdministrator({
            administrators: {
                _id: 1
            }
        }, {
            ...administrator,
        })
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
