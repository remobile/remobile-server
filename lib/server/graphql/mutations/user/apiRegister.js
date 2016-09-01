import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql';
import authorize from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../queries/user/user';

const userInputType = new GraphQLInputObjectType({
    name: 'userInputType',
    fields: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

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
    type: userType,
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
        await registerUser(user, password);
        return user;
    }
};
