import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} from 'graphql';

export const taskQueryType = new GraphQLObjectType({
    name: 'TASK_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        description: {type: GraphQLString},
        address: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        acceptList: {type: new GraphQLList(GraphQLID)},
    }
});

export const taskCreateType = new GraphQLInputObjectType({
    name: 'TASK_CREATE_TYPE',
    fields: {
        _id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        reward: {type: new GraphQLNonNull(GraphQLFloat)},
        startTime: {type: new GraphQLNonNull(GraphQLString)},
        endTime: {type: new GraphQLNonNull(GraphQLString)},
    }
});

export const acceptTaskQueryType = new GraphQLObjectType({
    name: 'ACCEPT_TASK_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLID)},
        acceptor: {type: GraphQLID},
        acceptTime: {type: GraphQLString},
        submitTime: {type: GraphQLString},
        passTime: {type: GraphQLString},
        state: {type: GraphQLInt},
        images: {type: new GraphQLList(GraphQLID)},
        videos: {type: new GraphQLList(GraphQLID)},
    }
});

export const acceptTaskCreateType = new GraphQLInputObjectType({
    name: 'ACCEPT_TASK_CREATE_TYPE',
    fields: {
        acceptor: {type: new GraphQLNonNull(GraphQLID)},
    }
});
