import { normalize, schema } from 'normalizr';
import merge from 'lodash/merge';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const REQUEST_VERSIONS = 'REQUEST_VERSIONS';
export const RECEIVE_VERSIONS = 'RECEIVE_RECIPE';

const recipe = new schema.Entity('recipes', {}, { idAttribute: '_id' });
const version = new schema.Entity('versions', {}, { idAttribute: '_id' });
const comment = new schema.Entity('comments', {
  versions: [version]
});

const API = 'http://localhost:8080/api'; // will be replaced soon

const requets_recipes = () => ({
  type: REQUEST_RECIPES
});

const receive_recipes = response => ({
  type: RECEIVE_RECIPES,
  response
});

const formatRecipesResponse = (data) => ({
  ...normalize(data, [recipe]),
  next_page_url: null
})

export const fetchRecipes = () => (dispatch, getState) => {
  const { next_page_url } = getState().pagination.recipes;

  dispatch(requets_recipes());

  fetch(next_page_url ? next_page_url : `${API}/recipes`)
    .then(response => response.json())
    .then(json => formatRecipesResponse(json))
    .then(formatted => dispatch(receive_recipes(formatted)));
}