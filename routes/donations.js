const router = require('express').Router();
const Donation = require('../models/Donation');
const Project = require('../models/Project');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all user donations
// @route   GET /donations
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const donations = await Donation.find({user: userId});
    if (donations.length === 0) {
      res.status(404).json({ message: 'You have not made donations yet' });
      return;
    }
    res.status(200).json(donations);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one donation
// @route   GET /donations/:donationId
// @access  Private
router.get('/:donationId', isAuthenticated, async (req, res, next) => {
  const { donationId } = req.params;
  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      res.status(404).json({ message: 'Donation not found' });
      return;
    }
    res.status(200).json(donation);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one donation
// @route   POST /donations
// @access  Private
router.post('/:projectId', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { projectId } = req.params;
  const { amount } = req.body;
  if (amount <= 0 || !amount) {
    res.status(400).json({ message: 'Please specify your donation' });
    return;
  }
  try {
    const newDonation = await Donation.create({user: userId, project: projectId, amount: amount});
    console.log(newDonation)

    const project = await Project.findByIdAndUpdate(projectId, { $inc: { collected_donations: amount } }, {new:true});
    
    res.status(201).json({newDonation: newDonation, updatedProject: project});
    } catch (error) {
      next(error)
    }
});

module.exports = router;
