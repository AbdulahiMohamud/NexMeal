import axios from "axios";
import  React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import parse from 'html-react-parser';



export default function UserSavedRecipes({Token , ClickedUser , loggedInUser}) {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isSaved, setIsSaved] = useState(false);




    async function getSavedRecipesfromDB(){
       const response =  await axios.get(`${process.env.REACT_APP_SPRING_SERVER}/recipe/saved/${ClickedUser.id}`
       , {
        headers: {
         Authorization: `Bearer ${Token}`,
       },});
       setSavedRecipes(response.data)
    }
    async function saveRecipes(recipe) {
        // add token for authentication
        // url is to the backend
        const url = `${process.env.REACT_APP_SPRING_SERVER}/users/${loggedInUser.id}/recipes`;
        await axios.post(
          url,
          recipe,
           {
         headers: {
          Authorization: `Bearer ${Token}`,
        },});
        setIsSaved(true);
        
        
      }

    useEffect(() => {
        getSavedRecipesfromDB();
      },);

    async function handleRecipeClick(recipe) {
        console.log(recipe);
        setSelectedRecipe(recipe);
        setModalIsOpen(true);
      }

      function handleSaveRecipeClick(recipe) {
        saveRecipes(recipe);
        
      }
      
    
      function handleCloseDetail() {
        setSelectedRecipe(null);
        setModalIsOpen(false);
        setIsSaved(false);
      }

    return (
        <>



        
   
        <div className="RecipeSearch">
        {savedRecipes.length > 1 ? (
            <><h1 className="homepage-title">{ClickedUser.firstName}'s saved recipes!</h1><ul className="recipes">
                        {savedRecipes.map((recipe) => (
                            <li key={recipe.recipes.id} className="recipe">
                                <h2 className="recipe__title">{recipe.recipes.title}</h2>
                                <img src={recipe.recipes.image} alt={recipe.recipes.title} className="recipe__image" />
                                <p className="recipe__time">Ready in {recipe.recipes.readyInMinutes} minutes</p>
                                <p className="recipe__summary">{parse(recipe.recipes.summary)}</p>
                                <button onClick={() => handleRecipeClick(recipe)} className="recipe__button">See the recipe</button>
                            </li>
                        ))}
                    </ul></>
) : (
  <h1 className="homepage-title">No saved recipes</h1>
)}
    
          <Modal isOpen={modalIsOpen} onRequestClose={handleCloseDetail} className="modal" overlayClassName="overlay">
            {selectedRecipe && (
              <div>
                
                <h2 className="modal__title">{selectedRecipe.title}</h2>
                {!isSaved ? 
            (<p onClick={() => handleSaveRecipeClick(selectedRecipe.recipes)} className="heart">❤️</p>)
            :
          (<p className="AddedtoSaves">Added to Saves</p>)}

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
        </>
      );
}
