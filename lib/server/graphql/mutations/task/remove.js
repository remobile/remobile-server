import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import apiAuthorize from '../../apiAuthorize';
import {taskQueryType} from '../../types/task';
import TaskModel from '../../../models/task';

export default {
    type: taskQueryType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        apiAuthorize(root);

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
