// server/controllers/taskCompletionController.js
const TaskCompletion = require('../models/TaskCompletion');

// View all tasks completed by a user
async function viewCompletedTasksByUser(req, res) {
    const { userId } = req.params;

    try {
        // Find the task completions and populate the taskId field
        const taskCompletions = await TaskCompletion.find({ userId })
            .populate('taskId', 'title')  // Populate taskId with selected fields (e.g., title, description, points)
            .exec();

        if (taskCompletions.length === 0) {
            return res.status(404).json({ message: 'No tasks completed by this user' });
        }

        res.status(200).json({ taskCompletions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task completions', error });
    }
}

// View all users who completed a specific task
async function viewUsersCompletedTask(req, res) {
    const { taskId } = req.params;

    try {
        const taskCompletions = await TaskCompletion.find({ taskId });

        if (taskCompletions.length === 0) {
            return res.status(404).json({ message: 'No users have completed this task' });
        }

        res.status(200).json({ taskCompletions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users who completed the task', error });
    }
}

module.exports = {
    viewCompletedTasksByUser,
    viewUsersCompletedTask,
};
