import mongoose from 'mongoose';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH
} from '../../config/';

const RecipeVersionSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [MIN_TITLE_LENGTH, 'Minimum title length is {MINLENGTH} characters'],
    maxlength: [MAX_TITLE_LENGTH, 'Maximum title length is {MAXLENGTH} characters'],
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    minlength: [MIN_DESCRIPTION_LENGTH, 'Minimum description length is 80 characters'],
    maxlength: [MAX_DESCRIPTION_LENGTH, 'Maximum description length is {MAXLENGTH} characters'],
    required: [true, 'Description is required']
  },
  created_at: {
    type: Date,
    required: true
  }
});

mongoose.model('RecipeVersion', RecipeVersionSchema);
