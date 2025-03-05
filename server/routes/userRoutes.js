// server/routes/taskRoutes.js
const express = require('express');
const { updateReferralNumber, updateUser, deleteUser, createWallet, getUserWallet, createWithdrawal, getWithdrawalsByUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');
const userRouter = express.Router();

userRouter.post('/create-wallet', authenticate, createWallet);
userRouter.get('/get-wallet', authenticate, getUserWallet);
userRouter.post('/update-ref', authenticate, updateReferralNumber);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', authenticate, deleteUser);
userRouter.post('/withdraw/:userId', createWithdrawal);
userRouter.get('/withdrawals/:userId', authenticate, getWithdrawalsByUser);

module.exports = userRouter;