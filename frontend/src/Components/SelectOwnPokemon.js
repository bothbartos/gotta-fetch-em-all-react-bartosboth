import DisplayPokemon from "./DisplayPokemon";

function SelectOwnPokemon({userPokemons, setIsCombatOn, setUserPokemon}){

  return <div>
    {userPokemons.map((pokemon) => {
     return <DisplayPokemon setUserPokemon={setUserPokemon} setIsCombatOn={setIsCombatOn} key={pokemon.name} pokemon={pokemon}></DisplayPokemon>
    })}
  </div>
}
export default SelectOwnPokemon;