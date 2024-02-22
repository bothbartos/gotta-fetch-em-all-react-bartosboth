import DisplayPokemon from "./DisplayPokemon";

function SelectOwnPokemon({ userPokemons, setIsCombatOn, setUserPokemon }) {
  return (
    <div id="pokemonSelector">
      <ul>
        {userPokemons.map((pokemon) => {
          return (
            <DisplayPokemon
              setUserPokemon={setUserPokemon}
              setIsCombatOn={setIsCombatOn}
              key={pokemon.name}
              pokemon={pokemon}
            ></DisplayPokemon>
          );
        })}
      </ul>
    </div>
  );
}
export default SelectOwnPokemon;
