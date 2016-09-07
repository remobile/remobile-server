import {
    GraphQLUnionType,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {errorType} from '../../types/error';

let personType = new GraphQLObjectType({
    name: 'personType',
    fields: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    },
});

let getPersonType = new GraphQLUnionType({
    name: 'getPersonType',
    types: [errorType, personType],
    resolveType: (value) => {
        if (value.error) {
            return errorType;
        }
        return personType;
    },
});


export default {
    type: getPersonType,
    args: {
        userId: {type: GraphQLID}
    },
    resolve (root, params, options) {
        // authorize(root);
        return {error: 'UnKown'}
        // return {name: params.userId, age: 12}
    }
};
