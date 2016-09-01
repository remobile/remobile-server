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
import VersionModel from '../../../models/version';

export const versionType = new GraphQLObjectType({
    name: 'versionType',
    fields: {
        _id: {type: GraphQLID},
        verName: {type: GraphQLString},
        verCode: {type: GraphQLString},
        androidJsVersion: {type: GraphQLString},
        iosJsVersion: {type: GraphQLString},
        date: {type: GraphQLString},
    }
});
export default {
    type: versionType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        const id = params.id || root.administrator.id;

        return VersionModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
