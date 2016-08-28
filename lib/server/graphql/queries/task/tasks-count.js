import {GraphQLInt} from 'graphql';

import authorize from '../../authorize';
import TaskModel from '../../../models/task/task';

export default {
    type: GraphQLInt,
    args: {},
    async resolve (root) {
        authorize(root);
        return await TaskModel.count();
    }
};
