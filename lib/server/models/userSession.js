import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    /*
    * 拥有session的用户
    */
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    /*
    * 登录时间
    */
    expires: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('UserSession', userSessionSchema);
