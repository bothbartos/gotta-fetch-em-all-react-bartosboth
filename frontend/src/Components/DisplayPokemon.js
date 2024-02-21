function DisplayPokemon(props) {
  const pokemon = props.pokemon;
  const setIsCombatOn = props.setIsCombatOn
  const setUserPokemon = props.setUserPokemon;

  function onClick(){
    setIsCombatOn(true);
    setUserPokemon(pokemon);
  }

  return (
    <div onClick={onClick}>
      <img src={pokemon.sprites.front_default} alt="pokimon"></img>
      <li>{pokemon.name}</li>
    </div>
  );
}
export default DisplayPokemon;
