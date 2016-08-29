import getProjection from 'helpers/get-projection';
import {
    GraphQLList
} from 'graphql';

import {versionQueryType} from '../../types/version';
import VersionModel from '../../../models/version';

export default {
    type: new GraphQLList(versionQueryType),
    args: {},
    resolve (root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return VersionModel.find().select(projection).exec();
    }
};
