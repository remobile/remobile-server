import {
    GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import {versionQueryType, versionCreateType} from '../../types/version';
import VersionModel from '../../../models/version';


export default {
    type: versionQueryType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(versionCreateType)
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
