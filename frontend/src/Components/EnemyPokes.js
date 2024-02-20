import { useEffect, useState } from "react";

function EnemyPokes(props){
  const name = props.pokemon.name;
  const setEnemy = props.setEnemy;
  const enemy = props.pokemon;
  

  
  function onClick(){
    
    setEnemy(enemy)
    
  }

  return (<div>
    <img src={enemy.sprites.front_default}></img>

    <li onClick={onClick}>{name}</li>

  </div>
  )
}

export default EnemyPokes;