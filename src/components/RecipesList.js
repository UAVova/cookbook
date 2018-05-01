import React, { Component, Fragment } from 'react';
import RecipePreview from './RecipePreview';

class RecipesList extends Component {
  render() {
    return (
      <Fragment>
        <div className="action-bar">
          <a href="#" className="action-link white">Add recipe</a>
        </div>
        <RecipePreview />
      </Fragment>
    )
  }
}

export default RecipesList;