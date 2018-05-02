import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllRecipes } from '../selectors/index';
import { fetchRecipes } from '../actions/index';
import RecipePreview from './RecipePreview';

class RecipesList extends Component {
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.props.fetchRecipes();
  }

  recipesList() {
    return this.props.recipes.map(recipe => {
      return <RecipePreview key={recipe._id} recipe={recipe}/>
    })
  }

  render() {
    return (
      <Fragment>
        <div className="action-bar">
          <a href="#" className="action-link white">Add recipe</a>
        </div>
        {this.recipesList()}
        {this.props.isFetching && 'Loading posts...'}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  recipes: getAllRecipes(state),
  isFetching: state.pagination.recipes.isFetching
})

export default connect(mapStateToProps, { fetchRecipes })(RecipesList);