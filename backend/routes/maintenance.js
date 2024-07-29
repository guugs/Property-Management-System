const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Maintenance requests route' });
});

module.exports = router;