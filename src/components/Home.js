import React, { useEffect, useState } from "react";

export default function Home(){
    const [data, setData] = useState([]);

    useEffect( () => {
        fetch('http://localhost:8080/api/data')
        .then(Response => Response.json)
        .then(data => setData(data))
        .catch(error => console.error({error}))

    } )



    return (
        <div>
      <h1>HomePage</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name} ({item.email})</li>
        ))}
      </ul>
    </div>

    )
}
