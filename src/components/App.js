import * as React from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/App.css';
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import Login from "./Login";
import RecipeSearch from "./RecipeSearch";
import SignupForm from "./SignupForm";
import Home from "./Home";
import LogOut from "./LogOut";

export default function App() {

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const location = useLocation();

  const handleLogout = () => {
    // Perform the logout logic here
    // ...
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
        <Route path="/" element={<Layout />} />
        {!loggedInUser && (
          <>
            <Route path="login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="signup" element={<SignupForm setLoggedInUser={setLoggedInUser} />} />
          </>
        )}
        {loggedInUser && (
          <>
            <Route path="recipe" element={<RecipeSearch />} />
            <Route path="logout" element={<LogOut handleLogout={handleLogout} />} />
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

