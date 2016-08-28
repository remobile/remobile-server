import getProjection from 'helpers/get-projection';
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';

import apiAuthorize from '../../apiAuthorize';
import {taskQueryType, taskCreateType} from '../../types/task';
import TaskModel from '../../../models/task/task';

async function doUpdateTask ({id, projection, doc}) {
    const task = await TaskModel
    .findByIdAndUpdate(
        id,
        doc,
        {upsert: false, new: true}
    )
    .select(projection);

    if (!task) {
        throw new Error('Error updating task');
    }
    return task;
}
export const updateTask = {
    type: taskQueryType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve (root, params, options) {
        apiAuthorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        return doUpdateTask({
            id: params.id,
            projection,
            doc: {
                name: params.name,
            }
        });
    }
};
