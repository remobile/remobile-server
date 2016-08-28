import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    /*
    * 注册电话
    */
    phone: {
        type: String,
        required: true,
    },
    /*
    * 用户昵称
    */
    name: {
        type: String,
        trim: true
    },
    /*
    * 用户密码
    */
    password: {
        type: String
    },
    /*
    * 注册邮箱，用来找回密码
    */
    email: {
        type: String,
        trim: true
    },
    /*
    * 注册时间
    */
    date: {
        type: Date,
        default: Date.now
    },
    /*
    * 该用户的任务列表
    */
    taskList: [{
        type: Schema.Types.ObjectId,
        ref: 'AcceptTask',
    }],
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'phone'});
export default mongoose.model('User', userSchema);
