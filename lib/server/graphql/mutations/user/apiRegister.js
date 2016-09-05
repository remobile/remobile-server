import {
    GraphQLNonNull,
} from 'graphql';
import authorize from '../../authorize';
import UserModel from '../../../models/user';
import {userInputType} from '../../types/user';
import {errorType} from '../../types/error';

async function registerUser (user, password) {
    return new Promise((resolve, reject) => {
        UserModel.register(user, password, (error) => {
            if (error) {
                resolve(error.name);
            }
            resolve();
        });
    });
}

export default {
    type: errorType,
    args: {
        data: {
            type: new GraphQLNonNull(userInputType)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const {phone, password} = params.data;
        const user = new UserModel({
            phone,
        });
        let error = await registerUser(user, password);
        return {error};
    }
};
