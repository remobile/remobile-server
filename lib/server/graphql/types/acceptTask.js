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

export const acceptTaskType = new GraphQLObjectType({
    name: 'acceptTaskType',
    fields: {
        _id: {type: GraphQLID},
        acceptor: {type: GraphQLID},
        belongTask: {type: GraphQLID},
        acceptTime: {type: GraphQLString},
        submitTime: {type: GraphQLString},
        passTime: {type: GraphQLString},
        state: {type: GraphQLInt},
        images: {type: new GraphQLList(GraphQLID)},
        videos: {type: new GraphQLList(GraphQLID)},
    }
});
