const mongoose = require('mongoose');

// Define the category schema
const categorySchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true 
},
  value: { 
    type: String, 
    required: true
 },
  type: { 
    type: String, 
    required: true
 },
});

// Create the Category model using the category schema
const Category = mongoose.model('Category', categorySchema);

// Export the Category model
module.exports = Category;