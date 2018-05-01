import React, { Component, Fragment } from 'react';
import RecipeVersion from './RecipeVersion';

class Recipe extends Component {
  render() {
    return (
      <Fragment>
        <div className="action-bar">
          <a href="#" className="action-link white">Add recipe</a>
        </div>
        <article className="recipe-details">
          <header>
            <h3>Borsch recipe</h3>
          </header>
          <p>Description</p>
          <section id="versions">
            <header>
              <h3>Previous versions</h3>
            </header>
            <div className="versions-list">
              <RecipeVersion />
            </div>
          </section>
        </article>
      </Fragment>
    );
  }
}

export default Recipe;