const router = require('express').Router();
// const Credit = require('../models/Credit');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET)

// @desc    Buy credits
// @route   POST /credits 
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'EUR',
      description: 'description',
      payment_method: id,
      confirm: true
    });

    console.log(payment);
    
    res.send({message: 'Succesfull payment'})
  } catch (error) {
    console.log(error);
    res.json({message: error.raw.message})
    next(error)
  }
});

module.exports = router;
