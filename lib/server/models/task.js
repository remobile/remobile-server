import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    /*
    * 任务名称
    */
    name: {
        type: String,
        required: true,
    },
    /*
    * 任务执行的地址
    */
    address: {
        type: String,
        required: true,
    },
    /*
    * 任务要求
    */
    description: {
        type: String,
        required: true,
    },
    /*
    * 任务赏金
    */
    reward: {
        type: Number,
        required: true,
    },
    /*
    * 任务开始时间
    */
    startTime: {
        type: Date,
        default: Date.now
    },
    /*
    * 任务结束时间
    */
    endTime: {
        type: Date,
        default: Date.now
    },
    /*
    * 该任务被接受的列表
    */
    acceptList: [{
        type: Schema.Types.ObjectId,
        ref: 'AcceptTask',
    }],
});

export default mongoose.model('Task', taskSchema);
