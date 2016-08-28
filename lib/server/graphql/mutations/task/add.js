import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import {taskQueryType, taskCreateType, acceptTaskQueryType, acceptTaskCreateType,} from '../../types/task';
import TaskModel from '../../../models/task/task';
import UserModel from '../../../models/user';
import AcceptTaskModel from '../../../models/task/acceptTask';

export const addTask = {
    type: taskQueryType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(taskCreateType)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const taskModel = new TaskModel(params.data);
        const task = await taskModel.save();

        if (!task) {
          throw new Error('Error adding new test');
        }

        return task;
    }
};

export const addAcceptTask = {
    type: acceptTaskQueryType,
    args: {
        userId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taskId: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const {userId, taskId} = params;
        console.log("===", params);

        const acceptTaskModel = new AcceptTaskModel({acceptor: userId, belongTask: taskId});
        const acceptTask = await acceptTaskModel.save();

        //更改用户列表
        const user = await UserModel.findByIdAndUpdate(userId, {$push: {taskList: acceptTask._id}}, {
            new: true,
        }).exec();

        //更改任务列表
        const task = await TaskModel.findByIdAndUpdate(taskId, {$push: {acceptList: acceptTask._id}}, {
            new: true,
        }).exec();

        if (!acceptTask) {
          throw new Error('Error adding new test');
        }

        return acceptTask;
    }
};
