import React from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function LogOut() {
    let navigate = useNavigate();

    const handleLogout = () => {
        axios.post(`${process.env.REACT_APP_SPRING_SERVER}/logout`)
        .then( () => {
            navigate('login');
        });

    };

    return(
        <button onClick={handleLogout}>
      Logout
    </button>
    
    );
}