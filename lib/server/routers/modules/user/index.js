import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.post('/api/register',  (req, res)=>{
            const {phone, password, email} = req.body;
            mutation({
                fragments: {
                    apiRegister: {
                        id: 1,
                        phone: 1,
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
                            type: 'apiRegisterInputType!'
                        }
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
