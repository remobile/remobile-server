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
import {administratorType} from '../../queries/administrator/getAdministratorList';
import AdministratorModel from '../../../models/administrator';

const administratorInputType = new GraphQLInputObjectType({
    name: 'administratorInputType',
    fields: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        authority: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

async function registerAdministrator (administrator, password) {
    return new Promise((resolve, reject) => {
        AdministratorModel.register(administrator, password, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export default {
    type: administratorType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(administratorInputType)
        }
    },
    async resolve (root, params) {
        const {username, name, email, authority, password} = params.data;
        const administrator = new AdministratorModel({
            username,
            name,
            email,
            authority,
        });

        const count = await AdministratorModel.count();

        if (count > 0) {
            authorize(root);
        }
        await registerAdministrator(administrator, password);

        return administrator;
    }
};
