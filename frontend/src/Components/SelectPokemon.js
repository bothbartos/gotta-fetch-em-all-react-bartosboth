import { useEffect, useState } from "react";
import EnemyPokes from "./EnemyPokes";

function SelectPokemon({setEnemySelected, setEnemy, area}) {
  const [encounterPokemons, setEncounterPokemons] = useState([]);
  
  useEffect(() => {
    async function fetchEncounters() {

      const enemiesPromise = area.pokemon_encounters.map(async (pokemon) => {
        const enemyData = await fetchEnemies(pokemon.pokemon.url);
        return enemyData;
      });
      const enemies = await Promise.all(enemiesPromise);
      setEncounterPokemons(enemies);
    }
    fetchEncounters();
  }, []);

  function selectRandomEnemy() {
    const maxNum = encounterPokemons.length;
    const randomNumber = Math.floor(Math.random() * maxNum);
    setEnemy(encounterPokemons[randomNumber]);
    setEnemySelected(true);
  }

  async function fetchEnemies(url) {
    const response = await fetch(url);
    const enemy = await response.json();
    return enemy;
  }

  return (
    <div id="pokemonSelector">
      <button onClick={selectRandomEnemy}>Random Enemy</button>
      <ul>
        {encounterPokemons.map((pokemon) => (
          <EnemyPokes key={pokemon.name} setEnemySelected={setEnemySelected} setEnemy={setEnemy} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export default SelectPokemon;
