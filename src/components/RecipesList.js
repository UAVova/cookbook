import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllRecipes } from '../selectors/index';
import { fetchRecipes } from '../actions/index';
import RecipePreview from './RecipePreview';
import Waypoint from 'react-waypoint';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import RecipesPlaceholder from './RecipesPlaceholder';

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
    const isEmpty = !this.props.isFetching && this.props.recipes.length === 0;
    
    return (
      <Fragment>
        <div className="action-bar">
          <Link to="/recipes/add" className="action-link blue" >Add recipe</Link>
        </div>
        {
          isEmpty
            ? <RecipesPlaceholder />
            : this.recipesList()
        }
        {this.props.isFetching && <Loader />}
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