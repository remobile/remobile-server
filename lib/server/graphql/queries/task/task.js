import {
    GraphQLID,
} from 'graphql';
import getProjection from 'helpers/get-projection';
import authorize from '../../authorize';
import TaskModel from '../../../models/task';
import {taskType} from '../../types/task';

export default {
    type: taskType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve (root, params, options) {
        authorize(root);
        const projection = getProjection(options.fieldASTs[0]);

        return TaskModel
        .findById(params.id)
        .populate({
            path: 'acceptList',
            select: {_id:0, acceptor: 1, acceptTime: 1, submitTime: 1, passTime: 1, state: 1, images: 1, videos: 1},
            populate: [{
                path: 'images',
                select: {_id:0, name: 1, description: 1, url: 1, thumb: 1, time: 1},
            },{
                path: 'videos',
                select: {_id:0, name: 1, description: 1, url: 1, thumb: 1, time: 1},
            }]
        })
        .select(projection)
        .exec();
    }
};
