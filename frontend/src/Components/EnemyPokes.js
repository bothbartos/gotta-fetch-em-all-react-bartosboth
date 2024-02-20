import { useEffect, useState } from "react";

function EnemyPokes(props){
  const name = props.pokemon.name;
  const setEnemy = props.setEnemy;
  const enemy = props.pokemon;
  const isEnemyChoosen = props.isEnemyChoosen;
  
  function onClick(){
    setEnemy(enemy)
    isEnemyChoosen(true)
  }

  return (<div>
    <img src={enemy.sprites.front_default} alt="pokimon"></img>
    <li onClick={onClick} >{name}</li>
  </div>
  )
}

export default EnemyPokes;