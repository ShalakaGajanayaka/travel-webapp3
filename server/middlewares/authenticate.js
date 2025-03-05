const User = require('../models/User'); // Assuming you have a User model

const authenticate = async (req, res, next) => {
    const userId  = req.cookies.auth;
    
    if (!userId) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    
    const decodedUserId = Buffer.from(userId, 'base64').toString('utf-8');

    const user = await User.findById(decodedUserId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user = user;
    next();
};

const adminAuthenticate = async (req, res, next) => {
    const userId  = req.cookies.adminAuth;
    
    if (!userId) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    
    const decodedUserId = Buffer.from(userId, 'base64').toString('utf-8');

    const user = await User.findById(decodedUserId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user = user;
    next();
};

// Middleware to restrict access based on roles
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not logged in' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next(); // Proceed to the next middleware or route handler
    };
};

module.exports = { authenticate, adminAuthenticate, authorize };
