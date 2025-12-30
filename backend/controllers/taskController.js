const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const { search, status } = req.query;
    let filter = { userId: req.user.userId };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const task = new Task({
      title,
      description,
      userId: req.user.userId
    });

    await task.save();
    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status && ['pending', 'completed'].includes(status)) {
      task.status = status;
    }

    await task.save();
    res.json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
