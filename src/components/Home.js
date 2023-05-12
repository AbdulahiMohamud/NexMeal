import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/Home.css';
import NexMeal_Log from '../images/NexMeal_Log.png';

export default function Home({loggedInUser , Token , setClickedUser }){

  const [otherUsers,setOtherUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SPRING_SERVER}/api/feed`)
      .then(response => response.json())
      .then(data => {
        setOtherUsers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClickedUser =  (user) => {
    setClickedUser(user)
    console.log(user);

  }

  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to NexMeal!</h1>
      {!loggedInUser ? 
        <p className="homepage-subtitle">Please sign up or log in to access our recipe search and find your next meal to make.</p>
        :
        <>
        <p className="homepage-subtitle">Happy to see you again, {loggedInUser.firstName}!</p>
        {otherUsers && (

          <ul className="feed">

          {otherUsers.filter((user) => user.id !== loggedInUser.id).map((user) => (
            <li key={user.id} className="user-container">

              <div className="profile-image-container">
                <img src={NexMeal_Log} alt={user.firstName} />
              </div>

              <div className="user-info-container">
                <Link to={`/usersRecipes/${user.id}`}>
                  <h2 onClick={() => handleClickedUser(user)}>{user.firstName}</h2>
                </Link>
                <p>following {user.following.length}</p>
                <button>Follow</button>
              </div>

            </li>

          ))}

        </ul>
        )}        
        </>
      }
    </div>
  );
}
