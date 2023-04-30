import axios from "axios";
import  React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import parse from 'html-react-parser';



export default function SavedRecipes({Token , loggedInUser}) {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);



    async function getSavedRecipesfromDB(){
       const response =  await axios.get(`${process.env.REACT_APP_SPRING_SERVER}/recipe/saved/${loggedInUser.id}`
       , {
        headers: {
         Authorization: `Bearer ${Token}`,
       },});
       setSavedRecipes(response.data)
    }
    async function deleteSavedRecipesfromDB(recipeID){
        await axios.delete(`${process.env.REACT_APP_SPRING_SERVER}/users/${loggedInUser.id}/recipes/${recipeID}`
        , {
         headers: {
          Authorization: `Bearer ${Token}`,
        },});

        await getSavedRecipesfromDB();
        
     }

    useEffect(() => {
        getSavedRecipesfromDB();
      },);

    async function handleRecipeClick(recipe) {
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
      }

      async function handleDeleteSavedRecipe(recipeID){
        await deleteSavedRecipesfromDB(recipeID);
        setModalIsOpen(false);
        
      }
      
    
      function handleCloseDetail() {
        setSelectedRecipe(null);
        setModalIsOpen(false);
      }

    return (
   
        <div className="RecipeSearch">
          
          <ul className="recipes">
            {savedRecipes.map((recipe) => (
              <li key={recipe.recipes.id} className="recipe">
                <h2 className="recipe__title">{recipe.recipes.title}</h2>
                <img src={recipe.recipes.image} alt={recipe.recipes.title} className="recipe__image" />
                <p className="recipe__time">Ready in {recipe.recipes.readyInMinutes} minutes</p>
                <p className="recipe__summary">{parse(recipe.recipes.summary)}</p>
                <button onClick={() => handleRecipeClick(recipe)} className="recipe__button">See the recipe</button>
              </li>
            ))}
          </ul>
    
          <Modal isOpen={modalIsOpen} onRequestClose={handleCloseDetail} className="modal" overlayClassName="overlay">
            {selectedRecipe && (
              <div>
                
                <h2 className="modal__title">{selectedRecipe.title}</h2>
                <p onClick={()=>handleDeleteSavedRecipe(selectedRecipe.id)} className="delete_recipe">DELETE ❌</p>

                <img src={selectedRecipe.recipes.image} alt={selectedRecipe.recipes.title} className="modal__image" />
                <p className="modal__time">Ready in {selectedRecipe.recipes.readyInMinutes} minutes</p>
    
                <button onClick={handleCloseDetail} className="modal__close-button">Close</button>
                <h3 className="modal__instruction-title">Instructions:</h3>
                <ol className="modal__instruction-list">
                  {selectedRecipe.recipes.analyzedInstructions[0].steps.map((step) => (
                    <li key={step.number} className="modal__instruction-step">{step.step}</li>
                  ))}
                </ol>
              </div>
            )}
          </Modal>
        </div>
      );
}
