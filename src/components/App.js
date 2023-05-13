import React, {useState } from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import RecipeSearch from "./RecipeSearch";
import SignupForm from "./SignupForm";
import Home from "./Home";
import LogOut from "./LogOut";
import UserSavedRecipes from "./UserSavedRecipes";
import head_shot from "../images/head_shot.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';



import SavedRecipes from "./SavedRecipes";

export default function App() {

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [Token, setToken] = useState(null);
  const [ClickedUser , setClickedUser] = useState([]);
  const server = process.env.SPRING_SERVER;

  const handleLogout = () => {
    setLoggedInUser(null);      
      
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/aboutme">About me</Link>
          </li>
          {!loggedInUser && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          {loggedInUser && (
            <>
              <li>
                <Link to="/recipe">Find Recipe</Link>
              </li>
              <li>
                <Link to="/saved">Saved Recipe</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home loggedInUser={loggedInUser} Token={Token} setClickedUser ={setClickedUser}/>} />
        <Route path = "/aboutme" element={<AboutMe />} />
        {!loggedInUser && (
          <>
            <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} setToken={setToken} Token={Token} server={server}/>} />
            <Route path="signup" element={<SignupForm setLoggedInUser={setLoggedInUser} setToken={setToken} />} />
          </>
        )}
        {loggedInUser && (
          <>
            <Route path="recipe" element={<RecipeSearch Token={Token} loggedInUser={loggedInUser}/>} />
            <Route path="saved" element={<SavedRecipes Token={Token} loggedInUser={loggedInUser}  />} />
            <Route path="logout" element={<LogOut handleLogout={handleLogout} />} />
            <Route path="/usersRecipes/:id" element={<UserSavedRecipes Token={Token} ClickedUser={ClickedUser} loggedInUser={loggedInUser} />} />
          </>
        )}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}



function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/home">Go to the home page</Link>
      </p>
    </div>
  );
}

function AboutMe() {



  return(
    <body className="about-me-body">
      <div className="about-me">
      <div className="about-me-image-container">
        <img src={head_shot} alt="Me" className="about-me-image" />
      </div>
      <div className="about-me-text">
        <h1>Hi, I'm Abdulahi Mohamud</h1>
        <p> I am a fullstack software developer with experience in Java, JavaScript, HTML, CSS, and RESTful APIs. My expertise lies in building scalable applications using SpringMVC. I enjoy Creating full stack website with API's I find intresting!.</p>
        <div className="social-links">
        <p>Connect with me on linkedin <a href="https://www.linkedin.com/in/abdulahimmohamud/" target="_blank" rel="noopener noreferrer" style={{fontSize: '2rem'}}>
          
          <FontAwesomeIcon icon={faLinkedin} />
        </a></p>

        <p>See the Code on my github <a href="https://github.com/AbdulahiMohamud" target="_blank" rel="noopener noreferrer" style={{fontSize: '2rem'}}> 
  <FontAwesomeIcon icon={faGithub} />
</a></p>


        </div>
      </div>
    </div>
  </body>

  );
}

