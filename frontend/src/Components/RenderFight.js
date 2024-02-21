import React, { useEffect, useState } from "react";

function getStats(pokemon) {
  const newStats = {};

  pokemon.stats.forEach((element) => {
    const nameOfStat = element.stat.name;
    const valueOfStat = element["base_stat"];

    newStats[nameOfStat] = valueOfStat;
  });
  newStats.maxHp = newStats.hp;

  return newStats;
}

function checkOnFight(hp, setEndOfFight, nameOfWinner, setWinner) {
  if (hp < 1) {
    setEndOfFight(true);
    setWinner(nameOfWinner);
  }
}

function handleContact(
  enemyStats,
  setEnemyStats,
  setUserStats,
  userStats,
  endOfFight,
  setEndOfFight,
  setWinner,
  pokemons
) {
  const enemyDmg = enemyStats.attack;
  const userDmg = userStats.attack;
  const enemyDef = enemyStats.defense;
  const userDef = userStats.defense;
  let userHp = userStats.hp;
  let enemyHp = enemyStats.hp;

  if (endOfFight) {
    console.log("end");
  } else {
    let recentDmg = dmg(userDmg, enemyDef);
    enemyHp -= recentDmg;
    setEnemyStats({ ...enemyStats, hp: enemyStats.hp - recentDmg });
    checkOnFight(enemyHp, setEndOfFight, pokemons.user, setWinner);

    setTimeout(() => {
      recentDmg = dmg(enemyDmg, userDef);
      userHp -= recentDmg;
      setUserStats({ ...userStats, hp: userStats.hp - recentDmg });
      checkOnFight(userHp, setEndOfFight, pokemons.enemy, setWinner);
    }, 200);
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dmg(dmg, def) {
  return Math.round(
    ((((2 / 5 + 2) * dmg * 60) / def / 50 + 2) * random(217, 255)) / 255
  );
}

function RenderFight(props) {
  const [usersPokemon, setUsersPokemon] = useState(false);
  const [enemyPokemon, setEnemyPokemon] = useState(false);

  const [userStats, setUserStats] = useState(false);
  const [enemyStats, setEnemyStats] = useState(false);

  const [endOfFight, setEndOfFight] = useState(false);
  const [battleClosing, setBattleClosing] = useState(false)
  
  const [winner, setWinner] = useState(null)

  const enemyPoke = props.enemyPoke;
  const usersPoke = props.usersPoke;
  const userPokemons = props.userPokemons;
  const setAllPokemons = props.setAllPokemons;

  const pokemons = {
    user: usersPoke.name,
    enemy: enemyPoke.name,
  };

  useEffect(() => {
    setUserStats(getStats(usersPoke));
    setUsersPokemon(usersPoke);

    setEnemyStats(getStats(enemyPoke));
    setEnemyPokemon(enemyPoke);
  }, [enemyPoke, usersPoke]);

  if (endOfFight){
    setTimeout(() => {
        setBattleClosing(true)
    }, 4000);
  }

    return (
        <div id="battleField">
            {battleClosing ? <>{props.returnToHome()}</> : <>
                
            <div>
                <h3>{pokemons.user}</h3>
                <p>HP: {userStats.hp}/{userStats.maxHp}</p>
                {usersPokemon ?
                 <img alt="nem je" id="usersPokemon" src={usersPokemon.sprites.other.showdown['back_default']}></img> :
                  <p>Loading...</p>}
            </div>

            <div>
                {endOfFight ? <p>The winner: {winner}</p> : <>
                <button onClick={() => handleContact(enemyStats, setEnemyStats, setUserStats, userStats, endOfFight, setEndOfFight, setWinner, pokemons) }>Attack</button>
                    </>}
            </div>
            
            <div>
                <h3>{pokemons.enemy}</h3>
                <p>HP: {enemyStats.hp} / {enemyStats.maxHp}</p>
                {enemyPokemon ?
                <img alt="nem je" id="enemyPokemon" src={enemyPokemon.sprites.other.showdown['front_default']}></img> :
                <p>Loading...</p>}
            </div>
        </> 
         }
        </div>
    )
}

export default RenderFight;
