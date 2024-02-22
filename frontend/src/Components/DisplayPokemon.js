function DisplayPokemon(props) {
  const pokemon = props.pokemon;
  const setIsCombatOn = props.setIsCombatOn
  const setUserPokemon = props.setUserPokemon;

  function onClick(){
    setIsCombatOn(true);
    setUserPokemon(pokemon);
  }

  return (
    <div onClick={onClick} id="onePoke">
      <img src={pokemon.sprites.front_default} alt="pokimon" id="selectPokes"></img>
      <li>{pokemon.name}</li>
    </div>
  );
}
export default DisplayPokemon;
