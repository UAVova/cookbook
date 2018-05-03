import React from 'react';
import moment from 'moment';

export default ({ handleClick, created_at, description }) => {
  return (
    <div className="recipe-version" onClick={(e) => handleClick(e)}>
      <time dateTime={ created_at }>Edited { moment(created_at).fromNow() }</time>
      <p>{ description }</p>
    </div>
  )
}