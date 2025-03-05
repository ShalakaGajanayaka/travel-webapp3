const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    employeeNo: {
        type: String,
        required: true
    },
    // referralNo: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    parentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'], // Add 'superadmin' here
        required: true
    },
    lastLoggedInIP: {
        type: String
    },
    lastLoggedInTime: {
        type: String
    },
    lastActive: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;