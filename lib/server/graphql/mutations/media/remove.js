import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import {userQueryType} from '../../types/user';
import UserModel from '../../../models/user';

export default {
    type: userQueryType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        authorize(root);

        return UserModel
        .findByIdAndRemove(params.id)
        .exec()
        .then((removedUser) => {
            if (!removedUser) {
                throw new Error('Error removing user');
            }
            return removedUser;
        });
    }
};
