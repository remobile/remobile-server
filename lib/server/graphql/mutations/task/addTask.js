import {
    GraphQLNonNull,
} from 'graphql';
import {authorize} from '../../authorize';
import TaskModel from '../../../models/task';
import {taskType, taskInputType} from '../../types/task';


export default {
    type: taskType,
    args: {
        data: {
            type: new GraphQLNonNull(taskInputType)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const taskModel = new TaskModel(params.data);
        const task = await taskModel.save();

        if (!task) {
            throw new Error('Error adding new task');
        }

        return task;
    }
};
