import {
    GraphQLList,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import VersionModel from '../../../models/version';
import {versionType} from '../../types/version';

export default {
    type: new GraphQLList(versionType),
    args: {},
    resolve (root, params, options) {
        authorize(root);

        const projection = getProjection(options.fieldASTs[0]);
        return VersionModel.find().select(projection).exec();
    }
};
