const express = require('express');
const router = express.Router();
const User = require('./user');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { user_name, user_id, comment } = req.body;
        const user = new User({ user_name, user_id, comment });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error adding user to collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { user_name, user_id, comment } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { user_name, user_id, comment }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
