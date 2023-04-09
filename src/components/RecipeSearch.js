import React, { useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import Modal from 'react-modal';
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/RecipeSearch.css';

Modal.setAppElement('#root');

export default function RecipeSearch({Token}) {
  const [query, setQuery] = useState('');
  const [excludeIngredients, setExcludeIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // adding the jwt token
  
// api call 
  async function fetchRecipes() {
    // add token for authentication
    // url is to the backend
    const url = `http://localhost:8080/recipes/search?query=${query}&excludeIngredients=${excludeIngredients}`;
    const response = await axios.get(url, {
     headers: {
      Authorization: `Bearer ${Token}`,
    },});
    
    setRecipes(response.data);
  }

  async function handleRecipeClick(recipe) {
    setSelectedRecipe(recipe);
    setModalIsOpen(true);
  }

  function handleCloseDetail() {
    setSelectedRecipe(null);
    setModalIsOpen(false);
  }

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  function handleExcludeIngredients(event) {
    setExcludeIngredients(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query) {
      fetchRecipes();
    }
  }

  return (
    <div className="RecipeSearch">
      <h1 className="heading">Recipe Search</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="query" className="label">
          Search for recipes:
          <input type="text" id="query" value={query} onChange={handleQueryChange} className="input" />
        </label>
        <label htmlFor="excludeIngredients" className="label">
          Exclude ingredients:
          <input type="text" id="excludeIngredients" value={excludeIngredients} onChange={handleExcludeIngredients} className="input" />
        </label>
        <button type="submit" className="button">Search</button>
      </form>

      <ul className="recipes">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe">
            <h2 className="recipe__title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="recipe__image" />
            <p className="recipe__time">Ready in {recipe.readyInMinutes} minutes</p>
            <p className="recipe__summary">{parse(recipe.summary)}</p>
            <button onClick={() => handleRecipeClick(recipe)} className="recipe__button">See the recipe</button>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseDetail} className="modal" overlayClassName="overlay">
        {selectedRecipe && (
          <div>
            <h2 className="modal__title">{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="modal__image" />
            <p className="modal__time">Ready in {selectedRecipe.readyInMinutes} minutes</p>

            <button onClick={handleCloseDetail} className="modal__close-button">Close</button>
            <h3 className="modal__instruction-title">Instructions:</h3>
            <ol className="modal__instruction-list">
              {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number} className="modal__instruction-step">{step.step}</li>
              ))}
            </ol>
          </div>
        )}
      </Modal>
    </div>
  );
}
