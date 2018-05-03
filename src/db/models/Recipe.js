const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [6, 'Minimum title length is {MINLENGTH} characters'],
    maxlength: [80, 'Maximum title length is {MAXLENGTH} characters'],
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    minlength: [80, 'Minimum description length is {MINLENGTH} characters'],
    maxlength: [1500, 'Maximum description length is {MAXLENGTH} characters'],
    required: [true, 'Description is required']
  },
  versions: [{
    type: String
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Recipe', RecipeSchema);