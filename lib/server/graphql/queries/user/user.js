import {
    GraphQLID,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';

export default {
    type: userType,
    args: {
        id: {type: GraphQLID}
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        let id = params.id;

        return UserModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
