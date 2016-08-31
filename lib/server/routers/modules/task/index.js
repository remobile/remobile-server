import {query, mutation} from 'redirect-graphql';


module.exports = {
    register(router) {
        router.post('/api/getTaskList',  (req, res)=>{
            const {userId, type, pageNo} = req.body;
            query({
                fragments: {
                    tasks: {
                        id: 1,
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
            })
        });
        router.post('/api/getMyTaskList',  (req, res)=>{
            const {userId, type, pageNo} = req.body;
            query({
                fragments: {
                    getMyTaskList: {
                        id:1,
                        belongTask:1,
                        acceptTime:1,
                        submitTime:1,
                        passTime:1,
                        state:1,
                        images:1,
                        videos:1,
                    }
                },
                variables: {
                    getMyTaskList: {
                        userId: {
                            value: userId,
                            type: 'ID!'
                        },
                        type: {
                            value: type,
                            type: 'Int!'
                        },
                        pageNo: {
                            value: pageNo,
                            type: 'Int!'
                        },
                    }
                }
            }).then((data)=>{
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            })
        });
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
