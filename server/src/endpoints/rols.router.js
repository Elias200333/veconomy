const router = require('express').Router();
const Rol = require('../orm/models/rols.model');

// ...

// GET all Rols
router.get('/rols', async (req, res) => {
  try {
    const rols = await Rol.findAll();
    res.json(rols);
  } catch (error) {
    console.error("Error fetching rols:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a specific Rol by ID
router.get('/rols/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const rol = await Rol.findOne({
      where: {
        nameRole: id
      }
    });
    res.json(rol);
  } catch (error) {
    console.error("Error fetching rol:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new Rol
router.post('/rols', async (req, res) => {
  const data = req.body;
  try {
    const createRol = await Rol.create({
      nameRole: data.nameRole,
      Lvl: data.Lvl
    });
    res.json(createRol);
  } catch (error) {
    console.error("Error creating rol:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) a Rol by ID
router.put('/rols/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updateRol = await Rol.update(
      {
        nameRole: data.nameRole,
        Lvl: data.Lvl
      },
      {
        where: {
          nameRole: id
        }
      }
    );
    res.json(updateRol);
  } catch (error) {
    console.error("Error updating rol:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a Rol by ID
router.delete('/rols/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleteRol = await Rol.destroy({
      where: {
        nameRole: id
      }
    });
    res.json(deleteRol);
  } catch (error) {
    console.error("Error deleting rol:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...

module.exports = router;
