import React, { useState, useEffect } from 'react';
// import '.src/Css/App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/data")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name} ({item.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
