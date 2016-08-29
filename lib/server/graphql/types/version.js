import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql';

export const versionCreateType = new GraphQLInputObjectType({
    name: 'VERSION_CREATE_TYPE',
    fields: {
        _id: {type: GraphQLID},
        verName: {type: GraphQLString},
        verCode: {type: GraphQLString},
        androidJsVersion: {type: GraphQLString},
        iosJsVersion: {type: GraphQLString},
    }
});

export const versionQueryType = new GraphQLObjectType({
    name: 'VERSION_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLID)},
        verName: {type: GraphQLString},
        verCode: {type: GraphQLString},
        androidJsVersion: {type: GraphQLString},
        iosJsVersion: {type: GraphQLString},
    }
});
