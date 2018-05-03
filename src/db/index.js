import mongoose from 'mongoose';
import './models/Recipe';
import './models/RecipeVersion';
import { RECIPES_PER_PAGE } from '../config/';

const Recipe = mongoose.model('Recipe');
const RecipeVersion = mongoose.model('RecipeVersion');

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

export function getRecipe(id) {
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

export async function editRecipe(id, data) {
  const recipe = await Recipe.findById(id);

  if (!recipe)
    return { error: 'Recipe not found' };
  
  const { 
    title,
    description,
    created_at
  } = recipe;

  const version = await RecipeVersion.create({
    title,
    description,
    created_at: Date.now()
  });
  
  recipe.title = data.title;
  recipe.description = data.description;
  recipe.versions.push(version._id);


  return recipe.save();
}

export function parseErrors(data) {
  let messages = '';

  for (let error in data.errors)
    if (data.errors[error].message)
      messages += data.errors[error].message + '\n';

  return messages;
}

export async function getRecipeVersions(recipeId) {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe || recipe.versions.length < 1)
    return [];

  const versions = await RecipeVersion.find({
    '_id': { $in: recipe.versions }
  });

  return versions;
}