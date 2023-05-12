import React, {useState } from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import RecipeSearch from "./RecipeSearch";
import SignupForm from "./SignupForm";
import Home from "./Home";
import LogOut from "./LogOut";
import UserSavedRecipes from "./UserSavedRecipes";


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
            <Route path="/usersRecipes/:id" element={<UserSavedRecipes Token={Token} ClickedUser={ClickedUser} />} />
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

