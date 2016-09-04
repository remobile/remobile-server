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
import TaskModel from '../../../models/task';
import {mediaType} from '../../types/media';
import _ from 'lodash';

const PAGE_NUM = 10;

export const apiGetTaskListType = new GraphQLObjectType({
    name: 'apiGetTaskListType',
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
    async resolve (root, params, options) {
        authorize(root);

        const {userId, type, pageNo} = {type:0, pageNo:0, ...params};
        const projection = getProjection(options.fieldASTs[0]);
        const query = TaskModel.find().sort({'startTime': 'desc'}).skip(pageNo*PAGE_NUM).limit(PAGE_NUM);

        let docs = await query
        .populate({
            path: 'acceptList',
            select: {id:1, acceptor: 1, acceptTime: 1, submitTime: 1, passTime: 1, state: 1, images: 1, videos: 1},
            populate: [{
                path: 'acceptor',
                select: {id:1, name:1},
            },{
                path: 'images',
                select: {id:1, name: 1, description: 1, url: 1, thumb: 1, time: 1},
            },{
                path: 'videos',
                select: {id:1, name: 1, description: 1, url: 1, thumb: 1, time: 1},
            }]
        })
        .select({...projection, acceptList:1})
        .exec();
        return _.map(docs, (doc)=>{
            let {acceptList} = doc;
            doc.acceptList = null;
            let task = _.find(acceptList, (item)=>{return item.acceptor._id.toString()===userId});
            if (task) {
                const {acceptTime, submitTime, passTime, state, images, videos} = task;
                Object.assign(doc, {acceptTime, submitTime, passTime, state, images, videos});
            }
            return doc;
        });
    }
};
