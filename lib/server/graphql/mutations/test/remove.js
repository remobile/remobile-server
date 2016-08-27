import getProjection from 'helpers/get-projection';
import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import authorize from '../../authorize';
import {testQueryType} from '../../types/test';
import TestModel from '../../../models/test';

var waiting = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        }, ms);
    });
}

export default {
  type: testQueryType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const removedTest = await TestModel
      .findByIdAndRemove(params.id, {
        select: getProjection(options.fieldASTs[0])
      })
      .exec();

      await waiting(1000);
    if (!removedTest) {
      throw new Error('Test not found');
    }

    return removedTest;
  }
};
