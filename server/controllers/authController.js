const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { userName, password, phone, pin, employeeNo, parentUser, role } = req.body;
        console.log(req.body);

        if (role === 'admin') {
            console.log('Registering as admin');
        } else if (role === 'user') {
            console.log('Registering as user');
        } else {
            return res.status(400).json({ error: 'Invalid role specified.' });
        }

        const newUser = new User({ userName, password, phone, pin, employeeNo, parentUser, role });

        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({ error: 'Username is already registered.' });
        }
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const adminRegister = async (req, res) => {
    try {
        const { userName, password, phone, pin, employeeNo, parentUser, role } = req.body;

        console.log(req.body);

        // Ensure the role is admin or superadmin
        if (role !== 'admin' && role !== 'superadmin') {
            return res.status(400).json({ error: 'Invalid role specified for admin registration.' });
        }

        const newUser = new User({ userName, password, phone, pin, employeeNo, parentUser, role });

        const existingUserName = await User.findOne({ userName });
        if (existingUserName) {
            return res.status(400).json({ error: 'Username is already registered.' });
        }
        await newUser.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName, password });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const encodedUserId = Buffer.from(String(user._id)).toString('base64');
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        res.cookie('auth', encodedUserId, {
            httpOnly: true,
            sameSite: true, // Adjust SameSite for environments
            secure: 'production',
            maxAge: oneDayInMilliseconds, // 1 day
        });

        user.lastLoggedInIP = req.ip;
        user.lastLoggedInTime = new Date().toLocaleString();
        await user.save();

        res.status(200).json({ message: 'Logged in successfully', role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName, password });
        if (!user) return res.status(401).json({ error: 'Invalid credentials or not authorized' });
        if (user.role !== 'admin' && user.role !== 'superadmin') {
            return res.status(401).json({ error: 'Invalid credentials or not authorized' });
        }



        const encodedUserId = Buffer.from(String(user._id)).toString('base64');
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        res.cookie('adminAuth', encodedUserId, {
            httpOnly: true,
            sameSite: true, // Adjust SameSite for environments
            secure: 'production',
            maxAge: oneDayInMilliseconds, // 1 day
        });

        user.lastLoggedInIP = req.ip;
        user.lastLoggedInTime = new Date().toLocaleString();
        await user.save();

        res.status(200).json({ message: 'Logged in successfully', role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('auth', {
        httpOnly: true,
        sameSite: 'None',
        secure: 'production'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const adminLogout = (req, res) => {
    res.clearCookie('adminAuth', {
        httpOnly: true,
        sameSite: 'None',
        secure: 'production'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const getSession = async (req, res) => {
    try {
        const loggedInUser = req.user;

        const user = await User.findById(loggedInUser._id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.lastActive = new Date().toLocaleString();
        await user.save();

        res.status(200).json({ message: 'Session active', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('parentUser', 'userName');

        const populatedUsers = users.map(user => ({
            ...user._doc,
            parentUserName: user.parentUser ? user.parentUser.userName : null
        }));

        res.status(200).json(populatedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const checkUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'User found' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login, adminLogin, logout, adminLogout, getSession, getAllUsers, checkUserById, adminRegister };