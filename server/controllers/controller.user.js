const User = require('../models/models.user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, interests, expertise } = req.body;

    const avatarUrl = req.file ? req.file.path : '';

    const user = new User({
      name,
      email,
      password,
      role,
      interests,
      expertise,
      avatarUrl,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;
    if (req.file) {
      updates.avatarUrl = req.file.path;
    }

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

