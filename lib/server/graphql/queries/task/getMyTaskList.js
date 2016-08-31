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
import AcceptTaskModel from '../../../models/task/acceptTask';

const PAGE_NUM = 10;

const getMyTaskListType = new GraphQLObjectType({
    name: 'getMyTaskListType',
    fields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        belongTask: {type: GraphQLID},
        acceptTime: {type: GraphQLString},
        submitTime: {type: GraphQLString},
        passTime: {type: GraphQLString},
        state: {type: GraphQLInt},
        images: {type: new GraphQLList(GraphQLID)},
        videos: {type: new GraphQLList(GraphQLID)},
    }
});

export default {
    type: new GraphQLList(getMyTaskListType),
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
        const sortKeys = ['acceptTime', 'passTime', 'acceptTime', 'submitTime'];
        //状态:          1:待提交， 2：待审核， 3：通过审核
        //类型:  0: 全部，1：待提交，2：待审核，3：有效任务
        const typeKeys = [{}, {state:1}, {state:2}, {state:3}];

        const projection = getProjection(options.fieldASTs[0]);
        const query = AcceptTaskModel.find({acceptor: params.userId, ...typeKeys}).sort({[sortKeys[type]]: 'desc'}).skip(pageNo*PAGE_NUM).limit(PAGE_NUM);

        return query
        .populate({
            path: 'belongTask',
            select: {_id:0, name: 1, address: 1, description: 1, reward: 1, startTime: 1, endTime: 1},
        })
        .populate({
            path: 'images',
            select: {_id:0, name: 1, description: 1, time: 1, url: 1, thumb: 1},
        })
        .populate({
            path: 'videos',
            select: {_id:0, name: 1, description: 1, time: 1, url: 1, thumb: 1},
        })
        .select(projection)
        .exec();
    }
};
