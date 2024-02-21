function UserPokes(props){
  const setUserPokemon = props.setUserPokemon;
  const setIsUserSelected = props.setIsUserSelected;
  const pokemon = props.pokemon

  function onClick(){
    setIsUserSelected(true)
    setUserPokemon(pokemon)
    
  }

  return (<div onClick={onClick}>
    <img src={pokemon.sprites.front_default} alt="pokimon"></img>
    <li >{pokemon.name}</li>
  </div>
  )
}

export default UserPokes;