import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import TaskModel from '../../../models/task';

const PAGE_NUM = 10;
const apiGetTaskListType = new GraphQLObjectType({
    name: 'apiGetTaskListType',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLID},
        address: {type: GraphQLString},
        description: {type: GraphQLString},
        reward: {type: GraphQLInt},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        acceptList: {type: new GraphQLList(GraphQLID)},
    }
});

export default {
    type: new GraphQLList(apiGetTaskListType),
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
