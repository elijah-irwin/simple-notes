// NPM Imports
const mongoose = require('mongoose');

// Note Schema
const noteSchema = new mongoose.Schema({
    note: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);