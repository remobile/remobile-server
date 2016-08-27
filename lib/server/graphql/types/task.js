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
        discription: {type: GraphQLString},
        address: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        acceptTime: {type: GraphQLString},
        submitTime: {type: GraphQLString},
        passTime: {type: GraphQLString},
    }
});

export const taskCreateType = new GraphQLInputObjectType({
    name: 'TASK_CREATE_TYPE',
    fields: {
        _id: {type: GraphQLID},
        username: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        discription: {type: GraphQLString},
        address: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
    }
});
