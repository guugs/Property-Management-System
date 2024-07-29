const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/MaintenanceRequest');

router.get('/', async (req, res) => {
    try {
        const maintenanceRequests = await MaintenanceRequest.find()
            .populate('property', 'name')
            .populate('tenant', 'username');
        res.json(maintenanceRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const maintenanceRequest = new MaintenanceRequest({
        property: req.body.property,
        tenant: req.body.tenant,
        description: req.body.description,
    });

    try {
        const newMaintenanceRequest = await maintenanceRequest.save();
        res.status(201).json(newMaintenanceRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await MaintenanceRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Maintenance request deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;