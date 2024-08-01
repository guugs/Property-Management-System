const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/property-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const tenantRoutes = require('./routes/tenants');
const maintenanceRoutes = require('./routes/maintenance');
const auth = require('./middleware/auth');
const leaseRoutes = require('./routes/leases');
const reportRoutes = require('./routes/reports');

app.use('/api/auth', authRoutes);
app.use('/api/properties', auth, propertyRoutes);
app.use('/api/tenants', auth, tenantRoutes);
app.use('/api/maintenance', auth, maintenanceRoutes);
app.use('/api/leases', auth, leaseRoutes);
app.use('/api/reports', auth, reportRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});