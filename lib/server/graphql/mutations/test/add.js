import {
    GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import {testQueryType, testCreateType} from '../../types/test';
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
        data: {
            name: 'data',
            type: new GraphQLNonNull(testCreateType)
        }
    },
    async resolve (root, params) {
        authorize(root);

        const testModel = new TestModel(params.data);
        const test = await testModel.save();
        await waiting(1000);

        if (!test) {
            throw new Error('Error adding new test');
        }

        return test;
    }
};
