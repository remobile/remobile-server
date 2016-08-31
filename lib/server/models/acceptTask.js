import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const acceptTaskSchema = new Schema({
    /*
    * 接受任务的用户
    */
    acceptor: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    /*
    * 隶属玉哪个任务
    */
    belongTask: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
    },
    /*
    * 接受任务的时间
    */
    acceptTime: {
        type: Date,
        default: Date.now
    },
    /*
    * 提交任务的时间
    */
    submitTime: {
        type: Date,
        default: Date.now
    },
    /*
    * 任务通过的时间
    */
    passTime: {
        type: Date,
        default: Date.now
    },
    /*
    * 任务状态[ 1:待提交， 2：待审核， 3：通过审核]
    */
    state: {
        type: Number,
        default: 1,
    },
    /*
    * 提交的图片
    */
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Media',
    }],
    /*
    * 提交的图片
    */
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Media',
    }],
});

export default mongoose.model('AcceptTask', acceptTaskSchema);
