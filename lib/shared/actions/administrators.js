import {administrators as actionTypes} from 'actions';
import {notification} from 'antd';
import {mutation} from 'relate-js';

export function openModal(options={}) {
    return {
        type: actionTypes.openModal,
        isEdit: options.isEdit
    };
}
export function closeModal() {
    return {
        type: actionTypes.closeModal
    };
}
export function setSelectedAdministrator(selectedAdministrator) {
    return {
        type: actionTypes.setSelectedAdministrator,
        selectedAdministrator: selectedAdministrator,
    };
}
export function openRemove() {
    return {
        type: actionTypes.openRemove
    };
}
export function clearRemove() {
    return {
        type: actionTypes.clearRemove
    };
}
export function startEditPersonalInfo() {
    return {
        type: actionTypes.startEditPersonalInfo,
    };
}
export function stopEditPersonalInfo() {
    return {
        type: actionTypes.stopEditPersonalInfo,
    };
}
export function openUpdatePasswordModal() {
    return {
        type: actionTypes.openUpdatePasswordModal,
    };
}
export function closeUpdatePasswordModal() {
    return {
        type: actionTypes.closeUpdatePasswordModal,
    };
}
export function addAdministrator(fragments, data) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                addAdministrator: fragments.administrators
            },
            variables: {
                addAdministrator: {
                    data: {
                        value: data,
                        type: 'ADMINISTRATOR_CREATE_TYPE!'
                    }
                }
            }
        }, (result) => {
            if (result.addAdministrator) {
                notification.success({description: '添加成功'})
                dispatch({
                    type: actionTypes.addSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.addError
                })
                notification.error({description: '添加失败,用户名或邮箱被占用'})
            }
        })(dispatch, getState);
    };
}
export function removeAdministrator(id) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                removeAdministrator: {
                    _id: 1
                }
            },
            variables: {
                removeAdministrator: {
                    id: {
                        value: id,
                        type: 'ID!'
                    }
                }
            },
            type: 'REMOVE'
        }, () => {
            dispatch({
                type: actionTypes.removeSuccess
            })
        })(dispatch, getState);
    }
}
export function updateAdministratorInfo(id, administrator) {
    const {name, authority} = administrator;
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateAdministratorInfo: {
                    _id: 1,
                    name: 1,
                    authority: 1,
                }
            },
            variables: {
                updateAdministratorInfo: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    name: {
                        value: name,
                        type: 'String!'
                    },
                    authority: {
                        value: authority,
                        type: 'Int!'
                    }
                }
            }
        }, (result) => {
            if (result.updateAdministratorInfo) {
                notification.success({description: '修改成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: '添加失败,用户名或邮箱被占用'})
            }
        })(dispatch, getState);
    }
}
export function updateSelfInfo(id, administrator) {
    const {name, email} = administrator;
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateSelfInfo: {
                    _id: 1,
                    name: 1,
                    email: 1,
                }
            },
            variables: {
                updateSelfInfo: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    name: {
                        value: name,
                        type: 'String!'
                    },
                    email: {
                        value: email,
                        type: 'String!'
                    }
                }
            }
        }, (result) => {
            if (result.updateSelfInfo) {
                notification.success({description: '修改成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: '修改失败，请检查邮箱是否被占用'})
            }
        })(dispatch, getState);
    }
}
export function updateAdministratorPassword (id, password, newPassword) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateAdministratorPassword: 1,
            },
            variables: {
                updateAdministratorPassword: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    password: {
                        value: password,
                        type: 'String!'
                    },
                    newPassword: {
                        value: newPassword,
                        type: 'String!'
                    }
                }
            }
        }, (result) => {
            if (result.updateAdministratorPassword) {
                notification.success({description: '修改密码成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: '旧密码验证错误'})
            }
        })(dispatch, getState);
    };
}
