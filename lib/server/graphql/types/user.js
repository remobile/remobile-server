import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} from 'graphql';

export const userCreateType = new GraphQLInputObjectType({
    name: 'USER_CREATE_TYPE',
    fields: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

export const userQueryType = new GraphQLObjectType({
    name: 'USER_QUERY_TYPE',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        phone: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        state: {type: GraphQLInt},
        date: {type: GraphQLString},
        taskList: {type: new GraphQLList(GraphQLID)},
    }
});
