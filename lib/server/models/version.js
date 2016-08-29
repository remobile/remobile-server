import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const versionSchema = new Schema({
    /*
    * android版本version name
    */
    verName: {
        type: String,
        required: true,
    },
    /*
    * android版本version code
    */
    verCode: {
        type: Number,
        required: true,
    },
    /*
    * android JS版本号
    */
    androidJsVersion: {
        type: Number,
        required: true,
    },
    /*
    * ios JS版本号
    */
    iosJsVersion: {
        type: Number,
        required: true,
    },
});

export default mongoose.model('Version', versionSchema);
