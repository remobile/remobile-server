import getProjection from 'helpers/get-projection';
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,    GraphQLBoolean,
} from 'graphql';

import authorize from '../../authorize';
import {administratorQueryType, administratorCreateType} from '../../types/administrator';
import AdministratorModel from '../../../models/administrator';

async function doUpdateAdministrator ({id, projection, doc}) {
    const administrator = await AdministratorModel
    .findByIdAndUpdate(
        id,
        doc,
        {upsert: false, new: true}
    )
    .select(projection);

    if (!administrator) {
        throw new Error('Error updating administrator');
    }
    return administrator;
}
export const updateAdministratorInfo = {
    type: administratorQueryType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        authority: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve (root, params, options) {
        authorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        return doUpdateAdministrator({
            id: params.id,
            projection,
            doc: {
                name: params.name,
                authority: params.authority
            }
        });
    }
};
export const updateSelfInfo = {
    type: administratorQueryType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve (root, params, options) {
        authorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        return doUpdateAdministrator({
            id: params.id,
            projection,
            doc: {
                name: params.name,
                email: params.email
            }
        });
    }
};
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
export const updateAdministratorPassword = {
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
