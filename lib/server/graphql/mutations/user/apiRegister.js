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

const apiRegisterInputType = new GraphQLInputObjectType({
    name: 'apiRegisterInputType',
    fields: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

const apiRegisterType = new GraphQLObjectType({
    name: 'apiRegisterType',
    fields: {
        id: {type: GraphQLID},
        phone: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString},
        taskList: {type: new GraphQLList(GraphQLID)},
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
    type: apiRegisterType,
    args: {
        data: {
            type: new GraphQLNonNull(apiRegisterInputType)
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
