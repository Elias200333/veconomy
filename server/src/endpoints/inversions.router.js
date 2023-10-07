const router = require('express').Router();
const { faker } = require('@faker-js/faker');

const Inversion = require('../orm/models/inversions.model'); // Make sure to use the correct path to your Inversion model

router.get('/', async (req, res) => {
    try {
        const inversions = await Inversion.findAll();
        res.json(inversions);
    } catch (error) {
        console.error("Error fetching inversions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET a specific inversion by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const inversion = await Inversion.findOne({
            where: {
                ID: id
            }
        });
        if (inversion) {
            res.json(inversion);
        } else {
            res.status(404).json({ message: "Inversion not found" });
        }
    } catch (error) {
        console.error("Error fetching inversion:", error);
        res.status(500).json({ error: "Error fetching inversion" });
    }
});

router.post('/test', async (req, res) => {
    try {
        const createInversion = await Inversion.create({
            ID_Project: 1, // Replace with the desired project ID
            Quantity_Invested: 1000.00, // Replace with the desired quantity
            ID_User: 1 // Replace with the desired user ID
        });
        res.json(createInversion);
    } catch (error) {
        console.error("Error creating inversion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const createInversion = await Inversion.create({
            ID_Project: data.ID_Project,
            Quantity_Invested: data.Quantity_Invested,
            ID_User: data.ID_User
        });
        res.json(createInversion);
    } catch (error) {
        console.error("Error creating inversion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedInversion = await Inversion.update(
            {
                ID_Project: data.ID_Project,
                Quantity_Invested: data.Quantity_Invested,
                ID_User: data.ID_User
            },
            {
                where: {
                    ID: id
                }
            }
        );

        res.json(updatedInversion);
    } catch (error) {
        console.error("Error updating inversion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const dataUpdated = await Inversion.update(data, {
            where: {
                ID: id
            }
        });

        res.json(dataUpdated);
    } catch (error) {
        console.error("Error updating inversion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const deletedInversion = await Inversion.destroy({
            where: {
                ID: id
            }
        });

        res.json(deletedInversion);
    } catch (error) {
        console.error("Error deleting inversion:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
