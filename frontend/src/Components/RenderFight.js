import React, { useEffect, useState } from "react";

function getStats (pokemon){
    const newStats = {};

        pokemon.stats.forEach(element => {
            const nameOfStat = element.stat.name;
            const valueOfStat = element['base_stat']
            
            newStats[nameOfStat] = valueOfStat;
        });
        
        return newStats;
}

function checkOnFight (stats, setEndOfFight){
    if (stats.hp < 1){
        setEndOfFight(true)
    }
}

function handleContact (enemyStats, setEnemyStats, setUserStats, userStats, endOfFight, setEndOfFight){
    const enemyDmg = enemyStats.attack;
    const userDmg = userStats.attack;
    const enemyDef = enemyStats.defense;
    const userDef = userStats.defense;

    if (endOfFight){
        console.log('end')
    } else {
        setEnemyStats({...enemyStats, hp: enemyStats.hp - dmg(userDmg, enemyDef)})
        checkOnFight(enemyStats, setEndOfFight)
        
        setTimeout(() => {
            setUserStats({...userStats, hp: userStats.hp - dmg(enemyDmg, userDef)})
            checkOnFight(userStats, setEndOfFight)
        }, 200)
    }
}


function random (min, max){
    return  Math.floor(Math.random() * (max - min) ) + min;
}

function dmg (dmg, def){
    return Math.round(((((2/5+2)*dmg*60/def)/50)+2)*random(217, 255)/255)
}

function RenderFight(props) {
        
    const [usersPokemon, setUsersPokemon] = useState(false)
    const [enemyPokemon, setEnemyPokemon] = useState(false)

    const [userStats, setUserStats] = useState(false)
    const [enemyStats, setEnemyStats] = useState(false)

    const [endOfFight, setEndOfFight] = useState(false);
    
    const enemyPokeUrl = props.enemyPokeUrl;
    const usersPokeUrl = props.usersPokeUrl;

    useEffect(() => {
        
        async function fetchPoke(url, role) {
            const res = await fetch(url);
            const pokemon = await res.json();
            if (role === 'user'){
                setUserStats(getStats(pokemon));
                setUsersPokemon(pokemon)
            } else {
                setEnemyStats(getStats(pokemon));
                setEnemyPokemon(pokemon)
            }
        }

        fetchPoke(enemyPokeUrl, 'enemy')
        fetchPoke(usersPokeUrl, 'user')

    }, [enemyPokeUrl, usersPokeUrl])

    return (
        <div>
            <div>
                <p>HP: {userStats.hp}</p>
                {usersPokemon ?
                 <img alt="nem je" id="usersPokemon" src={usersPokemon.sprites.other.showdown['back_default']}></img> :
                  <p>Loading...</p>}
                  <button onClick={() => handleContact(enemyStats, setEnemyStats, setUserStats, userStats, endOfFight, setEndOfFight) }>Attack</button>
            </div>
            {endOfFight ? <p>win</p> : <p></p>}
            
            
        <div>
            <p>HP: {enemyStats.hp}</p>
            {enemyPokemon ?
             <img alt="nem je" id="enemyPokemon" src={enemyPokemon.sprites.other.showdown['front_default']}></img> :
              <p>Loading...</p>}
        </div>
        </div>
    )
}

export default RenderFight;
