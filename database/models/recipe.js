const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema)