import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import RecipesList from './components/RecipesList';
import Recipe from './components/Recipe';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import entities from './reducers/entities.js';
import pagination from './reducers/pagination.js';

const rootReducer = combineReducers({
  entities,
  pagination
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/recipes/add' component={AddRecipe} />
        <Route exact path='/recipes/:recipe' component={Recipe} />
        <Route exact path='/recipes/:recipe/edit' component={EditRecipe} />
        <Route component={RecipesList} />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'));
