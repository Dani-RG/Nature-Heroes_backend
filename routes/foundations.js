const router = require('express').Router();
const Foundation = require('../models/Foundation');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// @desc    Get all foundations
// @route   GET /foundations
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const foundations = await Foundation.find();
    res.status(200).json(foundations);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one foundation
// @route   GET /foundations/:foundationId
// @access  Public
router.get('/:foundationId', async (req, res, next) => {
  const { foundationId } = req.params;
  try {
    const foundation = await Foundation.findById(foundationId);
    res.status(200).json(foundation);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one foundation
// @route   POST /foundations
// @access  Private - Admin
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
  const { name, acronym, description, logo } = req.body;
  if (
    name === "" || !name ||
    acronym === "" || !acronym ||
    description === "" || !description ||
    logo === "" || !logo
    ) {
    res.status(400).json({ message: 'All fields are necessary' });
    return;
  }
  try {
    const existingFoundation = await Foundation.findOne({ name, acronym });
    if (existingFoundation) {
    res.status(400).send({ message: 'This foundation is already registered' });
    } else {
    const newFoundation = await Foundation.create(req.body);
    res.status(201).json(newFoundation);
    }
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one foundation
// @route   PUT /foundations/:foundationId
// @access  Private - Admin
router.put('/:foundationId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { foundationId } = req.params;
  const { name, acronym, description, logo } = req.body;
  if (
    name === "" || !name ||
    acronym === "" || !acronym ||
    description === "" || !description ||
    logo === "" || !logo
    ) {
    res.status(400).json({ message: 'All fields are necessary' });
    return;
  }
  try {
    const existingFoundation = await Foundation.findOne({ name, acronym });
    if (existingFoundation) {
    res.status(400).send({ message: 'This foundation is already registered' });
    } else {
    const response = await Foundation.findByIdAndUpdate(foundationId, req.body, { new: true });
    res.status(204).json({ message: 'OK' });
    }
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one foundation
// @route   DELETE /foundations/:foundationId
// @access  Private - Admin
router.delete('/:foundationId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { foundationId } = req.params;
  try {
    const deletedFoundation = await Foundation.findByIdAndDelete(foundationId);
    res.status(200).json({ message: 'Foundation deleted' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
