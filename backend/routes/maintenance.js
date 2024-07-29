const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/MaintenanceRequest');
const auth = require('../middleware/auth');

// Get all maintenance requests
router.get('/', auth, async (req, res) => {
    try {
        const maintenanceRequests = await MaintenanceRequest.find()
            .populate('property', 'name')
            .populate('tenant', 'username');
        res.json(maintenanceRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new maintenance request
router.post('/', auth, async (req, res) => {
    const maintenanceRequest = new MaintenanceRequest({
        ...req.body,
        tenant: req.user.id
    });

    try {
        const newMaintenanceRequest = await maintenanceRequest.save();
        res.status(201).json(newMaintenanceRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a maintenance request
router.patch('/:id', auth, async (req, res) => {
    try {
        const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }
        res.json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a maintenance request
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedRequest = await MaintenanceRequest.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Maintenance request not found' });
        }
        res.json({ message: 'Maintenance request deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;