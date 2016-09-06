import {GraphQLList} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';

export default {
    type: new GraphQLList(userType),
    args: {},
    resolve (root, params, options) {
        authorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        return UserModel.find().select(projection).exec();
    }
};
