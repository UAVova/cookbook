import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecipesList from './components/RecipesList';
import Recipe from './components/Recipe';
import AddRecipe from './components/AddRecipe';

render(
  <Router>
    <Switch>
      <Route path='/' component={RecipesList} />
      <Route exact path='/:recipe' component={Recipe} />
      <Route path='/add' component={AddRecipe} />
      <Route exact path='/:recipe/edit' component={EditRecipe} />
    </Switch>
  </Router>
  , document.getElementById('root'));
