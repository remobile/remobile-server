import {
    GraphQLID,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';

export default {
    type: userType,
    args: {
        userId: {type: GraphQLID}
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        const {userId} = params;

        return UserModel
        .findById(userId)
        .select(projection)
        .exec();
    }
};
