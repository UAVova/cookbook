import mongoose from 'mongoose';
import './models/Recipe';

const Recipe = mongoose.model('Recipe');
const RECIPES_PER_PAGE = 6;

export function setUpConnection() {
  mongoose.connect(`mongodb://localhost/cookbook`);
}

export async function getRecipesList(page) {
  const records = await Recipe.count();
  const maxPages = Math.ceil(records / RECIPES_PER_PAGE);

  if (page > maxPages)
    return [];

  const skipCount = page * RECIPES_PER_PAGE - RECIPES_PER_PAGE;
  const recipes = Recipe.find()
          .sort({created_at: -1})
          .skip(skipCount)
          .limit(RECIPES_PER_PAGE);
  
  const nextPage = page + 1 > maxPages
    ? null
    : page + 1;

  return new Promise(resolve => {
    recipes.then(data => resolve({nextPage, data}));
  });
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