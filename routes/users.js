const router = require("express").Router();
const User = require("../models/User");
const { isAuthenticated } = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");

// @desc    Edit one user
// @route   PUT /users/:userId
// @access  Private
router.put("/edit/:userId", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { username, image } = req.body;
  if (username === "" || !username) {
    res.status(400).json({ message: "Fill username field" });
    return;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: username, image: image },
      { new: true }
    );
    if (updatedUser) {
      const payload = {
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role,
        _id: updatedUser._id,
        image: updatedUser.image,
        donated_total: updatedUser.donated_total,
        credits_wallet: user.credits_wallet,
      };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "30d",
      });
      res.status(201).json({ authToken: authToken });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Delete one user
// @route   DELETE /users/:userId
// @access  Private
router.delete("/edit/:userId", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
