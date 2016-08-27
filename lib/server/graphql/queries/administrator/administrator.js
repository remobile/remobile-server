import getProjection from 'helpers/get-projection';
import {GraphQLID} from 'graphql';

import authorize from '../../authorize';
import {administratorQueryType} from '../../types/administrator';
import AdministratorModel from '../../../models/administrator';

export default {
    type: administratorQueryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        let id = params.id;
        if (!id) {
            id = root.administrator._id;
        }

        return AdministratorModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
