// server/models/Transactions.js
const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    completedAt: { 
        type: Date, 
        default: Date.now 
    },
    transaction: { 
        type: Number, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Transactions', TransactionsSchema);