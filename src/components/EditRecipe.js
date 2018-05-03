import React from 'react';
import RecipeForm from './RecipeForm';
import { API } from '../actions/';
import { sendRecipe, fetchRecipe } from '../actions/';
import { connect } from 'react-redux';

const EditRecipe = ({ match, history, submitFunction, fetchRecipe, recipe }) => {
  const options = {
    url: `${API}/recipes/${match.params.recipe}/edit`,
    method: 'PUT',
    title: "Edit recipe",
    buttonCaption: "Save recipe",
    history,
    submitFunction,
    fetchRecipe,
    recipe,
    match
  }

  return <RecipeForm {...options} />;
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.recipe;
  const { recipes } = state.entities;

  return {
    recipe: recipes[id]
  }
}

export default connect(mapStateToProps, { submitFunction: sendRecipe, fetchRecipe })(EditRecipe);