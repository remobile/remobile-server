import getProjection from 'helpers/get-projection';
import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import {versionQueryType} from '../../types/version';
import VersionModel from '../../../models/version';

export default {
    type: versionQueryType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, params, options) {
        authorize(root);

        const removedVersion = await VersionModel
        .findByIdAndRemove(params.id, {
            select: getProjection(options.fieldASTs[0])
        })
        .exec();
        if (!removedVersion) {
            throw new Error('Version not found');
        }

        return removedVersion;
    }
};
