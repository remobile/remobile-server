import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {errorType} from '../../types/error';

async function setPassword (user, password) {
    return new Promise((resolve, reject) => {
        user.setPassword(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                resolve(passwordErr);
            }
            resolve();
        });
    });
}
async function authenticatePassword (user, password) {
    return new Promise((resolve, reject) => {
        user.authenticate(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                resolve(passwordErr);
            }
            resolve();
        });
    });
}
export default {
    type: errorType,
    args: {
        userId: {type: new GraphQLNonNull(GraphQLID)},
        oldPassword: {type: new GraphQLNonNull(GraphQLString)},
        newPassword: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve (root, params, options) {
        authorize(root);
        const {userId, oldPassword, newPassword} = params;

        const user = await UserModel.findById(userId);
        if (!user) {
            return {error: 'NoUser'};
        }
        let error = await authenticatePassword(user, oldPassword);
        if (error) {
            return {error: 'PasswordError'};
        }
        error = await setPassword(user, newPassword);
        if (error) {
            return {error: 'SetPasswordError'};
        }
        await user.save();
        return {error: null};
    }
};
