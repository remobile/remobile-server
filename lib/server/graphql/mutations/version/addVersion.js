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
import authorize from '../../authorize';
import VersionModel from '../../../models/version';


const addVersionInputType = new GraphQLInputObjectType({
    name: 'addVersionInputType',
    fields: {
        verName: {type: GraphQLString},
        verCode: {type: GraphQLString},
        androidJsVersion: {type: GraphQLString},
        iosJsVersion: {type: GraphQLString},
    }
});
const addVersionType = new GraphQLObjectType({
    name: 'addVersionType',
    fields: {
        id: {type: GraphQLID},
        verName: {type: GraphQLString},
        verCode: {type: GraphQLString},
        androidJsVersion: {type: GraphQLString},
        iosJsVersion: {type: GraphQLString},
        date: {type: GraphQLString},
    }
});

export default {
    type: addVersionType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(addVersionInputType)
        }
    },
    async resolve (root, params) {
        authorize(root);

        const versionModel = new VersionModel(params.data);
        const version = await versionModel.save();

        if (!version) {
            throw new Error('Error adding new version');
        }

        return version;
    }
};
