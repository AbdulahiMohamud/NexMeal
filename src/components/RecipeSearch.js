import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RecipeSearch() {
    const [query , setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);



        async function fetchRecipes() {
            const response = await axios.get(`http://localhost:8080/recipes/search?query=${query}`);
            setRecipes(response.data);
        }
        
    

     function handleQueryChange (event) {
        setQuery(event.target.value);

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
            <button type="submit">Search</button>
            </form>
            
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.titl} />
                        <p>Ready in {recipe.readyInMinutes} minutes</p>
                        <p>Servings: {recipe.servings}</p>
                        <a href={recipe.sourceUrl}>See the recipe</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
