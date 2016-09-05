import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import UserModel from '../../../models/user';
import {userInputType} from '../../types/user';


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
    type: new GraphQLObjectType({
        name: 'apiLoginErrorType',
        fields: {
            error: {type: GraphQLString},
            userId: {type: GraphQLString},
        }
    }),
    args: {
        data: {
            type: new GraphQLNonNull(userInputType)
        }
    },
    async resolve (root, params, options) {
        authorize(root);
        const {phone, password} = params.data;

        const user = await UserModel.findOne({phone});
        if (!user) {
            return {userId: null, error: 'NoRegister'};
        }
        let error = await authenticatePassword(user, password);
        if (error) {
            return {userId: null,  error: 'PasswordError'};
        } else {
            return {userId: user.id, error: null};
        }
    }
};
