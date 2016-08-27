import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Strategy} from 'passport-local';

const administratorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    //权限为0-9，0为最高级别，默认为9
    authority: {
        type: Number,
        default: 9,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

administratorSchema.plugin(passportLocalMongoose);
const AdministratorModel = mongoose.model('Administrator', administratorSchema);

passport.use(new Strategy(AdministratorModel.authenticate()));
passport.serializeUser(AdministratorModel.serializeUser());
passport.deserializeUser(AdministratorModel.deserializeUser());

export default AdministratorModel;
