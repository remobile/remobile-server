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

export const errorType = new GraphQLObjectType({
    name: 'errorType',
    fields: {
        error: {type: GraphQLString},
    }
});
