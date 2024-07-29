const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const tenants = await User.find({ role: 'tenant' });
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;