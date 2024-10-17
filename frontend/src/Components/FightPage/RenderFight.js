import React, {useEffect, useState} from "react";
import DisplayPokemonFight from "./DisplayPokemonFight";
import {pokeBall, pokemonDead} from "../../assets";
import BattleResult from "./BattleResult";

function getStats(pokemon) {
  const newStats = {};

  pokemon.stats.forEach((stat) => {
    const nameOfStat = stat.stat.name;
    newStats[nameOfStat] = stat["base_stat"];
  });
  newStats.maxHp = newStats.hp;

  return newStats;
}

function checkOnFight(hp, setEndOfFight, nameOfWinner, setWinner, role) {
  if (hp < 1) {
    setEndOfFight(true);
    setWinner({
      name: nameOfWinner,
      role: role,
    });
    return true;
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

  if (!endOfFight) {
    let recentDmg = dmg(userDmg, enemyDef);
    enemyHp -= recentDmg;
    setEnemyStats({ ...enemyStats, hp: enemyStats.hp - recentDmg });
    checkOnFight(enemyHp, setEndOfFight, pokemons.user, setWinner, "Your");
    const isBattleEndedMiddleFight = checkOnFight(
      enemyHp,
      setEndOfFight,
      pokemons.user,
      setWinner,
      "Your"
    );

    setTimeout(() => {
      if (!isBattleEndedMiddleFight) {
        recentDmg = dmg(enemyDmg, userDef);
        userHp -= recentDmg;
        setUserStats({ ...userStats, hp: userStats.hp - recentDmg });
        checkOnFight(userHp, setEndOfFight, pokemons.enemy, setWinner, "Enemy");
      }
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

function sliceLoserPokemon(userPokemons, pokemons) {
  const index = userPokemons.findIndex(
      (pokemon) => pokemon.name === pokemons.user
  );
  if (index !== -1) {
    return [
      ...userPokemons.slice(0, index),
      ...userPokemons.slice(index + 1),
    ];
  }
  return userPokemons;
}

function healthBarColoring(hp, maxHp) {
  const percent = Math.floor((hp / maxHp) * 100);
  if (percent >= 80) {
    return "healthBar3";
  } else if (percent >= 60) {
    return "healthBar2";
  } else if (percent >= 30) {
    return "healthBar1";
  } else {
    return "healthBar0";
  }
}

function RenderFight({enemyPoke, usersPoke, userPokemons, onEndOfFight, returnToHome}) {
  const [usersPokemon, setUsersPokemon] = useState(false);
  const [enemyPokemon, setEnemyPokemon] = useState(false);

  const [userStats, setUserStats] = useState(false);
  const [enemyStats, setEnemyStats] = useState(false);

  const [endOfFight, setEndOfFight] = useState(false);

  const [winner, setWinner] = useState(null);

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

  useEffect(() => {
    if (endOfFight && winner.name === pokemons.user) {
      onEndOfFight([...userPokemons, enemyPoke]);
      setTimeout(() => {
        returnToHome();
      }, 3000);
    } else if (endOfFight && winner.name === pokemons.enemy) {
      const removedPokemon = sliceLoserPokemon(userPokemons, pokemons);
      onEndOfFight(removedPokemon);
      setTimeout(() => {
        returnToHome();
      }, 4000);
    }
  }, [endOfFight]);

  return (
      <div id="fightPage">
        <div id="battleField">
          <DisplayPokemonFight
              name={pokemons.user}
              stats={userStats}
              pokemonData={usersPokemon}
              isUser={true}
              healthBarColoring={healthBarColoring}
          />
          <DisplayPokemonFight
              name={pokemons.enemy}
              stats={enemyStats}
              pokemonData={enemyPokemon}
              isUser={false}
              healthBarColoring={healthBarColoring}
          />
        </div>
        <div id="attackBtn">
          {endOfFight ? (
              <BattleResult
                  winner={winner}
                  pokeBall={pokeBall}
                  pokemonDead={pokemonDead}
              />
          ) : (
              <button
                  onClick={() =>
                      handleContact(
                          enemyStats,
                          setEnemyStats,
                          setUserStats,
                          userStats,
                          endOfFight,
                          setEndOfFight,
                          setWinner,
                          pokemons
                      )
                  }
              >
                Attack
              </button>
          )}
        </div>
      </div>
  );

}

export default RenderFight;
