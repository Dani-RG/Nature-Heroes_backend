const router = require('express').Router();
// const Credit = require('../models/Credit');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// @desc    Buy credits
// @route   POST /credits 
// @access  Public
// router.post('/', isAuthenticated, async (req, res, next) => {
//   try {
//     console.log(req.body);
//     res.send('received')
//   } catch (error) {
//     next(error)
//   }
// });

router.post('/', (req, res, next) => {
  try {
    console.log(req.body);
    res.send('received')
  } catch (error) {
    next(error)
  }
});

module.exports = router;
