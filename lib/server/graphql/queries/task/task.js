import getProjection from 'helpers/get-projection';
import {GraphQLID} from 'graphql';

import apiAuthorize from '../../apiAuthorize';
import {taskQueryType} from '../../types/task';
import TaskModel from '../../../models/task/task';

export default {
    type: taskQueryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        apiAuthorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        let id = params.id;
        if (!id) {
            id = root.task._id;
        }

        return TaskModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
