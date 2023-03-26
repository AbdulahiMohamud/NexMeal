import React, { useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/Login.css';

export default function Login() {

    let navigate = useNavigate();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log({userName,password})
    axios.post('http://localhost:8080/login', {
      userName: userName,
      password: password
    })
    .then(response => {
      console.log(response.data);
      navigate("/")
    })
    .catch(error => {
      console.log(error.response);
      setErrorMessage('Invalid username or password');
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username or email:</label>
          <input type="text" value={userName} onChange={(event) => setUsername(event.target.value)} />
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

