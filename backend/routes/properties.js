const express = require('express');
const router = express.Router();
const Property = require('../models/Property.js');

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const property = new Property({
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
        owner: req.user._id 
    });

    try {
        const newProperty = await property.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;