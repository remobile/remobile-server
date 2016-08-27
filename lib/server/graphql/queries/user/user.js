import getProjection from 'helpers/get-projection';
import {GraphQLID} from 'graphql';

import apiAuthorize from '../../apiAuthorize';
import {userQueryType} from '../../types/user';
import UserModel from '../../../models/user';

export default {
    type: userQueryType,
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
            id = root.user._id;
        }

        return UserModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
