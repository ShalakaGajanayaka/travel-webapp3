const Task = require('../models/Task');
const User = require('../models/User');

// Add a new task
async function addTask(req, res) {
  const { title, description, points, link } = req.body;

  try {
    const newTask = new Task({
      title,
      link,
      description,
      points,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
}

// Update an existing task
async function updateTask(req, res) {
  const { taskId } = req.params;
  const { title, description, points } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      points,
    }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
}

// Delete a task
async function deleteTask(req, res) {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
}

async function assignTasks(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get random 16 tasks where tie is false
    const tasks = await Task.aggregate([
      { $match: { tie: false } }, // Filter tasks where tie is false
      { $sample: { size: 16 } }   // Randomly select 16 tasks
    ]);

    if (tasks.length < 16) {
      return res.status(400).json({ message: "Not enough available tasks" });
    }

    user.tasks = tasks.map((task) => ({ taskId: task._id, completed: false }));
    user.currentTaskIndex = 0; // Reset task progress
    await user.save();

    res.status(200).json({ message: "Tasks assigned", tasks: user.tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Replace a specific task (e.g., task 1 to 16)
async function replaceTask(req, res) {
  try {
    const { taskIndex, newTaskId } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user || taskIndex < 0 || taskIndex >= 16)
      return res.status(400).json({ message: "Invalid request" });

    user.tasks[taskIndex] = { taskId: newTaskId, completed: false };
    await user.save();

    res.json({ message: "Task replaced", tasks: user.tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete a task (only sequential)
async function completeTask(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate("tasks.taskId");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.permissions.doTasks) return res.status(400).json({ message: "You are not allowed to perform tasks" });

    const taskIndex = user.currentTaskIndex;
    if (taskIndex >= 16) return res.status(400).json({ message: "All tasks completed" });

    if (user.totalEarnings <= 0) return res.status(400).json({ message: "Recharge your account" });

    user.tasks[taskIndex].completed = true;
    user.tasks[taskIndex].status = 'completed';

    const taskValue = user.tasks[taskIndex].taskId.value;
    const taskProfit = user.tasks[taskIndex].taskId.profit;
    
    user.totalEarnings = parseFloat((user.totalEarnings + taskValue + taskProfit).toFixed(2));
    user.totalProfit = parseFloat((user.totalProfit + taskProfit).toFixed(2));

    if (user.parentUser != null) {
      const parentUser = await User.findById(user.parentUser);
      parentUser.totalEarnings += ((user.tasks[taskIndex].taskId.profit) / 3);
      await parentUser.save();
    }

    user.currentTaskIndex += 1;
    await user.save();

    res.json({
      message: "Task completed",
      totalEarnings: user.totalEarnings,
      nextTaskIndex: user.currentTaskIndex,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function takeTaskInternal(userId) {
  try {
    const user = await User.findById(userId).populate("tasks.taskId");
    if (!user) return { success: false, message: "User not found" };

    const taskIndex = user.currentTaskIndex;

    if (taskIndex >= 16) return { success: false, message: "All tasks completed" };

    const task = user.tasks[taskIndex];
    if (task.completed) {
      return { success: false, message: "Task already completed" };
    }
    if (task.status === "pending") {
      return { success: false, message: "Task already taken, go to history and complete the task" };
    }

    const taskProfit = task.taskId.value;
    user.totalEarnings -= taskProfit;
    user.tasks[taskIndex].status = 'pending';
    await user.save();

    return { success: true, message: "Task taken successfully" };

  } catch (error) {
    return { success: false, message: error.message };
  }
}


async function takeTask(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate("tasks.taskId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const taskIndex = user.currentTaskIndex;
    if (user.totalEarnings <= 0) return res.status(400).json({ message: "Recharge your account" });

    if (taskIndex >= 16) return res.status(400).json({ message: "All tasks completed" });

    const task = user.tasks[taskIndex];
    if (task.completed) {
      return res.status(400).json({ message: "Task already completed" });
    }
    if (task.status === "pending") {
      return res.status(400).json({ message: "Task already taken, Go to history and complete the task" });
    }
    const taskProfit = task.taskId.value;
    user.totalEarnings -= taskProfit;
    user.tasks[taskIndex].status = 'pending';
    await user.save();

    res.status(200).json({
      message: "Task taken",
      totalEarnings: user.totalEarnings,
      nextTaskIndex: user.currentTaskIndex,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function fetchTasks(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate("tasks.taskId");
    if (!user) return res.status(404).json({ message: "User not found" });
    const taskIndex = user.currentTaskIndex;
    res.json({
      tasks: user.tasks[taskIndex],
      totalEarnings: user.totalEarnings,
      currentTaskIndex: user.currentTaskIndex,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function fetchTasksForUser(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate("tasks.taskId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      tasks: user.tasks, // Return all tasks
      totalEarnings: user.totalEarnings,
      currentTaskIndex: user.currentTaskIndex,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



async function fetchAllTasks(req, res) {
  try {
    const tasks = await Task.find({ tie: true }); // Fetch only tasks where tie is true

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks with tie=true found" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  addTask, updateTask, deleteTask, completeTask, assignTasks, replaceTask, fetchTasks, takeTask, fetchAllTasks, fetchTasksForUser
};
