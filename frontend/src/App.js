import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://pokeapi.co/api/v2/location');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? console.log(data) : console.log('no fetch')}
    </div>
  );
}

export default App;
