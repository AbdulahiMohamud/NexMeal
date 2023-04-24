import * as React from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import RecipeSearch from "./RecipeSearch";
import SignupForm from "./SignupForm";
import Home from "./Home";
import LogOut from "./LogOut";

import SavedRecipes from "./SavedRecipes";

export default function App() {

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [Token, setToken] = React.useState(null);
  const server = process.env.SPRING_SERVER;

  const handleLogout = () => {
    setLoggedInUser(null);      
      
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
        <Route path="/" element={<Home loggedInUser={loggedInUser}/>} />
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
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

