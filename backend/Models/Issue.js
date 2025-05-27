const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    summery: { type: String},
    category: { type: String, enum: ['road', 'sanitation', 'lighting'], required: true },
    location: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    images: [{ type: String }] // Optional: URLs of uploaded images
});
module.exports = mongoose.model('Issue', IssueSchema);