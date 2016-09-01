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

export const userType = new GraphQLObjectType({
    name: 'userType',
    fields: {
        id: {type: GraphQLID},
        _id: {type: GraphQLID},
        phone: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString},
        taskList: {type: new GraphQLList(GraphQLID)},
    }
});

export const userInputType = new GraphQLInputObjectType({
    name: 'userInputType',
    fields: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});
