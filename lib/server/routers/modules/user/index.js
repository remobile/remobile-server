import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.post('/api/register',  (req, res)=>{
            const {phone, password} = req.body;
            mutation({
                fragments: {
                    addUser: {
                        _id: 1,
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
                    tasks: {
                        _id: 1,
                        name: 1,
                        address: 1,
                        description: 1,
                        reward: 1,
                        startTime: 1,
                        endTime: 1,
                        acceptList: 1,
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
