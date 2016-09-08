import {
    GraphQLID,
} from 'graphql';
import {getInlineProjection} from 'helpers/get-projection';
import {authorizeApi} from '../../authorize';
import UserModel from '../../../models/user';
import bindErrorType from 'helpers/bind-error-type';
import {userType} from '../../types/user';


export default {
    type: bindErrorType({userType}),
    args: {
        userId: {type: GraphQLID}
    },
    async resolve (root, params, options) {
        if (!await authorizeApi(params)) {
            return {error: 'Unauthorized'};
        }
        const projection = getInlineProjection(options.fieldASTs[0]);
        const {userId} = params;

        return UserModel
        .findById(userId)
        .select(projection)
        .exec();
    }
};
