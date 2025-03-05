const express = require('express');
const { addTask, updateTask, deleteTask, completeTask, assignTasks, replaceTask, fetchTasks, takeTask, fetchAllTasks, fetchTasksForUser } = require('../controllers/taskController');
const taskRouter = express.Router();

taskRouter.post('/', addTask);
taskRouter.get('/', fetchAllTasks);
taskRouter.put('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);
taskRouter.post('/complete/:userId', completeTask);
taskRouter.get('/:userId', fetchTasks);
taskRouter.get('/all-for-user/:userId', fetchTasksForUser);
taskRouter.post("/assign/:userId", assignTasks);
taskRouter.put("/replace/:userId", replaceTask);
taskRouter.put("/complete/:userId", completeTask);
taskRouter.patch('/take-task/:userId', takeTask);

module.exports = taskRouter;