import {
    GraphQLNonNull,
} from 'graphql';

import _ from 'lodash';
import {authorizeApi} from '../../authorize';
import MediaModel from '../../../models/media';
import TaskModel from '../../../models/task';
import {mediaInputType} from '../../types/media';
import {errorType} from '../../types/error';

export default {
    type: errorType,
    args: {
        data: {
            type: new GraphQLNonNull(mediaInputType)
        }
    },
    async resolve (root, params) {
        if (!await authorizeApi(params)) {
            return {error: 'Unauthorized'};
        }
        const {taskId, userId, ...param} = params.data;
        const task = await TaskModel.findById(taskId)
        .populate({
            path: 'acceptList',
            select: {id:1, acceptor: 1, images: 1, videos: 1},
            populate: [{
                path: 'acceptor',
                select: {id:1},
            }]
        }).exec();
        let acceptTask = _.find(task.acceptList, (item)=>{return item.acceptor._id.toString()===userId});
        const mediaModel = new MediaModel({...param, acceptTaskId:acceptTask._id});
        const media = await mediaModel.save();
        if (!media) {
            throw new Error('Error adding new media');
        }
        const {images, videos} = acceptTask;
        if (param.type === 0) { //image
            images.push(media._id);
        } else {
            videos.push(media._id);
        }
        acceptTask.save();

        return {error: null};
    }
};
