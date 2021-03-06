import {
    GraphQLList,
} from 'graphql';
import {getProjection} from 'helpers/get-projection';
import {authorize} from '../../authorize';
import AdministratorModel from '../../../models/administrator';
import {administratorType,} from '../../types/administrator';

export default {
    type: new GraphQLList(administratorType),
    args: {},
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);
        const query = AdministratorModel.find({}).sort({'date': 'asc'});
        return query.select(projection).exec();
    }
};
