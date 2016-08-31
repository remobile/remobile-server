import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.post('/api/register',  (req, res)=>{
            const {phone, password} = req.body;
            mutation({
                fragments: {
                    addUser: {
                        id: 1,
                        phone: 1,
                    }
                },
                variables: {
                    addUser: {
                        data: {
                            value: {
                                phone,
                                password
                            },
                            type: 'USER_CREATE_TYPE!'
                        }
                    }
                }
            }).then((data)=>{
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            });
        });
        router.post('/api/userList',  (req, res)=>{
            query({
                fragments: {
                    users: {
                        id: 1,
                        phone: 1,
                        name: 1,
                        email: 1,
                        state: 1,
                        date: 1,
                        taskList: 1,
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
