function DisplayPokemon(props) {
  const pokemon = props.pokemon;
  const setIsCombatOn = props.setIsCombatOn

  return (
    <div onClick={() => setIsCombatOn(true)}>
      <img src={pokemon.sprites.front_default}></img>
      <li>{pokemon.name}</li>
    </div>
  );
}
export default DisplayPokemon;
