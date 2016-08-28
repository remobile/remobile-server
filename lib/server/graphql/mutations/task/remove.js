import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import {taskQueryType} from '../../types/task';
import TaskModel from '../../../models/task/task';

export default {
    type: taskQueryType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        authorize(root);

        return TaskModel
        .findByIdAndRemove(params.id)
        .exec()
        .then((removedTask) => {
            if (!removedTask) {
                throw new Error('Error removing task');
            }
            return removedTask;
        });
    }
};
