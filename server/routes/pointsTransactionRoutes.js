// server/routes/pointsTransactionRoutes.js
const express = require('express');
const { getTransactionsByUser, createTransaction } = require('../controllers/transactionController');
const transactionRouter = express.Router();

// View all transactions for a user
transactionRouter.get('/:userId', getTransactionsByUser);
transactionRouter.post('/', createTransaction);

module.exports = transactionRouter;
