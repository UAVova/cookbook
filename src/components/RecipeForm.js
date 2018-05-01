import React, { Component } from 'react';

class RecipeForm extends Component {
  render() {
    const { title, buttonCaption } = this.props;

    return (
      <div className="recipe-details">
        <header>
          <h3>{ title }</h3>
        </header>
        <div className="form-field">
          <input type="text" />
        </div>
        <div className="form-field">
          <textarea name="" id="" rows="10"></textarea>
        </div>
        <div className="form-field justify-end">
          <button className="action-link green slim-link">{ buttonCaption }</button>
        </div>
    </div>
    );
  }
}

export default RecipeForm;