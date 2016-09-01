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
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import UserModel from '../../../models/user';

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

export default {
    type: userType,
    args: {
        id: {
            name: 'id',
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        let id = params.id;

        return UserModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
