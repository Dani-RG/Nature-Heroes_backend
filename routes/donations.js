const router = require('express').Router();
const Donation = require('../models/Donation');

// @desc    Get all donations
// @route   GET /donations
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one donation
// @route   GET /donations/:donationId
// @access  Public
router.get('/:donationId', async (req, res, next) => {
  const { donationId } = req.params;
  try {
    const donation = await Donation.findById(donationId);
    res.status(200).json(donation);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one donation
// @route   POST /donations
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const newDonation = await Donation.create(req.body);
    res.status(201).json(newDonation);
  } catch (error) {
    next(error)
  }
});

module.exports = router;