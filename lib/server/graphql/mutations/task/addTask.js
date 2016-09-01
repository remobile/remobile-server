import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,    GraphQLBoolean,
    GraphQLList,
} from 'graphql';
import authorize from '../../authorize';
import TaskModel from '../../../models/task';
import {taskType} from '../../queries/task/task';

const addTaskInputType = new GraphQLInputObjectType({
    name: 'addTaskInputType',
    fields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        reward: {type: new GraphQLNonNull(GraphQLFloat)},
        startTime: {type: new GraphQLNonNull(GraphQLString)},
        endTime: {type: new GraphQLNonNull(GraphQLString)},
    }
});

export default {
    type: taskType,
    args: {
        data: {
            type: new GraphQLNonNull(addTaskInputType)
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
