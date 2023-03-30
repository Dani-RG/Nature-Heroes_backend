const router = require('express').Router();
const User = require('../models/User');

// @desc    Get one user
// @route   GET /users/:userId
// @access  Private
router.get('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const project = await User.findById(userId);
    res.status(200).json(project);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one user
// @route   PUT /users/:userId
// @access  Private
router.put('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await User.findByIdAndUpdate(userId, req.body, { new: true });
    console.log(response)
    //res.redirect(`/users/${userId}`) ==> only to see on Postman if we edited right
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one user
// @route   DELETE /users/:userId
// @access  Private
router.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error)
  }
});

module.exports = router;