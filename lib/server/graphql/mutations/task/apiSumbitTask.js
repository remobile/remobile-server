import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
} from 'graphql';
import _ from 'lodash';
import {authorize} from '../../authorize';
import TaskModel from '../../../models/task';
import UserModel from '../../../models/user';
import AcceptTaskModel from '../../../models/acceptTask';
import {acceptTaskType} from '../../types/acceptTask';

export default {
    type: GraphQLBoolean,
    args: {
        userId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taskId: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const {userId, taskId} = params;

        return new Promise((_resolve, _reject) => {
             TaskModel.findById(taskId, {acceptList:1})
             .populate({
                 path: 'acceptList',
                 select: {acceptor: 1, state:1,},
                 populate: [{
                     path: 'acceptor',
                     select: {id:1, name:1, phone:1},
                 }]
             }).exec((err, doc)=>{
                 let task = _.find(doc.acceptList, o=>o.acceptor.id.toString()===userId);
                 task.set({state: 2}).save();
                 _resolve(true);
             });
         });
    }
};
