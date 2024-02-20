import { useEffect, useState } from "react";
import EnemyPokes from "./EnemyPokes";
import SelectUserPokemon from "./SelectUserPokemon";

function SelectPokemon({ area }) {
  const [encounterPokemons, setEncounterPokemons] = useState([]);
  const [selectedEnemy, setEnemy] = useState([]);
  const [choosenEnemy, isEnemyChoosen] = useState(false);

  const areaData = area;

  useEffect(() => {
    async function fetchEncounters(url) {
      const enemiesPromise = areaData.pokemon_encounters.map(
        async (pokemon) => {
          return await fetchEnemies(pokemon.pokemon.url);
        }
      );
      const enemies = await Promise.all(enemiesPromise);
      setEncounterPokemons(enemies);
    }
    fetchEncounters();
  }, []);

  function selectRandomEnemy() {
    const maxNum = encounterPokemons.length;
    const randomNumber = Math.floor(Math.random() * maxNum);
    setEnemy(encounterPokemons[randomNumber]);
    isEnemyChoosen(true);
  }

  async function fetchEnemies(url) {
    const response = await fetch(url);
    const enemy = await response.json();
    return enemy;
  }

  console.log(selectedEnemy);
  return (
    <div key={area.location.name}>
      <ul>
        {!choosenEnemy ? (
          <>
            {encounterPokemons.map((pokemon) => (
              <EnemyPokes
                setEnemy={setEnemy}
                pokemon={pokemon}
                key={pokemon.name}
                isEnemyChoosen={isEnemyChoosen}
              />
            ))}
            <button onClick={selectRandomEnemy}>Random Enemy</button>
          </>
        ) : (
          <SelectUserPokemon />
        )}
      </ul>
    </div>
  );
}

export default SelectPokemon;
