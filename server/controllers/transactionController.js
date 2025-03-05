const Transactions = require('../models/Transactions');

async function createTransaction (req, res) {
    try {
        const { userId, createdBy, transaction, type } = req.body;

        // Create the transaction object
        const newTransaction = new Transactions({
            userId,
            createdBy,
            transaction,
            type
        });

        // Save the transaction to the database
        await newTransaction.save();

        // Respond with success message
        res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all transactions for a user
async function  getTransactionsByUser (req, res) {
    try {
        const { userId } = req.params; // Assume userId is passed as a URL parameter

        // Find all transactions related to this user
        const transactions = await Transactions.find({ userId }).populate('userId createdBy', 'userName phone'); // Populate references if needed

        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found for this user.' });
        }

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createTransaction,
    getTransactionsByUser,
};
