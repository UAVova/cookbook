import { createSelector } from 'reselect';

const getRecipes = state => state.entities.recipes;
const getRecipesIds = state => state.pagination.recipes.ids;
const getRecipe = (state, id) => state.entities.recipes[id];
const getVersions = state => state.entities.versions;

export const getAllRecipes = createSelector(
  [ getRecipes, getRecipesIds ], (recipes, ids) => {
    return ids.map(id => recipes[id]);
  }
);

export const getRecipeVersions = createSelector(
  [ getVersions, getRecipe ], (versions, recipe) => {
    return recipe 
      &&  recipe.versions
            .map(id => versions[id])
            .filter(item => typeof item === 'object')
      ||  [];
  }
);