import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        trim: true
    },
    //用户状态：0：正常，1：冻结
    status: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'phone'});
export default mongoose.model('User', userSchema);
