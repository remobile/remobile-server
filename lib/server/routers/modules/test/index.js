import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.get('/getTestList',  (req, res)=>{
            query({
                fragments: {
                    tests: {
                        _id:1,
                        name:1
                    }
                }
            }).then((data)=>{
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            })
        });
        router.get('/addTestList',  (req, res)=>{
            const name = req.query.name;
            mutation({
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
                                name: name,
                            },
                            type: 'TEST_CREATE_TYPE!'
                        }
                    }
                }
            }).then((data)=>{
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            })
        });
    }
}
