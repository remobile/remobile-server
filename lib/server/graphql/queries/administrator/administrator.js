import {
    GraphQLNonNull,
    GraphQLID,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import AdministratorModel from '../../../models/administrator';
import {administratorType,} from '../../types/administrator';

export default {
    type: administratorType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        const id = params.id || root.administrator.id;

        return AdministratorModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
