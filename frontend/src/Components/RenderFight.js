import React, { useEffect, useState } from "react";

function RenderPokemons(props) {

    const [usersPokemon, setUsersPokemon] = useState(false)
    const [enemyPokemon, setEnemyPokemon] = useState(false)


    const enemyPokeUrl = props.enemyPokeUrl;
    const usersPokeUrl = props.usersPokeUrl;

    useEffect(() => {
        async function fetchUsersPoke(url) {
            const res = await fetch(url);
            const pokemon = await res.json();

            setUsersPokemon(pokemon)
        }

        async function fetchEnemyPoke(url) {
            const res = await fetch(url);
            const pokemon = await res.json();

            setEnemyPokemon(pokemon)
        }

        fetchEnemyPoke(enemyPokeUrl)
        fetchUsersPoke(usersPokeUrl)

    }, [])

    return (
        <div>
            {usersPokemon ? <img alt="nem je" src={usersPokemon.sprites.other.showdown['back_shiny']}></img> : <p>not working</p>}
            {enemyPokemon ? <img alt="nem je" src={enemyPokemon.sprites.other.showdown['front_shiny']}></img> : <p>not working</p>}

        </div>

    )
}

export default RenderPokemons;
/*<img alt="nem je" src={enemyPokemon.sprites.other.showdown['front_shiny']}></img>*/
/* {usersPokemon ? <img alt="nem je" src={usersPokemon.sprites.other.showdown['back_shiny']}></img> : <p>not working</p>} */