// import { useState } from "react";
// import parse from 'html-react-parser';
// // import "/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/Carousel.css";

// export default function Carousel({ user }) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideCount = user.savedRecipes.length;

//   const nextSlide = () => {
//     setCurrentSlide(currentSlide === slideCount - 1 ? 0 : currentSlide + 1);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(currentSlide === 0 ? slideCount - 1 : currentSlide - 1);
//   };

//   return (
//     <div className="carousel">
//       <div className="carousel-container">
//         <div
//           className="carousel-wrapper"
//           style={{
//             transform: `translateX(-${currentSlide * (100 / slideCount)}%)`,
//           }}
//         >
//           {user.savedRecipes.map((recipe) => (
//             <div key={recipe.recipes.id} className="carousel-slide">
//               <h2 className="car_recipe__title">{recipe.recipes.title}</h2>
//               <img
//                 src={recipe.recipes.image}
//                 alt={recipe.recipes.title}
//                 className="car_recipe__image"
//               />
//               <p className="recipe__time">
//                 Ready in {recipe.recipes.readyInMinutes} minutes
//               </p>
//               <p className="car_recipe__summary">
//                 {parse(recipe.recipes.summary)}
//               </p>
//               {/* <button onClick={() => setModalIsOpen(false)} className="recipe__button">See the recipe</button> */}
//             </div>
//           ))}
//         </div>

//         <div className="carousel-nav">
//           <button onClick={prevSlide} className="carousel-prev">
//             Prev
//           </button>
//           <button onClick={nextSlide} className="carousel-next">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
