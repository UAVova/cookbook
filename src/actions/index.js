import { normalize, schema } from 'normalizr';
import merge from 'lodash/merge';
import { API } from '../config/';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const RECEIVE_RECIPE = 'RECEIVE_RECIPE';
export const REQUEST_VERSIONS = 'REQUEST_VERSIONS';
export const RECEIVE_VERSIONS = 'RECEIVE_VERSIONS';

const recipe = new schema.Entity('recipes', {}, { idAttribute: '_id' });
const version = new schema.Entity('versions', {}, { idAttribute: '_id' });
const comment = new schema.Entity('comments', {
  versions: [version]
});

const requets_recipes = () => ({
  type: REQUEST_RECIPES
});

const receive_recipes = response => ({
  type: RECEIVE_RECIPES,
  response
});

const receive_recipe = response => ({
  type: RECEIVE_RECIPE,
  response
});

const receive_versions = response => ({
  type: RECEIVE_VERSIONS,
  response
});

const formatRecipesResponse = ({data, nextPage}) => ({
  ...normalize(data, [recipe]),
  nextPage
})

export const fetchRecipes = (page) => (dispatch, getState) => {
  const { nextPage } = getState().pagination.recipes;

  dispatch(requets_recipes());

  const url = page 
    ? `${API}/recipes/${page}`
    : nextPage 
      ? `${API}/recipes/${nextPage}` 
      : `${API}/recipes`;
      
  fetch(url)
    .then(response => response.json())
    .then(json => {
      json = json.data ? json : {data: json};
      return formatRecipesResponse(json)
    })
    .then(formatted => dispatch(receive_recipes(formatted)));
}

export const fetchRecipe = (id) => (dispatch, getState) => {
  fetch(`${API}/recipes/${id}/show`)
    .then(response => response.json())
    .then(json => normalize(json.data, recipe))
    .then(normalized => dispatch(receive_recipe(normalized)));
}

export const fetchRecipeVersions = (recipeId) => (dispatch, getState) => {
  fetch(`${API}/recipes/${recipeId}/versions`)
    .then(response => response.json())
    .then(json => normalize(json, [version]))
    .then(normalized => dispatch(receive_versions(normalized)))
}

export const sendRecipe = data => (dispatch, getState) => {
  const { fields, method, url } = data;

  let body = Object.keys(fields).map(id => {
    return encodeURIComponent(id) + '=' + encodeURIComponent(fields[id]);
  }).join('&');

  return fetch(url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }).then(response => response.json())
    .then(json => normalize(json.data, recipe))
    .then(normalized => dispatch(receive_recipe(normalized)));
}