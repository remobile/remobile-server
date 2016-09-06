import {
    GraphQLID,
    GraphQLInt,    GraphQLList,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import {authorize} from '../../authorize';
import TaskModel from '../../../models/task';
import {taskType} from '../../types/task';
const PAGE_NUM = 10;

export default {
    type: new GraphQLList(taskType),
    args: {
        userId: {
            type: GraphQLID
        },
        type: {
            type: GraphQLInt
        },
        pageNo: {
            type: GraphQLInt
        },
    },
    resolve (root, params, options) {
        authorize(root);

        const {userId, type, pageNo} = {type:0, pageNo:0, ...params};
        const projection = getProjection(options.fieldASTs[0]);
        const query = TaskModel.find({}).sort({'startTime': 'desc'}).skip(pageNo*PAGE_NUM).limit(PAGE_NUM);

        return query
        .select(projection)
        .exec();
    }
};
