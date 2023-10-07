const router = require('express').Router();
const { faker } = require('@faker-js/faker'); // If you want to use Faker for generating random data

const User = require('../orm/models/users.model'); // Replace with the correct path to your User model

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({
      where: {
        ID: id,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const data = req.body;

  try {
    const createUser = await User.create({
      Name: data.Name,
      Surname: data.Surname,
      Email: data.Email,
      Rol_User: data.Rol_User,
    });

    res.json(createUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing user by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updateUser = await User.update(
      {
        Name: data.Name,
        Surname: data.Surname,
        Email: data.Email,
      },
      {
        where: {
          ID: id,
        },
      }
    );

    res.json(updateUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Partially update an existing user by ID
router.patch('/:id', async (req, res) => {
  const data = req.body;

  try {
    const dataUpdated = await User.update(data, {
      where: {
        ID: req.params.id,
      },
    });

    res.json(dataUpdated);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        ID: req.params.id,
      },
    });

    if (deleteUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
