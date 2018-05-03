import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllRecipes } from '../selectors/index';
import { fetchRecipes } from '../actions/index';
import RecipePreview from './RecipePreview';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom';

class RecipesList extends Component {
  componentDidMount() {
    this.fetchRecipes(1);
  }

  fetchRecipes(page) {
    this.props.fetchRecipes(page);
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
    return this.props.recipes
      .sort((a,b) =>  Date.parse(b.created_at) - Date.parse(a.created_at))
      .map(recipe => {
        return <RecipePreview key={recipe._id} {...recipe}/>
      })
  }

  render() {

    return (
      <Fragment>
        <div className="action-bar">
          <Link to="/recipes/add" className="action-link white" >Add recipe</Link>
        </div>
        {
          this.props.recipes 
            ? this.recipesList()
            : ''
        }
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