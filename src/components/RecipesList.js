import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllRecipes } from '../selectors/index';
import { fetchRecipes } from '../actions/index';
import RecipePreview from './RecipePreview';
import Waypoint from 'react-waypoint';

class RecipesList extends Component {
  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.props.fetchRecipes();
  }

  recipesList() {
    const { nextPage } = this.props;

    return (
      <Fragment>
        {this.generateRecipes()}
        {nextPage &&
          <Waypoint onEnter={() => this.fetchRecipes()} />}
      </Fragment>
    );
  }

  generateRecipes() {
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
  isFetching: state.pagination.recipes.isFetching,
  nextPage: state.pagination.recipes.nextPage
})

export default connect(mapStateToProps, { fetchRecipes })(RecipesList);