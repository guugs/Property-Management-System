const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Lease = require('../models/Lease');
const auth = require('../middleware/auth');

router.get('/occupancy', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const properties = await Property.find({ owner: req.user.id, ...dateFilter });
    const totalProperties = properties.length;
    const occupiedProperties = properties.filter(p => p.tenants.length > 0).length;
    const vacantProperties = totalProperties - occupiedProperties;
    const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;

    const propertyTypes = {};
    properties.forEach(p => {
      propertyTypes[p.type] = (propertyTypes[p.type] || 0) + 1;
    });

    res.json({
      totalProperties,
      occupiedProperties,
      vacantProperties,
      occupancyRate: occupancyRate.toFixed(2),
      propertyTypes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/maintenance', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const requests = await MaintenanceRequest.find(dateFilter);
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    const inProgressRequests = requests.filter(r => r.status === 'in-progress').length;
    const completedRequests = requests.filter(r => r.status === 'completed').length;

    res.json({
      totalRequests,
      pendingRequests,
      inProgressRequests,
      completedRequests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/summary', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    const totalProperties = properties.length;
    const occupiedProperties = properties.filter(p => p.tenants.length > 0).length;
    const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;

    const maintenanceRequests = await MaintenanceRequest.find({ status: 'pending' });
    const pendingMaintenanceRequests = maintenanceRequests.length;

    res.json({
      totalProperties,
      occupancyRate: occupancyRate.toFixed(2),
      pendingMaintenanceRequests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;