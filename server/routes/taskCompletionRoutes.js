// server/routes/taskCompletionRoutes.js
const express = require('express');
const taskCompletedRouter = express.Router();
const { viewCompletedTasksByUser, viewUsersCompletedTask} = require('../controllers/taskCompletionController');

// View all tasks completed by a user
taskCompletedRouter.get('/user/:userId', viewCompletedTasksByUser);

// View all users who completed a specific task
taskCompletedRouter.get('/task/:taskId', viewUsersCompletedTask);

module.exports = taskCompletedRouter;
