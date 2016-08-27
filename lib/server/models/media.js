import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
    taskID: {
        type: mongoose.Schema.ObjectId,
        ref : 'Task',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    thumb: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Media', mediaSchema);
