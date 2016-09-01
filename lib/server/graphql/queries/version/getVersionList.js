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

const getVersionListType = new GraphQLObjectType({
    name: 'getVersionListType',
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
    type: new GraphQLList(getVersionListType),
    args: {},
    resolve (root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return VersionModel.find().select(projection).exec();
    }
};
