import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql';

export const testQueryType = new GraphQLObjectType({
    name: 'TEST_QUERY_TYPE',
    fields: {
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString}
    }
});

export const testCreateType = new GraphQLInputObjectType({
    name: 'TEST_CREATE_TYPE',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString}
    }
});
