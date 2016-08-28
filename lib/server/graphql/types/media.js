import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

export const mediaCreateType = new GraphQLInputObjectType({
    name: 'MEDIA_CREATE_TYPE',
    fields: {
        acceptTaskId: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type:  new GraphQLNonNull(GraphQLString)},
        url: {type:  new GraphQLNonNull(GraphQLString)},
        thumb: {type:  GraphQLString},
        time: {type:  new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLInt)},
    }
});

export const mediaQueryType = new GraphQLObjectType({
    name: 'MEDIA_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLID)},
        acceptTaskId: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        url: {type: GraphQLString},
        thumb: {type: GraphQLString},
        time: {type: GraphQLString},
    }
});
