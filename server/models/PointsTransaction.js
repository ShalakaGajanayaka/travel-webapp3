// server/models/PointsTransaction.js
const mongoose = require('mongoose');

const PointsTransactionSchema = new mongoose.Schema({
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
    pointsEarned: { 
        type: Number, 
        required: true 
    },
    transactionType: { 
        type: String, // 'earn' or 'spend'
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('PointsTransaction', PointsTransactionSchema);
