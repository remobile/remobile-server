import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

export const administratorCreateType = new GraphQLInputObjectType({
    name: 'ADMINISTRATOR_CREATE_TYPE',
    fields: {
        _id: {type: GraphQLString},
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        authority: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

export const administratorQueryType = new GraphQLObjectType({
    name: 'ADMINISTRATOR_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        username: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        authority: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});
