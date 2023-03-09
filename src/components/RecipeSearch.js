import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from 'html-react-parser';
export default function RecipeSearch() {

    const parse = require('html-react-parser');

    const [query , setQuery] = useState('');
    const [excludeIngredients, setExcludeIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);



        async function fetchRecipes() {
            const response = await axios.get(`http://localhost:8080/recipes/search?query=${query}&excludeIngredients=${excludeIngredients}`);
            setRecipes(response.data);
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
                        <a href={recipe.sourceUrl}>See the recipe</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
