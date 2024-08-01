const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tenants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    leases: [{ type: Schema.Types.ObjectId, ref: 'Lease' }],
    leaseStart: { type: Date },
    leaseEnd: { type: Date },
    rent: { type: Number },
    size: { type: Number },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    amenities: [String],
    maintenanceRequests: [{ type: Schema.Types.ObjectId, ref: 'MaintenanceRequest' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

propertySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Property', propertySchema);