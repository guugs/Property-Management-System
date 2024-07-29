const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all tenants
router.get('/', auth, async (req, res) => {
    try {
        const tenants = await User.find({ role: 'tenant' });
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single tenant
router.get('/:id', auth, async (req, res) => {
    try {
        const tenant = await User.findOne({ _id: req.params.id, role: 'tenant' });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new tenant
router.post('/', auth, async (req, res) => {
    const tenant = new User({
        ...req.body,
        role: 'tenant'
    });

    try {
        const newTenant = await tenant.save();
        res.status(201).json(newTenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a tenant
router.patch('/:id', auth, async (req, res) => {
    try {
        const tenant = await User.findOne({ _id: req.params.id, role: 'tenant' });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        Object.assign(tenant, req.body);
        await tenant.save();
        res.json(tenant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a tenant
router.delete('/:id', auth, async (req, res) => {
    try {
        const tenant = await User.findOneAndDelete({ _id: req.params.id, role: 'tenant' });
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }
        res.json({ message: 'Tenant deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;