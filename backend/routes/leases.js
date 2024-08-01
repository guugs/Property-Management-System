const express = require('express');
const router = express.Router();
const Lease = require('../models/Lease');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Get all leases
router.get('/', auth, async (req, res) => {
    try {
        const leases = await Lease.find()
            .populate('property', 'name')
            .populate('tenant', 'username');
        res.json(leases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new lease
router.post('/', auth, async (req, res) => {
    const lease = new Lease({
        ...req.body,
    });

    try {
        const newLease = await lease.save();
        await Property.findByIdAndUpdate(req.body.property, { $push: { leases: newLease._id } });
        res.status(201).json(newLease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a lease
router.patch('/:id', auth, async (req, res) => {
    try {
        const updatedLease = await Lease.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedLease) {
            return res.status(404).json({ message: 'Lease not found' });
        }
        res.json(updatedLease);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a lease
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedLease = await Lease.findByIdAndDelete(req.params.id);
        if (!deletedLease) {
            return res.status(404).json({ message: 'Lease not found' });
        }
        await Property.findByIdAndUpdate(deletedLease.property, { $pull: { leases: deletedLease._id } });
        res.json({ message: 'Lease deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;