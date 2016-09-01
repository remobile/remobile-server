import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import AdministratorModel from '../../../models/administrator';
import {administratorType} from '../../types/administrator';

export default {
    type: administratorType,
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
    async resolve (root, params, options) {
        authorize(root);

        const {id, name, email} = params;
        const projection = getProjection(options.fieldASTs[0]);
        const administrator = await AdministratorModel.findByIdAndUpdate(id,
            {name, email},
            {upsert: false, new: true},
        )
        .select(projection);

        if (!administrator) {
            throw new Error('Error updating administrator');
        }
        return administrator;
    }
};
