import React, {PropTypes} from 'react';
import {dataConnect} from 'relate-js';
import {bindActionCreators} from 'redux';
import * as administratorsActions from 'actions/administrators';
import Personal from './components';

@dataConnect(
    (state) => ({states: state.administrators}),
    (dispatch) => ({
        actions : bindActionCreators(administratorsActions, dispatch)
    }),
    (props) => ({
        fragments: Personal.fragments
    })
)
export default class PersonalContainer extends React.Component {
    render () {
        return (
            <Personal {...this.props}/>
        );
    }
}
