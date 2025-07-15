import { connectToDB } from '../../utils/db';
import Todo from '../../models/Todo';

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === 'GET') {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  }

  if (req.method === 'POST') {
    const { text } = req.body;
    const newTodo = await Todo.create({ text, done: false });
    return res.status(201).json(newTodo);
  }

  if (req.method === 'PUT') {
    const { id, done } = req.body;
    const updated = await Todo.findByIdAndUpdate(id, { done }, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    await Todo.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
