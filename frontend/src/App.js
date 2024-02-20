import './App.css';
import { useState, useEffect } from 'react';
import SelectPokemon from "./Components/SelectPokemon";

function App() {
  const [userPokemons, setUserPokemons] = useState([]);
  const [selectedEnemy, setEnemy] = useState([])

  const ownStarterPokes = ["https://pokeapi.co/api/v2/pokemon/bulbasaur",
  "https://pokeapi.co/api/v2/pokemon/charizard",
  "https://pokeapi.co/api/v2/pokemon/poliwhirl"];

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
  }

  useEffect(() =>{
    async function fetchOwnPokes(){
      const ownPokes = []
      ownStarterPokes.map(async (pokemon) => {
        const pokes = await fetchData(pokemon);
        ownPokes.push(pokes)        
      }) 
      setUserPokemons(ownPokes)
    }
    fetchOwnPokes();
    
  }, [])
  
  function logData() {
    console.log(selectedEnemy);
  }
  
  
  return (
    <div className="App">
      <button onClick = {logData} >debug</button>
      {userPokemons
      ?
      <SelectPokemon userPokemons = {userPokemons}
      setUserPokemons={setUserPokemons}
      setEnemy={setEnemy}
      selectedEnemy={selectedEnemy}/> : "No data"
      }
    </div>
  );
}

export default App;
