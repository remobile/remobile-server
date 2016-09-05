import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.post('/api/register',  (req, res)=>{
            const {phone, password, email} = req.body;
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
            const {phone, password} = req.body;
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
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            });
        });
        router.post('/api/modifyPassword',  (req, res)=>{
            const {userId, oldPassword, newPassword} = req.body;
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
    }
}
