const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get one user
// @route   GET /users/:userId
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one user
// @route   PUT /users/:userId
// @access  Private
router.put('/', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { email, username, image } = req.body;
  if (
    email === "" || !email ||
    username === ""|| !username
   ) {
    res.status(400).json({ message: 'All fields are necessary' });
    return;
  }
  try {
    const response = await User.findByIdAndUpdate(userId, { email: email, username: username, image: image }, { new: true });
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one user
// @route   DELETE /users/:userId
// @access  Private
router.delete('/', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
