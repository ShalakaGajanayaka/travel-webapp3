const express = require('express');
const authRouter = require('./authRoutes');
const taskRouter = require('./taskRoutes');
const taskCompletedRouter = require('./taskCompletionRoutes');
const transactionRouter = require('./pointsTransactionRoutes');
const userRouter = require('./userRoutes');
const { authenticate } = require('../middlewares/authenticate');
const adminRouter = require('./adminRoutes');

const router = express.Router();

// Consolidate all routes under `/api`
router.use('/auth', authRouter);
router.use('/tasks', taskRouter);
router.use('/tasks/completed', taskCompletedRouter);
router.use('/transactions', transactionRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);

router.get('/test', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running successfully! 🚀' });
});

module.exports = router;
