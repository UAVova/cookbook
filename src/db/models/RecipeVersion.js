const mongoose = require('mongoose');

const RecipeVersionSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [6, 'Minimum title length is {MINLENGTH} characters'],
    maxlength: [80, 'Maximum title length is {MAXLENGTH} characters'],
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    minlength: [80, 'Minimum description length is 80 characters'],
    maxlength: [1500, 'Maximum description length is {MAXLENGTH} characters'],
    required: [true, 'Description is required']
  },
  created_at: {
    type: Date,
    required: true
  }
});

mongoose.model('RecipeVersion', RecipeVersionSchema);
