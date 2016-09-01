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
import VersionModel from '../../../models/version';

export default {
    type: GraphQLBoolean,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, params, options) {
        authorize(root);

        const removedVersion = await VersionModel
        .findByIdAndRemove(params.id, {
            select: getProjection(options.fieldASTs[0])
        })
        .exec();
        if (!removedVersion) {
            throw new Error('Version not found');
        }

        return removedVersion;
    }
};
