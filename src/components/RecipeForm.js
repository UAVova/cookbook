import React, { Component } from 'react';
import { connect } from 'react-redux';

class RecipeForm extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
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
    const { url, method } = this.props;
    
    this.props
      .submitFunction({ fields: {title, description}, url, method})
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { title, buttonCaption } = this.props;

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
            ></textarea>
          </div>
          <div className="form-field justify-end">
            <input type="submit" className="action-link green slim-link" value={ buttonCaption } />
          </div>
        </div>
      </form>
    );
  }
}

export default RecipeForm;