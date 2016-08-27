import {
    GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import {administratorQueryType, administratorCreateType} from '../../types/administrator';
import AdministratorModel from '../../../models/administrator';

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
    type: administratorQueryType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(administratorCreateType)
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
