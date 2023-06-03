import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NexMeal_Log from "../images/NexMeal_Log.png";
import "/Users/ballout/Desktop/NexMeal/NexMeal/src/Css/Home.css";

export default function Home({ loggedInUser, setClickedUser }) {
  const [otherUsers, setOtherUsers] = useState([]);
  

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SPRING_SERVER}/api/feed`)
      .then((response) => response.json())
      .then((data) => {
        setOtherUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleFollow = async (userId) => {
    try {
      axios.post(
        `${process.env.REACT_APP_SPRING_SERVER}/api/follow/${userId}`,
        loggedInUser
      );
    } catch (error) {
      console.log(error.response.data);
      
    }
  };

  const handleClickedUser = (user) => {
    setClickedUser(user);
    console.log(user);
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">Welcome to NexMeal!</h1>
      {!loggedInUser ? (
        <p className="homepage-subtitle">
          Please <Link to="/signup">sign up</Link> or{" "}
          <Link to="/login">Log in</Link> to access our recipe search and find
          your next meal to make.
        </p>
      ) : (
        <>
          <p className="homepage-subtitle">
            Happy to see you again, {loggedInUser.firstName}!
          </p>
          <p className="homepage-subtitle">
            Here are all the users on this app!{" "}
          </p>
          <p className="homepage-subtitle">
            Click on their names to see what they're planning on cooking next!{" "}
          </p>

          <div className="user-card-container">
            {otherUsers && (
              <>
                {otherUsers
                  .filter((user) => user.id !== loggedInUser.id)
                  .map((user) => (
                    <Card key={user.id} className="user-card">
                      <div className="profile-image-container">
                        <Card.Img
                          variant="top"
                          src={NexMeal_Log}
                          alt={user.firstName}
                        />
                      </div>
                      <Card.Body>
                        <Link to={`/usersRecipes/${user.id}`}>
                          <Card.Title onClick={() => handleClickedUser(user)}>
                            {user.firstName}
                          </Card.Title>
                        </Link>
                        <Card.Text>
                          Recipes {user.savedRecipes.length}
                        </Card.Text>
                        {loggedInUser.following.some(
                          (followingUser) => followingUser.id === user.id
                        ) ? (
                          <Button className="following-button" variant="outline-secondary" disabled>
                            Following
                          </Button>
                        ) : (
                          <Button
                            className="follow-button"
                            variant="outline-primary"
                            onClick={() => handleFollow(user.id)}
                          >
                            Follow
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
