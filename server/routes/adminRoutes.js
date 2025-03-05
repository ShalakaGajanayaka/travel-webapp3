// server/routes/taskRoutes.js
const express = require('express');
const { getAllUsers } = require('../controllers/authController');
const { authorize } = require('../middlewares/authenticate');
const adminRouter = express.Router();

adminRouter.get('/users', getAllUsers);

module.exports = adminRouter;