import DisplayPokemon from "./DisplayPokemon";
function SelectOwnPokemon({userPokemons, setIsCombatOn}){
  return <div>
    {userPokemons.map((pokemon) => {
     return <DisplayPokemon setIsCombatOn={setIsCombatOn} key={pokemon.name} pokemon={pokemon}></DisplayPokemon>
    })}
  </div>
}
export default SelectOwnPokemon;