import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.subPost('/register',  (req, res)=>{
            const {phone, password, email} = router.getBody(req);
            mutation({
                fragments: {
                    apiRegister: {
                        error: 1,
                    }
                },
                variables: {
                    apiRegister: {
                        data: {
                            value: {
                                phone,
                                password,
                                email,
                            },
                            type: 'userInputType!'
                        }
                    }
                }
            }).then((data)=>{
                let context = data.data.apiRegister, result = {success: false};
                if (!context.error) {
                    result.success = true;
                } else if (context.error === 'UserExistsError') {
                    result.msg = '该电话号码已经被注册';
                }
                router.sendObj(res, result);
            }).catch((err)=>{
                router.sendServerError(res, err);
            });
        });
        router.subPost('/login',  (req, res)=>{
            const {phone, password} = router.getBody(req);
            query({
                fragments: {
                    apiLogin: {
                        error: 1,
                        userId: 1,
                    }
                },
                variables: {
                    apiLogin: {
                        phone: {
                            value: phone,
                            type: 'String!'
                        },
                        password: {
                            value: password,
                            type: 'String!'
                        },
                    }
                }
            }).then((data)=>{
                let context = data.data.apiLogin, result = {success: false};
                if (!context.error) {
                    result.success = true;
                    result.context = {userId: context.userId};
                } else if (context.error === 'PasswordError') {
                    result.msg = '密码不正确';
                } else if (context.error === 'NoRegister') {
                    result.msg = '该电话号码未注册';
                }
                router.sendObj(res, result);
            }).catch((err)=>{
                router.sendServerError(res, err);
            });
        });
        router.subPost('/modifyPassword',  (req, res)=>{
            const {userId, oldPassword, newPassword} = router.getBody(req);
            mutation({
                fragments: {
                    apiModifyPassword: {
                        error: 1,
                    }
                },
                variables: {
                    apiModifyPassword: {
                        userId: {
                            value: userId,
                            type: 'ID!'
                        },
                        oldPassword: {
                            value: oldPassword,
                            type: 'String!'
                        },
                        newPassword: {
                            value: newPassword,
                            type: 'String!'
                        },
                    }
                }
            }).then((data)=>{
                let context = data.data.apiModifyPassword, result = {success: false};
                if (!context.error) {
                    result.success = true;
                } else if (context.error === 'NoUser') {
                    result.msg = '没有找到该用户';
                } else if (context.error === 'PasswordError') {
                    result.msg = '密码错误';
                } else if (context.error === 'SetPasswordError') {
                    result.msg = '设置密码错误';
                }
                router.sendObj(res, result);
            }).catch((err)=>{
                router.sendServerError(res, err);
            });
        });
        router.subPost('/getPersonalInfo',  (req, res)=>{
            const {userId} = router.getBody(req);
            query({
                fragments: {
                    apiGetPersonalInfo: {
                        phone: 1,
                        name: 1,
                        email: 1,
                    }
                },
                variables: {
                    apiGetPersonalInfo: {
                        userId: {
                            value: userId,
                            type: 'ID!'
                        },
                    }
                }
            }).then((data)=>{
                let context = data.data.apiGetPersonalInfo, result = {success: true, context};
                router.sendObj(res, result);
            }).catch((err)=>{
                router.sendServerError(res, err);
            });
        });
    }
}
