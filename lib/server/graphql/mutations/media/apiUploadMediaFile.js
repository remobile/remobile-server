import {
    GraphQLNonNull,
} from 'graphql';

import authorize from '../../authorize';
import MediaModel from '../../../models/media';
import AcceptTaskModel from '../../../models/acceptTask';
import {mediaType, mediaInputType} from '../../types/media';

export default {
    type: mediaType,
    args: {
        data: {
            type: new GraphQLNonNull(mediaInputType, mediaType)
        }
    },
    async resolve (root, params) {
        authorize(root);
        const {acceptTaskId, type} = params.data;
        const mediaModel = new MediaModel(params.data);
        const media = await mediaModel.save();
        if (!media) {
            throw new Error('Error adding new media');
        }

        //更改任务图片或者视频列表
        const task = await AcceptTaskModel.findByIdAndUpdate(acceptTaskId, {$push: type===0?{images: media._id}:{videos: media._id}}, {
            new: true,
        }).exec();
        if (!task) {
            throw new Error('Error find no task');
        }

        return media;
    }
};
