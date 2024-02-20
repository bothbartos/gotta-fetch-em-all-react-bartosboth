import { useEffect, useState } from "react";
import EnemyPokes from "./EnemyPokes";

function SelectPokemon({userPokemons, setUserPokemons, selectedEnemy, setEnemy}){
  const [encounterPokemons, setEncounterPokemons] = useState([]);



  useEffect((encounterPokemons) =>{
    async function fetchEncounters() {
      const encounterURL = "https://pokeapi.co/api/v2/location-area/1/";
      const response = await fetch(encounterURL);
      const locationAreaData = await response.json()
      setEncounterPokemons(locationAreaData.pokemon_encounters);
      
    };
    fetchEncounters();
  },[]);
  

  function selectRandomEnemy(){
    const maxNum = encounterPokemons.length;
    const randomNumber = Math.floor(Math.random() * maxNum);
    setEnemy(encounterPokemons[randomNumber].pokemon);    
  }
  



return (
  <div>
    <ul>
    {encounterPokemons.map((pokemon) => (
      <EnemyPokes setEnemy={setEnemy} pokemon={pokemon.pokemon} key={pokemon.pokemon.url}/>
      ))}

    </ul>
    <button onClick={selectRandomEnemy}>Random Enemy</button>
  </div>
)


}

export default SelectPokemon;