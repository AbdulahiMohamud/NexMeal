import React, { useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/Login.css';

export default function Login({ setLoggedInUser, setToken, Token, server }) {

  let navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  
  
 
  

  const handleLogin = (event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_SPRING_SERVER}/api/authenticate`, {
  
      email:email,
      password: password
    })
    .then(response => {
      
      const user = response.data;
      setToken(user[0].token)
      setLoggedInUser(user[1]);
      navigate("/home")

    
    })
    .catch(error => {
      console.log(error.response);
      setErrorMessage('Invalid username or password');
      
    });
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            className="input-field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
  
}

