const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    data: { type: Array, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', uploadSchema);
