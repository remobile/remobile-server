import {GraphQLInt} from 'graphql';

import authorize from '../../authorize';
import AdministratorModel from '../../../models/administrator';

export default {
    type: GraphQLInt,
    args: {},
    async resolve (root) {
        authorize(root);
        return await AdministratorModel.count();
    }
};
