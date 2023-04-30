// import React, { useEffect, useState } from "react";
import * as React from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/Home.css';


export default function Home({loggedInUser}){
 



  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to NexMeal!</h1>
      {!loggedInUser ? 
        <p className="homepage-subtitle">Please sign up or log in to access our recipe search and find your next meal to make.</p>
        :
        <p className="homepage-subtitle">Happy to see you again, {loggedInUser.firstName}!</p>
      }
    </div>
  );
}
