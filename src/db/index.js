import mongoose from 'mongoose';
import './models/Recipe';

const Recipe = mongoose.model('Recipe');

export function setUpConnection() {
  mongoose.connect(`mongodb://localhost/cookbook`);
}

export function getRecipesList() {
  return Recipe.find();
}

export function getRecipe() {
  return Recipe.findById(id);
}

export function createRecipe({ title, description}) {
  const recipe = new Recipe({
    title,
    description
  });

  return recipe.save();
}

export function deleteRecipe(id) {
  return Recipe.findById(id).remove();
}