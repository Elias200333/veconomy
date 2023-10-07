const router = require('express').Router();
const Likes = require('../orm/models/likes.model'); // Adjust the path to your Likes model

// GET all likes
router.get('/', async (req, res) => {
  try {
    const likes = await Likes.findAll();
    res.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a specific like by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const like = await Likes.findOne({
      where: {
        ID_User: id, // Assuming you want to find likes by user ID
      },
    });

    if (like) {
      res.json(like);
    } else {
      res.status(404).json({ error: "Like not found" });
    }
  } catch (error) {
    console.error("Error fetching like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new like
router.post('/', async (req, res) => {
  const data = req.body;

  try {
    const createLike = await Likes.create({
      ID_User: data.ID_User,
      ID_Project: data.ID_Project,
      // createdAt and updatedAt will be automatically set
    });

    res.status(201).json(createLike);
  } catch (error) {
    console.error("Error creating like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT (update) an existing like by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const [rowsUpdated] = await Likes.update(data, {
      where: {
        ID_User: id, // Assuming you want to update likes by user ID
      },
    });

    if (rowsUpdated === 0) {
      res.status(404).json({ error: "Like not found" });
    } else {
      res.json({ message: "Like updated successfully" });
    }
  } catch (error) {
    console.error("Error updating like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a like by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const rowsDeleted = await Likes.destroy({
      where: {
        ID_User: id, // Assuming you want to delete likes by user ID
      },
    });

    if (rowsDeleted === 0) {
      res.status(404).json({ error: "Like not found" });
    } else {
      res.json({ message: "Like deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;