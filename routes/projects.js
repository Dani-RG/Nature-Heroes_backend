const router = require('express').Router();
const Project = require('../models/Project');
const Donation = require('../models/Donation');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// PROJECTS

// @desc    Get all projects
// @route   GET /projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().populate('foundation');
    res.status(200).json(projects);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one project
// @route   GET /projects/:projectId
// @access  Public
router.get('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId).populate('foundation animal');
    res.status(200).json(project);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one project
// @route   POST /projects
// @access  Private - Admin
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
  const { foundation, animal } = req.body;
  if (
    foundation === "" || !foundation ||
    animal === "" || !animal
    ) {
    res.status(400).json({ message: 'All fields are necessary' });
    return;
  }
  try {
    const existingProject = await Project.findOne({ foundation, animal }).populate('foundation animal');
    if (existingProject) {
    res.status(400).send({ message: 'This project already exist' });
    } else {
      const newProject = await Project.create(req.body);
      res.status(201).json(newProject);
    }
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one project
// @route   PUT /projects/:projectId
// @access  Private - Admin
router.put('/:projectId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  const { foundation, animal } = req.body;
  if (foundation === "" || animal === "") {
    res.status(400).json({ message: 'All fields are necessary' });
    return;
  }
  try {
    const existingProject = await Project.findOne({ foundation, animal }).populate('foundation animal');
    if (existingProject) {
    res.status(400).send({ message: 'This project already exist' });
    } else {
    const response = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    res.status(204).json({ message: 'OK' });
    }
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one project
// @route   DELETE /projects/:projectId
// @access  Private - Admin
router.delete('/:projectId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    next(error)
  }
});

// PROJECTS DONATIONS

// @desc    Get all user donations
// @route   GET /donations
// @access  Private
router.get('/donations', isAuthenticated, async (req, res, next) => {
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
router.get('/donations/:donationId', isAuthenticated, async (req, res, next) => {
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
router.post('/donations/:projectId', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  const { projectId } = req.params;
  const { amount } = req.body;
  console.log('hola estoy aqui');

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
