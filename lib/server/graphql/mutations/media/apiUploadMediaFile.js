import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,    GraphQLBoolean,
    GraphQLList,
} from 'graphql';

import authorize from '../../authorize';
import MediaModel from '../../../models/media';
import AcceptTaskModel from '../../../models/acceptTask';


const apiUploadMediaFileInputType = new GraphQLInputObjectType({
    name: 'apiUploadMediaFileInputType',
    fields: {
        acceptTaskId: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type:  new GraphQLNonNull(GraphQLString)},
        url: {type:  new GraphQLNonNull(GraphQLString)},
        thumb: {type:  GraphQLString},
        time: {type:  new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLInt)},
    }
});

const apiUploadMediaFileType = new GraphQLObjectType({
    name: 'apiUploadMediaFileType',
    fields: {
        id: {type: GraphQLID},
        acceptTaskId: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        url: {type: GraphQLString},
        thumb: {type: GraphQLString},
        time: {type: GraphQLString},
    }
});


export default {
    type: apiUploadMediaFileType,
    args: {
        data: {
            type: new GraphQLNonNull(apiUploadMediaFileInputType)
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
