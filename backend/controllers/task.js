import Task from '../models/task.js';

export const getAllTasks = async (req, res) => {
    const { col_id } = req.params;
    try {
        const tasks = await Task.findAll({ where: { collectionId: col_id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTask = async (req, res) => {
    const { col_id } = req.params;
    const { title, date, subtasks, completed } = req.body;
    try {
        const task = await Task.create({ title,date, completed ,subtasks, collectionId: col_id });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { col_id, id } = req.params;
    const { title, completed } = req.body;
    try {
        const task = await Task.findOne({ where: { id, collectionId: col_id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = title;
        task.completed = completed;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { col_id, id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, collectionId: col_id } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.status(204).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
