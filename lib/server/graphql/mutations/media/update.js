import getProjection from 'helpers/get-projection';
import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} from 'graphql';

import authorize from '../../authorize';
import {userQueryType, userCreateType} from '../../types/user';
import UserModel from '../../../models/user';

async function doUpdateUser ({id, projection, doc}) {
    const user = await UserModel
    .findByIdAndUpdate(
        id,
        doc,
        {upsert: false, new: true}
    )
    .select(projection);

    if (!user) {
        throw new Error('Error updating user');
    }
    return user;
}
export const updateUserInfo = {
    type: userQueryType,
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
        return doUpdateUser({
            id: params.id,
            projection,
            doc: {
                name: params.name,
                authority: params.authority
            }
        });
    }
};
export const updatePersonalInfo = {
    type: userQueryType,
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
        return doUpdateUser({
            id: params.id,
            projection,
            doc: {
                name: params.name,
                email: params.email
            }
        });
    }
};
async function setPassword (user, password) {
    return new Promise((resolve, reject) => {
        user.setPassword(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                reject(passwordErr);
            }
            resolve();
        });
    });
}
async function authenticatePassword (user, password) {
    return new Promise((resolve, reject) => {
        user.authenticate(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                reject(passwordErr);
            }
            resolve();
        });
    });
}
export const updateUserPassword = {
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

        const user = await UserModel.findById(params.id);

        if (!user) {
            throw new Error('User does not exist');
        }
        await authenticatePassword(user, params.password);
        await setPassword(user, params.newPassword);
        await user.save();

        return user;
    }
};
