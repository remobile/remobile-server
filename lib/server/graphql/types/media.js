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

export const mediaType = new GraphQLObjectType({
    name: 'mediaType',
    fields: {
        id: {type: GraphQLID},
        acceptTaskId: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        url: {type: GraphQLString},
        thumb: {type: GraphQLString},
        time: {type: GraphQLString},
    }
});

export const mediaInputType = new GraphQLInputObjectType({
    name: 'mediaInputType',
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
