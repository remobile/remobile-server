import {
    GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import {userQueryType, userCreateType} from '../../types/user';
import UserModel from '../../../models/user';

async function registerUser (user, password) {
    return new Promise((resolve, reject) => {
        UserModel.register(user, password, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export default {
    type: userQueryType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(userCreateType)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const {phone, password} = params.data;
        const user = new UserModel({
            phone,
        });
        await registerUser(user, password);
        return user;
    }
};
