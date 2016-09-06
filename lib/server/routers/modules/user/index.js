import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.post('/api/register',  (req, res)=>{
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
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            });
        });
        router.post('/api/login',  (req, res)=>{
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
                let context = data.data.apiLogin, result = {success: true};
                if (!context.error) {
                    result.msg = '登录成功';
                    result.context = {userId: context.userId};
                } else if (context.error === 'PasswordError') {
                    result.msg = '密码不正确';
                    result.success = false;
                } else if (context.error === 'NoRegister') {
                    result.msg = '该电话号码未注册';
                    result.success = false;
                }
                router.sendObj(res, result);
            }).catch((err)=>{
                router.sendServerError(res, err);
            });
        });
        router.post('/api/modifyPassword',  (req, res)=>{
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
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            });
        });
        router.post('/api/getPersonalInfo',  (req, res)=>{
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
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            });
        });
    }
}
