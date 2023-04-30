import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/SignupForm.css';


export default function SignupForm({setLoggedInUser}) {
    let  navigate = useNavigate();
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log()

    const handleSubmit = (event) => {
        event.preventDefault();
        

        // Send POST request to Spring Boot API
        fetch(`${process.env.REACT_APP_SPRING_SERVER}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, firstName, lastName, email, password })
        })

        .then(response => {
            
            if (!response.ok) {
                if (response.status === 409) {
                } else {
                  throw new Error(response.statusText);
                }
              } else {
                setLoggedInUser({userName, email});
                navigate('/login');
              }
              return response.json();
        })

        .then(data => {
            
        })

        .catch(error => {
            console.error({error});
            if (error.message.includes("Username")){
                setError("The Username already exists"); 
            } else if (error.message.includes("Email")){
                setError("The Email is already in use"); 
            }
            
        });

        // Clear form fields
        setUserName('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    return (
        <>
          <div className="signup-container">
            <h1>Sign Up</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userName">Username:</label>
                <input type="text" id="userName" value={userName} onChange={event => setUserName(event.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" value={firstName} onChange={event => setFirstName(event.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" value={lastName} onChange={event => setLastName(event.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
              </div>
              <div className="form-group">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </>
      );
      
}
