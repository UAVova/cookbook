import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default ({ _id, title, description, created_at }) => {
  return (
    <article className="recipe-preview">
      <header>
        <h3><Link to={`/${_id}`} >{ title }</Link></h3>
        <time dateTime={created_at}>Added { moment(created_at).fromNow() }</time>
      </header>
      <p>{description}</p>
    </article>
  );
}