import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from 'html-react-parser';
export default function RecipeSearch() {

    const parse = require('html-react-parser');

    const [query , setQuery] = useState('');
    const [excludeIngredients, setExcludeIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showDetails, setShowDetails] = useState (false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);


        async function fetchRecipes() {
            const response = await axios.get(`http://localhost:8080/recipes/search?query=${query}&excludeIngredients=${excludeIngredients}`);
            setRecipes(response.data);
        }

        async function handleRecipeClick (recipeId) {
            const response = await axios.get(`http://localhost:8080/recipes/${recipeId}`);
            setSelectedRecipe(response.data);
            setShowDetails(true);
        }
        function handleCloseDetail () {
            setSelectedRecipe(null);
            setShowDetails(false);
        }
        
    

     function handleQueryChange (event) {
        setQuery(event.target.value);

    }

    function handleExcludeIngredients (e) {
        setExcludeIngredients(e.target.value)
    }
    function handleSubmit (event) {
        event.preventDefault();
        if(query){
            fetchRecipes();
            debugger;
        }
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={query} onChange={handleQueryChange} />
                <input type='text' value={excludeIngredients} onChange={handleExcludeIngredients} />
                <button type="submit">Search</button>
            </form>
            
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.titl} />
                        <p>Ready in {recipe.readyInMinutes} minutes</p>
                        <p >Summary{parse(recipe.summary)}</p>
                        <button onClick={() => handleRecipeClick(recipe.id)}>See the recipe</button>
                    </li>
                ))}
            </ul>

            {showDetails && (
                <div>
                    <h2>{selectedRecipe.title}</h2>
                    <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                    <p>Ready in {selectedRecipe.readyInMinutes} minutes</p>
                    <p>{parse(selectedRecipe.summary)}</p>
                    <button onClick={handleCloseDetail}>Close</button>
                    <h3>Instructions:</h3>
                    <ol>
                        {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number}>{step.step}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    )
}
