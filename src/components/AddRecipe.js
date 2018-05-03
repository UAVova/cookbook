import React from 'react';
import RecipeForm from './RecipeForm';
import { API } from '../actions/';
import { sendRecipe } from '../actions/';
import { connect } from 'react-redux';

const AddRecipe = ({ history, submitFunction }) => {
  const options = {
    url: `${API}/recipes`,
    method: 'POST',
    title: "Add new recipe",
    buttonCaption: "Add recipe",
    history,
    submitFunction
  }

  return <RecipeForm {...options} />;
}

export default connect(null, { submitFunction: sendRecipe })(AddRecipe);