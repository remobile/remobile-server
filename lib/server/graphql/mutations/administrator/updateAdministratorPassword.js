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
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import AdministratorModel from '../../../models/administrator';
import {administratorType} from '../../queries/administrator/administrator';

async function setPassword (administrator, password) {
    return new Promise((resolve, reject) => {
        administrator.setPassword(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                reject(passwordErr);
            }
            resolve();
        });
    });
}
async function authenticatePassword (administrator, password) {
    return new Promise((resolve, reject) => {
        administrator.authenticate(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                reject(passwordErr);
            }
            resolve();
        });
    });
}
export default {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        newPassword: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve (root, params) {
        authorize(root);

        const administrator = await AdministratorModel.findById(params.id);

        if (!administrator) {
            throw new Error('Administrator does not exist');
        }
        await authenticatePassword(administrator, params.password);
        await setPassword(administrator, params.newPassword);
        await administrator.save();

        return administrator;
    }
};
