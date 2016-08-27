import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {dataConnect} from 'relate-js';

import {changeName, addName, removeName} from 'actions/tests';
import Tests from './components';

@dataConnect(
    (state) => ({
        waiting: state.test.waiting,
        name: state.test.name,
        removeId: state.test.removeId
    }),
    (dispatch) => bindActionCreators({
      changeName,
      addName,
      removeName,
    }, dispatch),
    (props) => ({
        fragments: Tests.fragments,
        mutations: {
            addName: [{
                type: 'APPEND',
                field: 'tests'
            }]
        }
    })
)

export default class TestContainer extends React.Component {
    static defaultProps = {
        tests: []
    };
    static propTypes = {
        tests: PropTypes.array.isRequired,
    };
    render () {
        const {
            tests,
            name,
            waiting,
            changeName,
            addName,
            removeName,
        } = this.props;
        return (
            <Tests
                tests={tests}
                name={name}
                waiting={waiting}
                changeName={changeName}
                addName={addName}
                removeName={removeName}
                >
            </Tests>
        );
    }
}
