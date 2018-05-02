import { createSelector } from 'reselect';

const getRecipes = state => state.entities.recipes;
const getRecipesIds = state => state.pagination.recipes.ids;

export const getAllRecipes = createSelector(
  [ getRecipes, getRecipesIds ], (recipes, ids) => {
    return ids.map(id => recipes[id]);
  }
);