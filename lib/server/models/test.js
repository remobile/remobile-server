import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model('Test', testSchema);
