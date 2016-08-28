import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    /*
    * 对应的接受任务id
    */
    acceptTaskId: {
        type: mongoose.Schema.ObjectId,
        ref : 'AcceptTask',
        required: true,
    },
    /*
    * 名称
    */
    name: {
        type: String,
        required: true,
    },
    /*
    * 图片或者视频的描述
    */
    description: {
        type: String,
    },
    /*
    * 对应的url
    */
    url: {
        type: String,
    },
    /*
    * 缩略图
    */
    thumb: {
        type: String,
    },
    /*
    * 拍摄时间
    */
    time: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Media', mediaSchema);
