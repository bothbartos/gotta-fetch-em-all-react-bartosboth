import './App.css';
import { useState, useEffect } from 'react';
import RenderFight from './Components/RenderFight';
import ListElement from "./Components/ListElement";
import SelectPokemon from "./Components/SelectPokemon";
import SelectOwnPokemon from "./Components/SelectOwnPokemon";

  
function App() {
  const [locations, setLocations] = useState(null);
  const [shownData, setData] = useState(null);
  const [isAreasShown, setIsAreasShown] = useState(false);
  const [areas, setAreas] = useState(null);
  const [userPokemons, setAllPokemons] = useState([]);
  const [selectedUserPokemon, setUserPokemon] = useState([]);
  const [selectedEnemy, setEnemy] = useState([]);
  const [areaSelected, setAreaSelected] = useState(false);
  const [enemySelected, setEnemySelected] = useState(false);
  const [isCombatOn, setIsCombatOn] = useState(false);

  const ownStarterPokes = [
    "bulbasaur",
    "charizard",
    "poliwhirl",
  ];

  useEffect(() => {
    async function fetchLocations() {
      const data = await fetchData("https://pokeapi.co/api/v2/location");
      setData(data.results);
      setLocations(data.results);
    }
    fetchLocations();
    async function fetchPlayerPokemons() {
      const playerPokemonsPromises = ownStarterPokes.map(async (url) => {
        const pokemon = await fetchData(`https://pokeapi.co/api/v2/pokemon/${url}`);
        return pokemon;
      });
      const playerPokemons = await Promise.all(playerPokemonsPromises);
      setAllPokemons(playerPokemons);
    }
    fetchPlayerPokemons();
  }, []);

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  console.log(selectedEnemy);
  console.log(selectedUserPokemon)

  function returnToHome() {
    setData(locations);
    setIsAreasShown(false);
    setAreas(null);
    setAreaSelected(false);
    setEnemySelected(false);
    setEnemy([]);
    setIsCombatOn(false)
  }

  function logAreas() {
    console.log(selectedEnemy);
  }


  return (
    <div className="App">

      
      <button onClick={logAreas}>log</button>
      <button onClick={returnToHome}>Back</button>
      {isCombatOn ? (
        

        <div>

          <h3>Fight!</h3>
          <RenderFight usersPoke = {selectedUserPokemon} enemyPoke = {selectedEnemy} userPokemons={userPokemons} setAllPokemons={setAllPokemons}/>

        </div>
      ) : !areaSelected ? (
        shownData &&
        shownData.map((location) => (
          <ListElement
            text={location.name}
            key={location.name}
            url={location.url}
            setData={setData}
            isAreasShown={isAreasShown}
            setIsAreasShown={setIsAreasShown}
            setAreas={setAreas}
            setAreaSelected={setAreaSelected}
          ></ListElement>
        ))
      ) : !enemySelected ? (
        <SelectPokemon
          setEnemySelected={setEnemySelected}
          setEnemy={setEnemy}
          area={areas}
        ></SelectPokemon>
      ) : (
        <SelectOwnPokemon userPokemons={userPokemons} setIsCombatOn={setIsCombatOn} setUserPokemon={setUserPokemon}></SelectOwnPokemon>
      )}
    </div>
  );
}

export default App;
