import React from 'react';
import moment from 'moment';

export default ({ _id, title, description, created_at }) => {
  return (
    <article className="recipe-preview">
      <header>
        <h3><a href={`/${_id}`}>{ title }</a></h3>
        <time dateTime="">Added { moment(created_at).fromNow() }</time>
      </header>
      <p>{description}</p>
    </article>
  );
}