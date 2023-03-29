const router = require('express').Router();
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /projects
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find();
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
    const project = await Project.findById(projectId);
    res.status(200).json(project);
  } catch (error) {
    next(error)
  }
});

// @desc    Create one project
// @route   POST /projects
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    next(error)
  }
});

// @desc    Edit one project
// @route   PUT /projects/:projectId
// @access  Private
router.put('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const response = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    console.log(response)
    //res.redirect(`/projects/${projectId}`) ==> only to see on Postman if we edited right
    res.status(204).json({ message: 'OK' });
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one project
// @route   DELETE /projects/:projectId
// @access  Private
router.delete('/:projectId', async (req, res, next) => {
  const { projectId } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    res.status(200).json(deletedProject);
  } catch (error) {
    next(error)
  }
});

module.exports = router;