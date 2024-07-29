const express = require('express');
const router = express.Router();
const Property = require('../models/Property.js');
const auth = require('../middleware/auth');

// Get all properties
router.get('/', auth, async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id }).populate('tenants', 'username');
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single property
router.get('/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOne({ _id: req.params.id, owner: req.user.id }).populate('tenants', 'username');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new property
router.post('/', auth, async (req, res) => {
    const property = new Property({
        ...req.body,
        owner: req.user.id
    });

    try {
        const newProperty = await property.save();
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a property
router.patch('/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOne({ _id: req.params.id, owner: req.user.id });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a property
router.delete('/:id', auth, async (req, res) => {
    try {
        const property = await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json({ message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;