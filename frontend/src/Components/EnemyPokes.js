import { useState } from "react";

function EnemyPokes(props){
  const url = props.pokemon.url;
  const name = props.pokemon.name;
  const setEnemy = props.setEnemy;

  function onClick(){
    setEnemy(props.pokemon)
    
  }

  return (
    <li onClick={onClick}>{name}</li>
  )
}

export default EnemyPokes;