const router = require('express').Router();
const { faker } = require('@faker-js/faker'); // If you want to use Faker for generating random data

const Area = require('../orm/models/areas.model'); // Replace with the correct path to your Areas model

// Get all areas
router.get('/', async (req, res) => {
  try {
    const areas = await Area.findAll();
    res.json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific area by Name
router.get('/:Name', async (req, res) => {
  const name = req.params.Name;

  try {
    const area = await Area.findOne({
      where: {
        Name: name,
      },
    });

    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ error: 'Area not found' });
    }
  } catch (error) {
    console.error('Error fetching area:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new area
router.post('/', async (req, res) => {
  const data = req.body;
  req.token = token()

  try {
    const createArea = await Area.create({
      Name: data.Name,
      Description: data.Description,
    });

    res.json(createArea);
  } catch (error) {
    console.error('Error creating area:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing area by Name
router.put('/:Name', async (req, res) => {
  const name = req.params.Name;
  const data = req.body;

  try {
    const updateArea = await Area.update(data, {
      where: {
        Name: name,
      },
    });

    res.json(updateArea);
  } catch (error) {
    console.error('Error updating area:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an area by Name
router.delete('/:Name', async (req, res) => {
  const name = req.params.Name;

  try {
    const deleteArea = await Area.destroy({
      where: {
        Name: name,
      },
    });

    if (deleteArea) {
      res.json({ message: 'Area deleted successfully' });
    } else {
      res.status(404).json({ error: 'Area not found' });
    }
  } catch (error) {
    console.error('Error deleting area:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
