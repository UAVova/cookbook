import React, { Component, Fragment } from 'react';
import RecipeVersion from './RecipeVersion';
import { connect } from 'react-redux';
import { fetchRecipe, fetchRecipeVersions } from '../actions/';
import { getRecipeVersions } from '../selectors/';

class Recipe extends Component {
  componentDidMount() {
    const { recipe } = this.props.match.params;

    this.props.fetchRecipe(recipe);
    this.props.fetchRecipeVersions(recipe)
  }

  openVersion(e) {
    e.target.classList.add('opened');
  }

  generateVersions() {
    return this.props.versions.map(version => {
      return <RecipeVersion key={version._id} handleClick={this.openVersion} {...version} />
    });
  }

  render() {
    const { recipe } = this.props;

    return (
      <Fragment>
        <div className="action-bar">
          <a href="#" className="action-link white">Add recipe</a>
        </div>
        <article className="recipe-details">
          { recipe
              ?
                <Fragment>
                  <header>
                    <h3>{recipe.title}</h3>
                  </header>
                  <p>{recipe.description}</p>
                  <section id="versions">
                    <header>
                      <h3>Previous versions</h3>
                    </header>
                    <div className="versions-list">
                      { this.generateVersions() }
                    </div>
                  </section>
                </Fragment>
              : 'Loading recipe...'
          }
        </article>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.recipe;
  const { recipes } = state.entities;

  return {
    recipe: recipes[id],
    versions: getRecipeVersions(state, id)
  }
}

export default connect(mapStateToProps, { fetchRecipe, fetchRecipeVersions })(Recipe);