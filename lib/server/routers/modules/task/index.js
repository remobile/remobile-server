import {query, mutation} from 'redirect-graphql';

module.exports = {
    register(router) {
        router.post('/api/acceptTask',  (req, res)=>{
            const {userId, taskId} = req.body;
            mutation({
                fragments: {
                    addAcceptTask: {
                        _id: 1,
                    }
                },
                variables: {
                    addAcceptTask: {
                        userId: {
                            value: userId,
                            type: 'ID!'
                        },
                        taskId: {
                            value: taskId,
                            type: 'ID!'
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
