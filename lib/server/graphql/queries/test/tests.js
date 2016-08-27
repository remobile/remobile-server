import getProjection from 'helpers/get-projection';
import {
  GraphQLList
} from 'graphql';

import {testQueryType} from '../../types/test';
import TestModel from '../../../models/test';

export default {
  type: new GraphQLList(testQueryType),
  args: {},
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    return TestModel.find().select(projection).exec();
  }
};
