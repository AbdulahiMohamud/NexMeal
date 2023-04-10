// import React, { useEffect, useState } from "react";
import * as React from "react";


export default function Home({loggedInUser}){
  const user = loggedInUser;
  console.log(user);


    



    return (
        <div>
      <h1>Welcome to NexMeal !</h1>
      {!user ? 
      (<p>Please signup or login to access are recipe search to find your next meal to make.</p>)
      :
      (<p>happy to see you again{user}</p>)
      }
    </div>

    )
}
