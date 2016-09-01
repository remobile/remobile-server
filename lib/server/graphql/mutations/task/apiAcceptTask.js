import {
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import authorize from '../../authorize';
import TaskModel from '../../../models/task';
import UserModel from '../../../models/user';
import AcceptTaskModel from '../../../models/acceptTask';
import {acceptTaskType} from '../../types/acceptTask';

export default {
    type: acceptTaskType,
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

        const acceptTaskModel = new AcceptTaskModel({acceptor: userId, belongTask: taskId});
        const acceptTask = await acceptTaskModel.save();
        if (!acceptTask) {
            throw new Error('Error adding new addAccept');
        }

        //更改用户列表
        const user = await UserModel.findByIdAndUpdate(userId, {$push: {taskList: acceptTask._id}}, {
            new: true,
        }).exec();
        if (!user) {
            throw new Error('Error find no user');
        }

        //更改任务列表
        const task = await TaskModel.findByIdAndUpdate(taskId, {$push: {acceptList: acceptTask._id}}, {
            new: true,
        }).exec();
        if (!task) {
            throw new Error('Error find no task');
        }

        return acceptTask;
    }
};
