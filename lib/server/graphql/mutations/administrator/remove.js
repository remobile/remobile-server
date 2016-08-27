import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import {administratorQueryType} from '../../types/administrator';
import AdministratorModel from '../../../models/administrator';

export default {
    type: administratorQueryType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        authorize(root);

        return AdministratorModel
        .findByIdAndRemove(params.id)
        .exec()
        .then((removedAdministrator) => {
            if (!removedAdministrator) {
                throw new Error('Error removing administrator');
            }
            return removedAdministrator;
        });
    }
};
