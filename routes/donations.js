const router = require('express').Router();
const Donation = require('../models/Donation');
const Project = require('../models/Project');
const Foundation = require('../models/Foundation');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all user donations
// @route   GET /donations
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id;
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

// YO NO QUIERO HACER UN FORM CON SELECCIONABLES PARA DONAR, QUIERO HACER UNA ESPECIE DE LIKE, QUE AL CLICKEAR COGA EL ID DEL ANIMAL, LUEGO ENCUENTRE EL PROYECTO DONDE ESTA EL ANIMAL, LA FUNDACION QUE ESTA ASOCIADA A ESE PROYECTO, Y EL LIKE/DONACION SE REGISTRE EN ESA FUNDACION.

router.post('/:animalId', isAuthenticated, async (req, res, next) => {
  //const { user, project, amount } = req.body;
  const { animalId } = req.params;
  const { amount } = req.body;
  const user = req.payload._id;
  // const credits = user.credits ?? O CREDITS ES UN MODELO APARTE ??
  try {
    const projects = await Project.find({ animal : animalId });
    console.log(projects);
    } catch (error) {
      next(error)
    }
  try {
    const foundations = await Foundation.find({ _id : project.foundation }); // RECORRER EL ARRAY DE PROJECTS ??
    console.log(foundations);
    } catch (error) {
      next(error)
    }
  if (amount <= 0 || amount === null) { //////////////
    res.status(400).json({ message: 'Please specify your donation' });
    return;
  }
  // if (credits === 0 ) {
  //   res.status(400).json({ message: 'Your credits are empty!' });
  //   return;
  // }
  try {
    const newDonation = await Donation.create(req.body); // FALTAN DATOS QUE PASARLE AL BODY O QUE NO SEA BODY SINO UNA NUEVA VARIABLE QUE CONTENGA LAS PROPIEDADES DE DONATION.
    // CHECK DE QUE SE LE HAN PASADO TODAS LAS PROPS.
    res.status(201).json(newDonation);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
