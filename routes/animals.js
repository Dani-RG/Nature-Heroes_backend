const router = require('express').Router();
const Animal = require('../models/Animal');
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');

// @desc    Get all animals
// @route   GET /animals
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    next(error)
  }
});

// @desc    Get one animal
// @route   GET /animals/:animalId
// @access  Public
router.get('/:animalId', async (req, res, next) => {
  const { animalId } = req.params;
  try {
    const animal = await Animal.findById(animalId);
    res.status(200).json(animal);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one animal
// @route   POST /animals
// @access  Private - Admin
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
  const {
    common_name,
    scientific_name,
    class_name,
    family_name,
    habitat_type,
    population,
    species_status,
    image,
    database_link
  } = req.body;
  if (
    common_name === "" || !common_name ||
    scientific_name === "" || !scientific_name ||
    class_name === "" || !class_name ||
    family_name === "" || !family_name ||
    habitat_type === "" || !habitat_type ||
    population < 0 || population === undefined || !population ||
    species_status === "" || !species_status ||
    image === "" || !image ||
    database_link === "" || !database_link
    ) {
      res.status(400).json({ message: 'All fields are necessary' });
      return;
    } 
  try {
    const newAnimal = await Animal.create(req.body);
        res.status(201).json(newAnimal);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one animal
// @route   PUT /animals/:animalId
// @access  Private - Admin
router.put('/:animalId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { animalId } = req.params;
  const {
    common_name,
    scientific_name,
    class_name,
    family_name,
    habitat_type,
    population,
    species_status,
    image,
    database_link
  } = req.body;
  if (
    common_name === "" || !common_name ||
    scientific_name === "" || !scientific_name ||
    class_name === "" || !class_name ||
    family_name === "" || !family_name ||
    habitat_type === "" || !habitat_type ||
    population < 0 || population === undefined || !population ||
    species_status === "" || !species_status ||
    image === "" || !image ||
    database_link === "" || !database_link
    ) {
      res.status(400).json({ message: 'All fields are necessary' });
      return;
    } 
  try {
    const response = await Animal.findByIdAndUpdate(animalId, req.body, { new: true });
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one animal
// @route   DELETE /animals/:animalId
// @access  Private - Admin
router.delete('/:animalId', isAuthenticated, isAdmin, async (req, res, next) => {
  const { animalId } = req.params;
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(animalId);
    res.status(200).json({ message: 'Removed animal record' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
