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
        let ret = await authorizeApi(params);
        if (!ret) {
            return false;
        }
        await UserSessionModel.findOneAndRemove({userId: params.userId});
        return true;
    }
};
