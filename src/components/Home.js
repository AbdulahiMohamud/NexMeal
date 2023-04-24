// import React, { useEffect, useState } from "react";
import * as React from "react";
import '/Users/abdulahimohamud/IdeaProjects/mayf-front/src/Css/Home.css';


export default function Home({loggedInUser}){
 



    return (
        <div className="homediv">
      <h1>Welcome to NexMeal !</h1>
      {!loggedInUser ? 
      (<p>Please signup or login to access are recipe search to find your next meal to make.</p>)
      :
      (<p>happy to see you again {loggedInUser.firstName}</p>)
      }
    </div>

    )
}
