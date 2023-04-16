// import React, { useEffect, useState } from "react";
import * as React from "react";


export default function Home({loggedInUser}){
 



    return (
        <div>
      <h1>Welcome to NexMeal !</h1>
      {!loggedInUser ? 
      (<p>Please signup or login to access are recipe search to find your next meal to make.</p>)
      :
      (<p>happy to see you again {loggedInUser.firstName}</p>)
      }
    </div>

    )
}
