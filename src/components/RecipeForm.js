import React, { Component } from 'react';
import { connect } from 'react-redux';

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (props.fetchRecipe)
      props.fetchRecipe(props.match.params.recipe);
    
    const template = {title: '', description: ''};
    const { title, description } = props.recipe || template;

    this.state = {
      title,
      description
    }
  }
  
  handleInputChange(event) {
    const { value, name} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { title, description } = this.state;
    const { url, method, recipe } = this.props;

    const redirectUrl = recipe ? `/recipes/${recipe._id}` : '/';
    
    this.props
      .submitFunction({ fields: {title, description}, url, method})
      .then(() => this.props.history.push(redirectUrl));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { recipe } = nextProps;

    if (recipe)
      return {
        title: recipe.title,
        description: recipe.description
      }
    
    return null;
  }

  render() {
    const { title, buttonCaption, recipe } = this.props;

    return (
      <form onSubmit={ this.handleSubmit }>
        <div className="recipe-details">
          <header>
            <h3>{ title }</h3>
          </header>
          <div className="form-field">
            <input 
              pattern=".{6,80}"
              required
              title="6 to 80 characters"
              name="title"
              type="text"
              onChange={this.handleInputChange} 
              value={this.state.title}
            />
          </div>
          <div className="form-field">
            <textarea 
              minLength="50"
              maxLength="3000"
              required 
              name="description" 
              rows="10" 
              onChange={this.handleInputChange}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="form-field justify-end">
            <button className="action-link red slim-link" onClick={() => this.props.history.goBack()} > {"< Back "}</button>
            <input type="submit" className="action-link green slim-link" value={ buttonCaption } />
          </div>
        </div>
      </form>
    );
  }
}

export default RecipeForm;