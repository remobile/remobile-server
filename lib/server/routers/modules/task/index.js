import {query, mutation} from 'redirect-graphql';


module.exports = {
    register(router) {
        router.post('/api/addTask',  (req, res)=>{
            const {name, address, description, reward, startTime, endTime} = req.body;
            mutation({
                fragments: {
                    addTask: {_id: 1}
                },
                variables: {
                    addTask: {
                        data: {
                            value: {
                                name,
                                address,
                                description,
                                reward,
                                startTime,
                                endTime,
                            },
                            type: 'taskInputType!'
                        }
                    }
                }
            }).then((data)=>{
                router.sendObj(res, data);
            }).catch((err)=>{
                router.sendObj(res, err);
            })
        });
        router.post('/api/getTaskList',  (req, res)=>{
            const {userId, type, pageNo} = req.body;
            query({
                fragments: {
                    apiGetTaskList: {
                        id:1,
                        name: 1,
                        address: 1,
                        description: 1,
                        reward: 1,
                        startTime: 1,
                        endTime: 1,
                        acceptTime:1,
                        submitTime:1,
                        passTime:1,
                        state:1,
                        images: {
                            id: 1,
                            name: 1,
                            description: 1,
                            url: 1,
                            thumb: 1,
                            time: 1,
                        },
                        videos: {
                            id: 1,
                            name: 1,
                            description: 1,
                            url: 1,
                            thumb: 1,
                            time: 1,
                        },
                    }
                },
                variables: {
                    apiGetTaskList: {
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
        router.post('/api/getMyTaskList',  (req, res)=>{
            const {userId, type, pageNo} = req.body;
            query({
                fragments: {
                    apiGetMyTaskList: {
                        id:1,
                        name: 1,
                        address: 1,
                        description: 1,
                        reward: 1,
                        startTime: 1,
                        endTime: 1,
                        acceptTime:1,
                        submitTime:1,
                        passTime:1,
                        state:1,
                        images: {
                            id: 1,
                            name: 1,
                            description: 1,
                            url: 1,
                            thumb: 1,
                            time: 1,
                        },
                        videos: {
                            id: 1,
                            name: 1,
                            description: 1,
                            url: 1,
                            thumb: 1,
                            time: 1,
                        },
                    }
                },
                variables: {
                    apiGetMyTaskList: {
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
                    apiAcceptTask: {
                        id: 1,
                    }
                },
                variables: {
                    apiAcceptTask: {
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
        router.post('/api/submitTask',  (req, res)=>{
            const {userId, taskId} = req.body;
            mutation({
                fragments: {
                    apiSumbitTask: 1
                },
                variables: {
                    apiSumbitTask: {
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
