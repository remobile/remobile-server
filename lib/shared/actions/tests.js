import {tests as actionTypes} from 'actions';
import {mutation} from 'relate-js';

export function changeName (value) {
    return {
        type: actionTypes.changeName,
        property: 'name',
        value
    };
}

export function addName () {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.testShowWaiting
        });
        const state = getState().test;
        return mutation({
            fragments: {
                addName: {
                    _id: 1,
                    name: 1
                }
            },
            variables: {
                addName: {
                    data: {
                        value: {
                            name: state.name,
                        },
                        type: 'TEST_CREATE_TYPE!'
                    }
                }
            }
        }, (result) => {
            dispatch({
                type: result.addName ? actionTypes.testHideWaiting : actionTypes.addNameError
            })
        })(dispatch, getState);
    };
}


export function removeName (id) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.testShowWaiting
        });
        return mutation({
            fragments: {
                removeName: {
                    _id: 1
                }
            },
            variables: {
                removeName: {
                    id: {
                        value: id,
                        type: 'ID!'
                    }
                }
            },
            type: 'REMOVE'
        }, () => {
            // TODO error handling
            dispatch({
                type: actionTypes.testHideWaiting
            });
        })(dispatch, getState);
    };
}
