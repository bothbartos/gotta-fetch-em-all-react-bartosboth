import './App.css';
import { useState, useEffect } from 'react';
import PokemonStats from './Components/PokemonStats';
import RenderPokemons from './Components/RenderFight';

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

  const testPoke = 'https://pokeapi.co/api/v2/pokemon/ditto'

  return (
    <div className="App">
      <PokemonStats url = {testPoke}/>
      <RenderPokemons usersPokeUrl = {testPoke} enemyPokeUrl = {testPoke}/>
      
    </div>
  );
}

export default App;
