// server/models/TaskCompletion.js
const mongoose = require('mongoose');

const TaskCompletionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    taskId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task', 
        required: true 
    },
    completedAt: { 
        type: Date, 
        default: Date.now 
    },
    pointsEarned: { 
        type: Number, 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('TaskCompletion', TaskCompletionSchema);
