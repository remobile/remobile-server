import {
    GraphQLNonNull,
} from 'graphql';
import authorize from '../../authorize';
import VersionModel from '../../../models/version';
import {versionType, versionInputType} from '../../types/version';


export default {
    type: versionType,
    args: {
        data: {
            type: new GraphQLNonNull(versionInputType)
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
