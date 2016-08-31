import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import authorize from '../../authorize';
import TaskModel from '../../../models/task';


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

const addTaskType = new GraphQLObjectType({
    name: 'addTaskType',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        description: {type: GraphQLString},
        address: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        acceptList: {type: new GraphQLList(GraphQLID)},
    }
});

export default {
    type: addTaskType,
    args: {
        data: {
            name: 'data',
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
