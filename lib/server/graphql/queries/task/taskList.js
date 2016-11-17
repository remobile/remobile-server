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
    GraphQLUnionType,
} from 'graphql';
import {getProjection} from 'helpers/get-projection';
import {authorize} from '../../authorize';
import TaskModel from '../../../models/task';
import {taskType} from '../../types/task';
import _ from 'lodash';
const PAGE_NUM = 10;


const taskListAcceptTaskType = new GraphQLObjectType({
    name: 'taskListAcceptTaskType',
    fields: {
        _id: {type: GraphQLID},
        acceptTime: {type: GraphQLString},
        submitTime: {type: GraphQLString},
        passTime: {type: GraphQLString},
        state: {type: GraphQLInt},
        acceptorName: {type: GraphQLString},
        acceptorPhone: {type: GraphQLString},
    }
});

const taskListType = new GraphQLObjectType({
    name: 'taskListType',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLID},
        address: {type: GraphQLString},
        description: {type: GraphQLString},
        reward: {type: GraphQLFloat},
        startTime: {type: GraphQLString},
        endTime: {type: GraphQLString},
        fang: {type: GraphQLString},
        acceptList: {type: new GraphQLList(taskListAcceptTaskType)},
    }
});


export default {
    type: new GraphQLList(taskListType),
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
        // authorize(root);

        const {type, pageNo} = {type:0, pageNo:0, ...params};
        const projection = getProjection(options.fieldASTs[0]);
        const query = TaskModel.find({}).sort({'startTime': 'desc'}).skip(pageNo*PAGE_NUM).limit(PAGE_NUM);

        let docs = await query
        .select(projection)
        .populate({
            path: 'acceptList',
            select: {_id:1, acceptor: 1, acceptTime: 1, submitTime: 1, passTime: 1, state: 1,},
            populate: {
                path: 'acceptor',
                select: {_id:1, name:1, phone:1},
            }
        })
        .exec();
        let ret = _.map(docs, (doc)=>{
            let {acceptList} = doc;
            _.forEach(acceptList, (item)=>{
                let {acceptor} = item;
                item.acceptorName = acceptor.name;
                item.acceptorPhone = acceptor.phone;
            });
            return doc;
        });

        return ret;
    }
};
