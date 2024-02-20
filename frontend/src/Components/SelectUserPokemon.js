import { useEffect, useState } from "react";
import UserPokes from "./UserPokes";

function SelectUserPokemon() {
  const [selectedUserPokemon, setUserPokemon] = useState([]);
  const [userPokemons, setCapturedPokemons] = useState([]);
  const [isUserPokeSelected, setIsUserSelected] = useState(false);

  const ownStarterPokes = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl",
  ];

  useEffect(() => {
    async function fetchOwnPokes() {
      const capturedPokesPromise = ownStarterPokes.map(async (pokemon) => {
        const response = await fetch(pokemon);
        const pokes = await response.json();
        return pokes;
      });
      const capturedPokes = await Promise.all(capturedPokesPromise);
      
      setCapturedPokemons(capturedPokes);
    }
    fetchOwnPokes();
  }, []);
  console.log(selectedUserPokemon)

  return (
  <>
  {userPokemons.map((pokemon) => (
    
    <UserPokes
      key={pokemon.name}
      setUserPokemon={setUserPokemon}
      setIsUserSelected={setIsUserSelected}
      pokemon={pokemon}
      selectedUserPokemon={selectedUserPokemon}
    />
  ))}
  </>

  );
}

export default SelectUserPokemon;
