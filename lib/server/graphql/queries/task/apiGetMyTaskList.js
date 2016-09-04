import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import AcceptTaskModel from '../../../models/acceptTask';
import {acceptTaskType} from '../../types/acceptTask';
import {mediaType} from '../../types/media';

const PAGE_NUM = 10;

export const apiGetMyTaskListType = new GraphQLObjectType({
    name: 'apiGetMyTaskListType',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLID},
        address: {type: GraphQLString},
        description: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        acceptTime: {type: GraphQLString},
        submitTime: {type: GraphQLString},
        passTime: {type: GraphQLString},
        state: {type: GraphQLInt},
        images: {type: new GraphQLList(mediaType)},
        videos: {type: new GraphQLList(mediaType)},
    }
});

export default {
    type: new GraphQLList(apiGetMyTaskListType),
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
        const query = AcceptTaskModel.find({acceptor: params.userId, ...typeKeys[type]}).sort({[sortKeys[type]]: 'desc'}).skip(pageNo*PAGE_NUM).limit(PAGE_NUM);
        return query
        .populate({
            path: 'belongTask',
            select: {id:1, name: 1, address: 1, description: 1, reward: 1, startTime: 1, endTime: 1},
        })
        .populate({
            path: 'images',
            select: {id:1, name: 1, description: 1, time: 1, url: 1, thumb: 1},
        })
        .populate({
            path: 'videos',
            select: {id:1, name: 1, description: 1, time: 1, url: 1, thumb: 1},
        })
        .select({...projection, belongTask:1})
        .exec();
    }
};
