function UserPokes(props){
  const setUserPokemon = props.setUserPokemon;
  const setIsUserSelected = props.setIsUserSelected;
  const pokemon = props.pokemon
  const selectedUserPokemon = props.selectedUserPokemon

  function onClick(){
    setIsUserSelected(true)
    setUserPokemon(pokemon)
    
  }

  return (<div>
    <img src={pokemon.sprites.front_default} alt="pokimon"></img>
    <li onClick={onClick}>{pokemon.name}</li>
  </div>
  )
}

export default UserPokes;