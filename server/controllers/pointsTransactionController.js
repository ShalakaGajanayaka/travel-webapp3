// server/controllers/pointsTransactionController.js
const PointsTransaction = require('../models/PointsTransaction');

// View all transactions for a user
async function viewTransactionsByUser(req, res) {
    const { userId } = req.params;

    try {
        const transactions = await PointsTransaction.find({ userId })
        .populate('taskId')  // Populate taskId with selected fields (e.g., title, description, points)
        .exec();;

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
}

// View a specific transaction by its ID
async function viewTransactionById(req, res) {
    const { transactionId } = req.params;

    try {
        const transaction = await PointsTransaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction', error });
    }
}

module.exports = {
    viewTransactionsByUser,
    viewTransactionById,
};
