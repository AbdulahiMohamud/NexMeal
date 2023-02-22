import React, { useState, useEffect } from 'react';
import './App.css';

const API_SERVER = process.env.SERVER;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${API_SERVER}/api/data`)
      .then(response => response.json())
      .then(data => setData(data.testRecord))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {data.map(item => (
          <li key={item.name}>{item.name} ({item.num})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
