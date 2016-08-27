import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    reward: {
        type: Number,
        required: true,
    },
    state: {
        type: Number,
        default: 0,
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: Date.now
    },
    acceptTime: {
        type: Date,
        default: Date.now
    },
    submitTime: {
        type: Date,
        default: Date.now
    },
    passTime: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Task', taskSchema);
