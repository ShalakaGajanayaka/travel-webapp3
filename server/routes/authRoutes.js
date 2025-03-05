const express = require('express');
const { register, login, adminLogin, logout,adminLogout, getSession, checkUserById, adminRegister } = require('../controllers/authController');
const { authenticate, adminAuthenticate } = require('../middlewares/authenticate');

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/admin-login', adminLogin);
authRouter.post('/admin-register', adminRegister);
authRouter.post('/logout', authenticate, logout);
authRouter.post('/adminLogout', adminAuthenticate, adminLogout);
authRouter.get('/session', authenticate, getSession);
authRouter.get('/adminSession', adminAuthenticate, getSession);
authRouter.get('/check-user/:userId', authenticate, checkUserById);

module.exports = authRouter;