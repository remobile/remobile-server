import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

export const userQueryType = new GraphQLObjectType({
    name: 'USER_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        phone: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        status: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

export const userCreateType = new GraphQLInputObjectType({
    name: 'USER_CREATE_TYPE',
    fields: {
        _id: {type: GraphQLString},
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        status: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});
