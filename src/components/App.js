import * as React from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Login from "./Login";
import RecipeSearch from "./RecipeSearch";
import SignupForm from "./SignupForm";
import Home from "./Home";
import LogOut from "./LogOut";
import axios from "axios";

export default function App() {

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [Token, setToken] = React.useState(null);
  console.log(loggedInUser);


  const handleLogout = () => {
    axios.post('http://localhost:8080/logout',{});
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
                <Link to="/recipe">FindRecipe</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        {!loggedInUser && (
          <>
            <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} setToken={setToken} Token={Token}/>} />
            <Route path="signup" element={<SignupForm setLoggedInUser={setLoggedInUser} setToken={setToken} />} />
          </>
        )}
        {loggedInUser && (
          <>
            <Route path="recipe" element={<RecipeSearch Token={Token}/>} />
            <Route path="logout" element={<LogOut handleLogout={handleLogout} />} />
            <Route path="home" element={<Home loggedInUser={loggedInUser} />} />
          </>
        )}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Outlet />
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

