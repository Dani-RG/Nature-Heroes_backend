const router = require("express").Router();
const Stripe = require("stripe");
const User = require("../models/User");
const { isAuthenticated, isAdmin } = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");

const stripe = new Stripe(process.env.STRIPE_SECRET);

// @desc    Buy credits
// @route   POST /credits
// @access  Public
router.post("/", isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "description",
      payment_method: id,
      confirm: true,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { credits_wallet: amount / 100 } },
      { new: true }
    );

    if (user) {
      const payload = {
        email: user.email,
        username: user.username,
        role: user.role,
        _id: user._id,
        image: user.image,
        donated_total: user.donated_total,
        credits_wallet: user.credits_wallet,
      };
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "30d",
      });
      res.status(201).json({
        message: "Successful payment",
        authToken: authToken,
      });
    } else {
      res.status(500).json({ message: "An error occurred" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
    next(error);
  }
});

module.exports = router;
