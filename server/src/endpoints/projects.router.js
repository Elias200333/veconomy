const router = require('express').Router();
const { faker } = require('@faker-js/faker'); // If you want to use faker data for testing
const Project = require('../orm/models/projects.model'); // Adjust the path to your Projects model

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

// Get a project by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({
    where: {
      ID: id
    }
  });
  res.json(project);
});

// Create a new project
router.post('/', async (req, res) => {
  const data = req.body;
  const createProject = await Project.create({
    Name: data.Name,
    Description: data.Description,
    Objective_Quantity: data.Objective_Quantity,
    // Add other fields as needed
  });
  res.json(createProject);
});

// Update a project by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updateProject = await Project.update(
    {
      Name: data.Name,
      Description: data.Description,
      Objective_Quantity: data.Objective_Quantity,
      // Add other fields as needed
    },
    {
      where: {
        ID: id
      }
    }
  );
  res.json(updateProject);
});

// Partially update a project by ID (using PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updateResult = await Project.update(data, {
    where: {
      ID: id
    }
  });
  res.json(updateResult);
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  const deleteProject = await Project.destroy({
    where: {
      ID: req.params.id
    }
  });
  res.json(deleteProject);
});

module.exports = router;
