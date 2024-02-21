import { useEffect, useState } from "react";

function EnemyPokes(props){
  const name = props.pokemon.name;
  const setEnemy = props.setEnemy;
  const enemy = props.pokemon;
  const setEnemySelected = props.setEnemySelected;
  

  
  function onClick(){
    setEnemy(enemy)
    setEnemySelected(true);
  }

  return (<div onClick={onClick}>
    <img src={enemy.sprites.front_default} alt="pokimon" id="selectPokes"></img>

    <li >{name}</li>

  </div>
  )
}

export default EnemyPokes;