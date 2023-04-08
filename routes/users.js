const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Edit one user
// @route   PUT /users/:userId
// @access  Private
router.put('/edit/:userId', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { username, image } = req.body;
  if (
    username === ""|| !username
   ) {
    res.status(400).json({ message: 'Fill the field' });
    return;
  }
  try {
    const response = await User.findByIdAndUpdate(userId, { username: username, image: image }, { new: true });
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one user
// @route   DELETE /users/:userId
// @access  Private
router.delete('/edit/:userId', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
