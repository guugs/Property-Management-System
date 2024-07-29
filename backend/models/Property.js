const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    type: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tenants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    leaseStart: { type: Date },
    leaseEnd: { type: Date },
});

module.exports = mongoose.model('Property', propertySchema);