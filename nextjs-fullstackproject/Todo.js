import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
}, { timestamps: true });

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
