import React from 'react';
import moment from 'moment';

export default ({ recipe: { title, description, created_at }}) => {
  return (
    <article className="recipe-preview">
      <header>
        <h3>{title}</h3>
        <time dateTime="">Added { moment(created_at).fromNow() }</time>
      </header>
      <p>{description}</p>
    </article>
  );
}