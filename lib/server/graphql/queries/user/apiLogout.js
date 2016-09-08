import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
} from 'graphql';

import {authorizeApi} from '../../authorize';
import UserSessionModel from '../../../models/userSession';

export default {
    type: GraphQLBoolean,
    args: {
        userId: {type: new GraphQLNonNull(GraphQLID)},
    },
    async resolve (root, params, options) {
        if (!await authorizeApi(params)) {
            return false;
        }
        await UserSessionModel.findOneAndRemove({userId: params.userId});
        return true;
    }
};
