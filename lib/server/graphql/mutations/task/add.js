import {
    GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import {taskQueryType, taskCreateType} from '../../types/task';
import TaskModel from '../../../models/task';

export default {
    type: taskQueryType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(taskCreateType)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const task = new TaskModel(params.data);

        if (!task) {
          throw new Error('Error adding new test');
        }
        
        return task;
    }
};
