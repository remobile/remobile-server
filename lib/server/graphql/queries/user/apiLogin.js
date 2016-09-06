import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import UserModel from '../../../models/user';
import UserSessionModel from '../../../models/userSession';
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
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
    },
    async resolve (root, params, options) {
        const {phone, password} = params;

        const user = await UserModel.findOne({phone});
        if (!user) {
            return {userId: null, error: 'NoRegister'};
        }
        let error = await authenticatePassword(user, password);
        if (error) {
            return {userId: null,  error: 'PasswordError'};
        } else {
            const userId = user.id;
            await UserSessionModel.findOneAndUpdate({userId}, {userId}, {upsert: true}).exec();
            return {userId, error: null};
        }
    }
};
