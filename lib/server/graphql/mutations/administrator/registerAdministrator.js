import {
    GraphQLNonNull,
} from 'graphql';
import {authorize} from '../../authorize';
import AdministratorModel from '../../../models/administrator';
import {administratorType, administratorInputType} from '../../types/administrator';

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
