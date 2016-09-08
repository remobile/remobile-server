import {
    GraphQLID,
    GraphQLUnionType,
} from 'graphql';
import {getInlineProjection} from 'helpers/get-projection';
import {authorizeApi} from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';
import {errorType} from '../../types/error';

let apiGetPersonalInfoType = new GraphQLUnionType({
    name: 'apiGetPersonalInfoType',
    types: [errorType, userType],
    resolveType: (value) => {
        if (value.error) {
            return errorType;
        }
        return userType;
    },
});

export default {
    type: apiGetPersonalInfoType,
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
