import getProjection from 'helpers/get-projection';
import {GraphQLList} from 'graphql';

import authorize from '../../authorize';
import {administratorQueryType} from '../../types/administrator';
import AdministratorModel from '../../../models/administrator';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';

export default {
    type: new GraphQLList(administratorQueryType),
    args: {
        ...paginationQueryArgs
    },
    resolve (root, params, options) {
        authorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        const query = AdministratorModel.find(searchQuery({}, params));

        paginateQuery(query, params);

        return query.select(projection).exec();
    }
};
