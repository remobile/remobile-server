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

export const administratorType = new GraphQLObjectType({
    name: 'administratorType',
    fields: {
        _id: {type: GraphQLString},
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        authority: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

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
