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
      navigate("/")

    
    })
    .catch(error => {
      console.log(error.response);
      setErrorMessage('Invalid username or password');
      
    });
  };

  return (
    <div>
      
      <h1>Login </h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

