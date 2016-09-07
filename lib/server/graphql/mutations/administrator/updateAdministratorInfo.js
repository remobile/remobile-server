import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
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
        authority: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    async resolve (root, params, options) {
        authorize(root);

        const {id, name, authority} = params;
        const projection = getProjection(options.fieldASTs[0]);
        const administrator = await AdministratorModel.findByIdAndUpdate(id,
            {name, authority},
            {upsert: false, new: true}
        )
        .select(projection);

        if (!administrator) {
            throw new Error('Error updating administrator');
        }
        return administrator;
    }
};
