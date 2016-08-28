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
        state: {type: GraphQLInt},
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
        name: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        reward: {type: new GraphQLNonNull(GraphQLFloat)},
        startTime: {type: new GraphQLNonNull(GraphQLString)},
        endTime: {type: new GraphQLNonNull(GraphQLString)},
    }
});
