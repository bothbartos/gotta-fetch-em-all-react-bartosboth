import { useEffect, useState } from "react";
import EnemyPokes from "./EnemyPokes";

function SelectPokemon({userPokemons, setUserPokemons, selectedEnemy, setEnemy, locationUrl}){
  const [encounterPokemons, setEncounterPokemons] = useState([]);

  const url = 

  useEffect(() =>{
    async function fetchEncounters() {
      const response = await fetch(url);
      const locationAreaData = await response.json()
      
      const enemiesPromise = locationAreaData.pokemon_encounters.map(async (pokemon) =>{
        const enemyData = await fetchEnemies(pokemon.pokemon.url);
        
        return enemyData
      })
      const enemies = await Promise.all(enemiesPromise);
      setEncounterPokemons(enemies);      
    };
    fetchEncounters();
  },[]);
  

  function selectRandomEnemy(){
    const maxNum = encounterPokemons.length;
    const randomNumber = Math.floor(Math.random() * maxNum);
    setEnemy(encounterPokemons[randomNumber]);    
  }
  
  async function fetchEnemies(url){
    const response = await fetch(url);
    const enemy = await response.json();
    return enemy;
  }





return (
  <div>
    <ul>
    {encounterPokemons.map((pokemon) => (
      <EnemyPokes setEnemy={setEnemy} pokemon={pokemon}/>
    ))}

    </ul>
    <button onClick={selectRandomEnemy}>Random Enemy</button>
  </div>
)


}

export default SelectPokemon;