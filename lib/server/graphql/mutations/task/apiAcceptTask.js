import {
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import {authorizeApi} from '../../authorize';
import TaskModel from '../../../models/task';
import UserModel from '../../../models/user';
import AcceptTaskModel from '../../../models/acceptTask';
import {acceptTaskType} from '../../types/acceptTask';
import {errorType} from '../../types/error';

export default {
    type: errorType,
    args: {
        userId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taskId: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, params) {
        if (!await authorizeApi(params)) {
            return {error: 'Unauthorized'};
        }
        const {userId, taskId} = params;

        const acceptTaskModel = new AcceptTaskModel({acceptor: userId, belongTask: taskId});
        const acceptTask = await acceptTaskModel.save();

        //更改用户列表
        await UserModel.findByIdAndUpdate(userId, {$push: {taskList: acceptTask._id}}, {
            new: true,
        }).exec();

        //更改任务列表
        await TaskModel.findByIdAndUpdate(taskId, {$push: {acceptList: acceptTask._id}}, {
            new: true,
        }).exec();

        return {error: null};
    }
};
