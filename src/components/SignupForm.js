import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/SignupForm.css';


export default function SignupForm() {
    let  navigate = useNavigate();
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ userName, firstName, lastName, email, password });

        // Send POST request to Spring Boot API
        fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, firstName, lastName, email, password })
        })

        .then(response => {
            console.log({response});
            if (!response.ok) {
                if (response.status === 409) {
                } else {
                  throw new Error(response.statusText);
                }
              } else {
                navigate('/login');
              }
              return response.json();
        })

        .then(data => {
            console.log(data);
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
            <h1>Signup</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    UserName:
                    <input type="text" value={userName} onChange={event => setUserName(event.target.value)} />
                </label>
                <br />
                <label>
                    FirstName:
                    <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)} />
                </label>
                <br />
                <label>
                    LastName:
                    <input type="text" value={lastName} onChange={event => setLastName(event.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}
