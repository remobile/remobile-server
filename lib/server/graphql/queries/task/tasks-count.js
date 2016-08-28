import {GraphQLInt} from 'graphql';

import apiAuthorize from '../../apiAuthorize';
import TaskModel from '../../../models/task/task';

export default {
    type: GraphQLInt,
    args: {},
    async resolve (root) {
        apiAuthorize(root);
        return await TaskModel.count();
    }
};
