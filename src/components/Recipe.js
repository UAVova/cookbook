import React, { Component, Fragment } from 'react';
import RecipeVersion from './RecipeVersion';
import { connect } from 'react-redux';
import { fetchRecipe, fetchRecipeVersions } from '../actions/';
import { getRecipeVersions } from '../selectors/';
import { Link } from 'react-router-dom';
import Loader from './Loader';

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
    return this.props.versions
      .sort((a,b) =>  Date.parse(b.created_at) - Date.parse(a.created_at))
      .map(version => {
      return <RecipeVersion key={version._id} handleClick={this.openVersion} {...version} />
    });
  }

  render() {
    const { recipe, versions } = this.props;

    return (
      <Fragment>
        <div className="action-bar">
          <Link to="/" className="action-link red" >{"< Back"}</Link>
          <Link to="/recipes/add" className="action-link blue" >Add recipe</Link>
        </div>
        <article className="recipe-details">
          { recipe
              ?
                <Fragment>
                  <header>
                    <h3>{recipe.title}</h3>
                    <div className="action">[<Link to={`/recipes/${recipe._id}/edit`}>Edit Recipe</Link>]</div>
                  </header>
                  <p>{recipe.description}</p>

                  { !!versions.length &&
                      <section id="versions">
                        <header>
                          <h3>Previous versions</h3>
                        </header>
                        <div className="versions-list">
                          { this.generateVersions() }
                        </div>
                      </section>
                  }
                </Fragment>
              : <Loader />
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