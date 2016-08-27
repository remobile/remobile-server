import {GraphQLInt} from 'graphql';

import apiAuthorize from '../../apiAuthorize';
import UserModel from '../../../models/user';

export default {
    type: GraphQLInt,
    args: {},
    async resolve (root) {
        apiAuthorize(root);
        return await UserModel.count();
    }
};
