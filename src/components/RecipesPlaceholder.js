import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="recipe-placeholder">
      Seems like no recipe is found in the database, but you still can add one now ;)
      <Link to='/recipes/add' className="action-link blue center"> Add first recipe </Link>
    </div>
  )
}