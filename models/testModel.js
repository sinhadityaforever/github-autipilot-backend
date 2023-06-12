// Example model

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
	// Define schema fields
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
