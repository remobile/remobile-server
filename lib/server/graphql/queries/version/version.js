import {
    GraphQLID,
} from 'graphql';
import {getProjection} from 'helpers/get-projection';
import VersionModel from '../../../models/version';
import {versionType} from '../../types/version';

export default {
    type: versionType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        const id = params.id || root.administrator.id;

        return VersionModel
        .findById(id)
        .select(projection)
        .exec();
    }
};
