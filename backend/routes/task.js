import express from 'express';

import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/task.js';

const router = express.Router({
    mergeParams: true
});

router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
