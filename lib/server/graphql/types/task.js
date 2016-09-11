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

export const taskType = new GraphQLObjectType({
    name: 'taskType',
    fields: {
        _id: {type: GraphQLID},
        id: {type: GraphQLID},
        name: {type: GraphQLID},
        address: {type: GraphQLString},
        description: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        fang: {type: GraphQLString},
        acceptList: {type: new GraphQLList(GraphQLID)},
    }
});

export const taskInputType = new GraphQLInputObjectType({
    name: 'taskInputType',
    fields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        address: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        reward: {type: new GraphQLNonNull(GraphQLFloat)},
        startTime: {type: new GraphQLNonNull(GraphQLString)},
        endTime: {type: new GraphQLNonNull(GraphQLString)},
    }
});
