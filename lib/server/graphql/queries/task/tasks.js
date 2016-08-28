import getProjection from 'helpers/get-projection';
import {GraphQLList} from 'graphql';

import authorize from '../../authorize';
import {taskQueryType} from '../../types/task';
import TaskModel from '../../../models/task/task';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
    type: new GraphQLList(taskQueryType),
    args: {
        ...paginationQueryArgs
    },
    resolve (root, params, options) {
        authorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        const query = TaskModel.find(searchQuery({}, params));

        paginateQuery(query, params);

        return query.select(projection).exec();
    }
};
